//return;
const PokemonGame = require('./Pokemon');
const {Markdown:md} = require('../../Utils');

function resolveTargetUser(args, userID) {
	let id = md.userID(args[0]);
	if (id) args.splice(0,1);
	else id = userID;
	return id;
}

module.exports = {
	'pokemon': {
		aliases: ['pkmn'],
		category: 'Fun',
		title: PokemonGame.header,
		info: `Catches a random Pokémon. Cooldown: ${PokemonGame.catchCooldownTime}`,
		fn({client, userID, serverID}) {
			return PokemonGame.catchPokemon(client, userID);
		},
		subcommands: {
			'pokedex': {
				aliases: ['pokeinventory','pinventory','pinv'],
				title: PokemonGame.header,
				info: 'Displays all the Pokémon you have caught.',
				parameters: ['[user]','[page]'],
				fn({client, args, userID}) {
					userID = resolveTargetUser(args, userID);
					return PokemonGame.inventory(client, userID, args[0]);
				}
			},
			'legendaries': {
				aliases: ['lgds'],
				title: PokemonGame.header,
				info: 'Displays all legendary Pokémon you have caught.',
				parameters: ['[user]','[page]'],
				fn({client, args, userID}) {
					userID = resolveTargetUser(args, userID);
					return PokemonGame.inventoryLegendaries(client, userID, args[0]);
				}
			},
			'favorites': {
				aliases: ['faves'],
				title: PokemonGame.header,
				info: 'Displays all your faved Pokémon.',
				parameters: ['[user]','[page]'],
				fn({client, args, userID}) {
					userID = resolveTargetUser(args, userID);
					return PokemonGame.inventoryFavorites(client, userID, args[0]);
				}
			},
			'inventory': {
				aliases: ['items', 'iteminventory', 'iinventory', 'iinv'],
				title: PokemonGame.header,
				info: 'Displays all your inventory items.',
				parameters: ['[user]'],
				fn({client, args, userID}) {
					userID = resolveTargetUser(args, userID);
					return PokemonGame.inventoryItems(client, userID);
				}
			},
			'info': {
				title: PokemonGame.header + ' | PokeID',
				info: 'Displays information about a Pokémon from your inventory.',
				parameters: ['pokemon'],
				fn({client, arg, userID}) {
					return PokemonGame.displayPokemon(client, userID, arg);
				}
			},
			'gif': {
				title: PokemonGame.header + ' | GIF',
				info: 'Embeds a GIF of a Pokémon.',
				parameters: ['[pokemon]'],
				fn({client, arg}) {
					return PokemonGame.GIF(arg);
				}
			},
			'rename': {
				title: PokemonGame.header + ' | Rename',
				info: 'Give a Pokémon in your inventory a new name (limit 40 characters).',
				parameters: ['pokemon', 'name'],
				fn({client, args, userID}) {
					let [pokeID, name] = args;
					name = name.substring(0, 40);//.replace(/\s+/g,'_');
					return PokemonGame.renamePokemon(client, userID, pokeID, name);
				}
			},
			'howmany': {
				aliases: ['count'],
				title: PokemonGame.header + ' | How Many',
				info: 'Shows how many Pokemon you\'ve caught out of the total.',
				fn({client, userID}) {
					return PokemonGame.howMany(client, userID);
				}
			},
			'refresh': {
				aliases: ['f5'],
				title: PokemonGame.header + ' | Refresh Cooldown',
				info: 'Instantly bypass the cooldown wait. Only the bot owner may do this B)',
				parameters: ['[user]'],
				permissions: {
					type: 'private'
				},
				suppress: true,
				fn({client, args, userID}) {
					userID = resolveTargetUser(args, userID);
					return PokemonGame.refreshCooldown(client, userID);
				}
			},
			'reset': {
				aliases: ['clear'],
				title: PokemonGame.header + ' | Reset',
				info: 'Clears all Pokémon you have caught.',
				parameters: ['[user]'],
				permissions: {
					type: 'private'
				},
				suppress: true,
				fn({client, args, userID}) {
					userID = resolveTargetUser(args, userID);
					return PokemonGame.resetInventory(client, userID);
				}
			},
			'free': {
				aliases: ['release'],
				title: PokemonGame.header + ' | Release',
				info: 'Remove a Pokémon from your inventory by its ID. If you do so, your cooldown will decrease by an hour.',
				parameters: ['pokemon'],
				fn({client, arg, userID}) {
					return PokemonGame.releasePokemon(client, userID, arg);
				}
			},
			'trade': {
				aliases: ['give'],
				title: PokemonGame.header + ' | Trade',
				info: 'Trade Pokémon and items with a friend! (Name is reset upon trading)',
				parameters: ['user', 'pokemon'],
				fn({client, args, userID}) {
					return PokemonGame.tradePokemon(client, userID, ...args);
				}
			},
			'sell': {
				title: PokemonGame.header + ' | Sell',
				info: 'Sell a Pokémon for half its value. Pokémon you have trained and leveled up will be more valuable.',
				parameters: ['pokemon'],
				fn({client, arg, userID}) {
					return PokemonGame.sellPokemon(client, userID, arg);
				}
			},
			'fave': {
				aliases: ['fav', 'favorite', 'favourite'],
				title: PokemonGame.header + ' | Fave',
				info: 'Favorite a Pokémon in your inventory.',
				parameters: ['pokemon'],
				fn({client, arg, userID}) {
					return PokemonGame.favoritePokemon(client, userID, arg);
				}
			},
			'unfave': {
				aliases: ['unfav', 'unfavorite', 'unfavourite'],
				title: PokemonGame.header + ' | Fave',
				info: 'Un-favorite a Pokémon in your inventory.',
				parameters: ['pokemon'],
				fn({client, arg, userID}) {
					return PokemonGame.unfavoritePokemon(client, userID, arg);
				}
			},
			
			'battle': {
				title: PokemonGame.header + ' | Battle!',
				info: 'Battle against the bot or another player!',
				fn() {
					return 'Coming Soon: Pokémon battles. A great way to earn XP or catch more Pokemon!';
				}
			},
			'item': {
				aliases: ['scavenge'],
				title: PokemonGame.header + ' | Scavenge',
				info: `Scavenge for items that you can use in battle or sell for cash! Cooldown: ${PokemonGame.scavengingCooldownTime}`,
				fn({client, userID}) {
					return PokemonGame.scavengeItem(client, userID);
				}/*,
				subcommands: {
					'use': {
						title: PokemonGame.header + ' | Use Item',
						info: 'Use an instant item from your inventory.',
						parameters: ['pokemon','item'],
						fn({client, args, userID}) {
							return 'Work in progress!';
						}
					}
				}*/
			},
			'candy': {
				title: PokemonGame.header + ' | Use Rare Candy',
				info: 'Use a Rare Candy from your inventory on a Pokémon.',
				parameters: ['pokemon'],
				fn({client, userID, arg}) {
					return PokemonGame.useRareCandy(client, userID, arg);
				}
			},
			'train': {
				title: PokemonGame.header + ' | Train',
				info: `Give **5 XP** to one Pokémon of your choice. Cooldown: ${PokemonGame.trainingCooldownTime}`,
				parameters: ['pokemon'],
				fn({client, arg, userID}) {
					return PokemonGame.trainPokemon(client, userID, arg);
				}
			},
			'shop': {
				title: PokemonGame.header + ' | PokéShop',
				info: 'The PokéShop sells Pokéballs, battle items, and rare candies.',
				subcommands: {
					'browse': {
						aliases: ['view', 'inventory', 'inv'],
						title: PokemonGame.header,
						info: 'View the current inventory and prices of the PokéShop.',
						parameters: ['[item]'],
						fn({client, arg, userID, serverID}) {
							return PokemonGame.showShopInventory(client, serverID, arg);
						}
					},
					'buy': {
						aliases: ['purchase'],
						title: PokemonGame.header,
						info: 'Purchase an item from the PokéShop.',
						parameters: ['item', '[amount]'],
						fn({client, args, userID, serverID}) {
							return PokemonGame.buyFromShop(client, serverID, userID, ...args);
						}
					},
					'sell': {
						title: PokemonGame.header,
						info: 'Sell an item to the PokéShop.',
						parameters: ['item', '[amount]'],
						fn({client, args, userID, serverID}) {
							return PokemonGame.sellToShop(client, serverID, userID, ...args);
						}
					}
				}
			}
		}
	}
};