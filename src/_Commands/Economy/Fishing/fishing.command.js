const Fishing = require('./Fishing');
const {Markdown:md,Format:fmt} = require('../../../Utils');

function resolveTargetUser(args, userID) {
	let id = md.userID(args[0]);
	if (id) args.splice(0,1);
	else id = userID;
	if (id) return id;
	else throw 'Invalid user ID.';
}

module.exports = {
	'fish': {
		aliases: ['fishy', 'fishing', 'feesh'],
		category: 'Fun',
		title: Fishing.HEADER,
		info: `Catch critters of the sea to win big prizes! Each try costs **${Fishing.COST} credits** and you must wait **${fmt.time(Fishing.COOLDOWN)}** between tries. :new: Events are here! For a limited time, fish will be harder/easier to catch, or be more/less valuable!`,
		permissions: 'inclusive',
		cooldown: Fishing.COOLDOWN,
		fn({client, userID, channelID, serverID}) {
			return Fishing.fish(client, userID, channelID, serverID);
		},
		subcommands: {
			'inventory': {
				aliases: ['inv','catches'],
				title: Fishing.HEADER,
				info: 'Displays how many of each type of fish you\'ve caught.',
				parameters: ['[user]', '[category]'],
				fn({client, args, userID}) {
					let id = resolveTargetUser(args, userID);
					return Fishing.inventory(client, id, args[0]);
				}
			},
			'info': {
				aliases: ['fish'],
				title: Fishing.HEADER,
				info: 'Displays information about a fish by its type, name, or emoji. If no argument is passed, displays the types of fish to catch.',
				parameters: ['[fishtype|fishname|:fish:]'],
				fn({client, args, userID, serverID}) {
					let fish = args[0].toLowerCase();
					if (fish) {
						return Fishing.showFishInfo(client, serverID, fish);
					} else {
						return Fishing.showFishCategories();
					}
				}
			},
			'events': {
				aliases: ['evts'],
				title: Fishing.HEADER,
				info: 'Displays any fishing events on this server.',
				fn({client, serverID}) {
					return Fishing.showEvents(client, serverID);
				}
			},
			'event': {
				aliases: ['evt', 'artifact'],
				title: Fishing.HEADER,
				info: 'Consumes an Artifact in your inventory to generate a random Fishing Event.',
				fn({client, userID, channelID, serverID}) {
					return Fishing.consumeArtifact(client, userID, serverID, channelID);
				}
			},
			'table': {
				title: Fishing.HEADER,
				info: 'Displays the current catch rates of all fish types. Can sort by name, value, chance, or type.',
				parameters: ['[sortby]'],
				fn({client, args, serverID}) {
					return Fishing.showFishTable(client, serverID, args[0]);
				}
			},
			'newevent': {
				title: Fishing.HEADER,
				info: '(Admin only) Starts a new fishing event, either from given parameters or randomized.',
				parameters: ['[fish]','[<rarity|value>]','[multiplier]', '[expires]'],
				permissions: 'private',
				fn({client, args, channelID, serverID}) {
					var [fish, type, multiplier, expires] = args;
					return Fishing.createFishingEvent(client, serverID, channelID, {fish, type, multiplier, expires});
				}
			},
			'hittable': {
				title: Fishing.HEADER,
				info: 'Calculates the probability of hitting a bird, given a few sample Ammo values and the current hit percentage.',
				parameters: ['[user]','[ammo]'],
				fn({client, args, userID}) {
					let id = resolveTargetUser(args, userID);
					return Fishing.hitProbabilityTable(client, id, args[0]);
				}
			}
		}
	}
};
