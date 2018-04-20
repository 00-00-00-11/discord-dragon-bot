const Constants = require('./Constants');
const {embedMessage,hasContent} = require('./DiscordUtils');
const {Markdown:md,Format:fmt} = require('./Utils');

function modlog(modID, userID, type, description) {
	var embed = {
		title: 'Moderation Log ' + new Date().toLocaleString(),
		fields: [
			{
				name: ':cop: Moderator',
				value: md.mention(modID),
				inline: true
			},
			{
				name: ':bust_in_silhouette: User',
				value: md.mention(userID),
				inline: true
			},
			{
				name: ':police_car: Issue',
				value: type,
				inline: true
			},
			{
				name: ':notepad_spiral: Notes',
				value: description || 'None',
				inline: false
			}
		]
	};
	return embed;
}
function validateTargetUser(client, server, userID, modID) {
	userID = md.userID(userID) || userID;
	if (!userID || !server.members[userID]) {
		throw 'Invalid user ID.';
	} else if (modID && userID == modID) {
		throw 'You cannot target yourself.';
	} else if (userID == client.id) {
		throw 'You cannot target this bot.';
	} else if (userID == client.ownerID) {
		throw 'You cannot target this bot\'s owner.';
	}
	return userID;
}
function fetchMessages(client, channelID, limit, before, after) {
	limit = Math.min(Math.max(1, limit), 100);
	return client.getMessages({channelID, limit, before, after});
}
function filterMessages(client, messages, flags) {
	var blacklist = {
		cmds:   flags.includes('-cmds')   || flags.includes('-c'),
		bot:    flags.includes('-bot')    || flags.includes('-b'),
		text:   flags.includes('-text')   || flags.includes('-t'),
		media:  flags.includes('-media')  || flags.includes('-m'),
		pinned: flags.includes('-pinned') || flags.includes('-p')
	};
	var whitelist = {
		cmds:   flags.includes('+cmds')   || flags.includes('+c'),
		bot:    flags.includes('+bot')    || flags.includes('+b'),
		text:   flags.includes('+text')   || flags.includes('+t'),
		media:  flags.includes('+media')  || flags.includes('+m'),
		pinned: flags.includes('+pinned') || flags.includes('+p')
	};
	return messages.filter(m => {
		if (m.content.startsWith(Constants.Symbols.PREFIX) && blacklist.cmds && !whitelist.cmds) {
			return false;
		}
		if (m.author.id == client.id && blacklist.bot && !whitelist.bot) {
			return false;
		}
		if (hasContent(m)) {
			if (blacklist.media && !whitelist.media) {
				return false;
			}
		} else {
			if (blacklist.text && !whitelist.text) {
				return false;
			}
		}
		if (m.pinned && blacklist.pinned && !whitelist.pinned) {
			return false;
		}
		return true;
	});
}

class Moderation {
	static get(client, serverID) {
		return client.database.get('servers').get(serverID);
	}
	static modify(client, serverID, callback) {
		var message;
		client.database.get('servers').modify(serverID, server => {
			server.strikes = server.strikes || {};
			message = callback(server);
			return server;
		}).save();
		return message;
	}
	static getArchiveChannel(client, serverID) {
		return this.get(client, serverID).archiveID;
	}
	static setArchiveChannel(client, server, channelID) {
		channelID = md.channelID(channelID) || channelID;
		if (!channelID || !server.channels[channelID]) {
			throw 'Invalid channel ID.';
		}
		return this.modify(client, server.id, function (s) {
			s.archiveID = channelID;
			return 'Archive channel set: ' + md.channel(channelID);
		});
	}
	static archive(client, serverID, channelID, count, flags) {
		var archiveID = this.getArchiveChannel(client, serverID);
		if (!archiveID) {
			throw 'No archive channel set.';
		}
		var lastMessageID = client.channels[channelID].last_message_id;
		return fetchMessages(client, channelID, count, lastMessageID)
		.then(messages => {
			if (messages.length) {
				return filterMessages(client, messages, flags);
			} else {
				throw 'No messages found.';
			}
		})
		.then(messages => {
			console.log(`Archiving ${messages.length} messages in ${channelID}...`);
			function loop() {
				var message = messages.pop();
				return client.send(archiveID,`From ${md.channel(channelID)}:`,embedMessage(message))
				.then(() => client.delete(channelID, message.id))
				.delay(1000)
				.then(() => {
					if (messages.length > 0) {
						return loop();
					} else {
						return console.log('Archiving done.');
					}
				});
			}
			return loop();
		})
		.then(() => `${fmt.plural(count,'message')} archived in ${md.channel(archiveID)}.`);
	}
	static cleanup(client, channelID, count, flags) {
		var beforeMessageID = null;
		function loop() {
			return fetchMessages(client, channelID, count, beforeMessageID)
			// filter messages by user-specified flags and count down from the number of messages
			.then(messages => {
				if (messages.length) {
					count -= messages.length;
					beforeMessageID = messages[messages.length-1].id;
					return filterMessages(client, messages, flags);
				} else {
					throw 'No messages found.';
				}
			})
			// delete remaining messages
			.then(messages => {
				var messageIDs = messages.map(m => m.id);
				if (messageIDs.length) {
					console.log(`Deleting ${messageIDs.length} messages in ${channelID}...`);
					if (messages.length > 1) {
						return client.deleteMessages({channelID, messageIDs});
					} else {
						return client.deleteMessage({channelID, messageID: messageIDs[0]});
					}
				} else {
					console.error('No messages to delete.');
				}
			})
			// prevent rate-limiting
			.delay(3000)
			// retrieve more messages until done
			.then(() => {
				if (count > 0) {
					return loop();
				} else {
					return console.log('Cleanup done.');
				}
			});
		}
		
		return loop();
	}
	static getModlogChannel(client, serverID) {
		return this.get(client, serverID).modlogID;
	}
	static setModlogChannel(client, server, channelID) {
		channelID = md.channelID(channelID) || channelID;
		if (!channelID || !server.channels[channelID]) {
			throw 'Invalid channel ID.';
		}
		return this.modify(client, server.id, function (s) {
			s.modlogID = channelID;
			return 'Modlog channel set: ' + md.channel(channelID);
		});
	}
	static getStrikes(client, server, userID) {
		userID = validateTargetUser(client, server, userID);
		var strikes = this.get(client, server.id).strikes || {};
		return strikes[userID] || 0;
	}
	static setStrikes(client, serverID, userID, strikes) {
		client.database.get('servers').modify(serverID, server => {
			server.strikes = server.strikes || {};
			server.strikes[userID] = strikes;
			return server;
		}).save();
		return strikes;
	}
	static strike(client, server, userID, modID, reason) {
		userID = validateTargetUser(client, server, userID, modID);
		if (!reason) {
			return 'You must give a reason for issuing a strike.';
		}
		return this.modify(client, server.id, function (s) {
			var modlogID = s.modlogID;
			var strikes = s.strikes[userID] = (s.strikes[userID] || 0) + 1;
			if (strikes > 3) {
				throw 'That user already has 3 strikes.';
			} else if (strikes == 3) {
				delete s.strikes[userID];
				if (modlogID) {
					client.send(modlogID, modlog(modID, userID, 'Ban', reason));
				}
				return client.ban({serverID: server.id, userID, reason}).then(() => {
					return `${md.mention(userID)} **Strike ${strikes}** :x::x::x:, you're out!`;
				});
			} else {
				if (modlogID) {
					client.send(modlogID, modlog(modID, userID, 'Strike', reason));
				}
				return `${md.mention(userID)} **Strike ${strikes}** ${strikes == 2 ? ':x::x:' : ':x:'}! ${strikes == 2 ? 'Continue any more and you are outta here.' : 'Continue with your behavior and you will receive another Strike.'}`;
			}
		});
	}
	static unstrike(client, serverID, userID, modID) {
		userID = validateTargetUser(client, server, userID, modID);
		return this.modify(client, server.id, function (s) {
			var modlogID = s.modlogID;
			var strikes = s.strikes[userID] || 0;
			if (strikes == 0) {
				return 'That user does not have any strikes on record.';
			} else {
				s.strikes[userID] = --strikes;
				if (strikes == 0) {
					delete s.strikes[userID];
				}
				if (modlogID) {
					client.send(modlogID, modlog(modID, userID, 'Strike Removed', `Strikes: ${strikes}`));
				}
				return `${md.mention(userID)} one of your Strikes was removed. Keep up the good behavior and you won't receive one again.`;
			}
		});
	}
	static kick(client, server, userID, modID, reason) {
		userID = validateTargetUser(client, server, userID, modID);
		if (!reason) {
			return 'You must give a reason for kicking a user.';
		}
		var modlogID = this.getModlogChannel(client, server.id);
		if (modlogID) {
			client.send(modlogID, modlog(modID, userID, 'Kick', reason));
		}
		return client.kick({serverID: server.id, userID}).then(() => {
			return `${md.mention(userID)} has been kicked by ${md.mention(modID)} for ${md.bold(reason)}.`
		});
	}
	static ban(client, server, userID, modID, reason) {
		userID = validateTargetUser(client, server, userID, modID);
		var modlogID = this.getModlogChannel(client, server.id);
		if (modlogID) {
			client.send(modlogID, modlog(modID, userID, 'Ban', reason));
		}
		return client.ban({serverID: server.id, userID, reason}).then(() => {
			return `${md.mention(userID)} has been banned by ${md.mention(modID)} for ${md.bold(reason)}.`
		});
	}
	static unban(client, server, userID, modID) {
		userID = validateTargetUser(client, server, userID, modID);
		var modlogID = this.getModlogChannel(client, server.id);
		if (modlogID) {
			client.send(modlogID, modlog(modID, userID, 'Unban'));
		}
		return client.unban({serverID: server.id, userID}).then(() => {
			return `${md.mention(userID)} has been unbanned by ${md.mention(modID)}.`
		});
	}
}

module.exports = Moderation;
