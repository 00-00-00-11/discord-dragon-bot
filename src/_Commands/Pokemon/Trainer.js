const Constants = require('../../Constants/Pokemon');
const Resource  = require('../../Structures/Resource');
const {Markdown:md,Format:fmt,random} = require('../../Utils');

const Pokedex         = require('./Pokedex');
const PokeError       = require('./PokeError');

const PokemonList     = require('./pokemon.json');
const PokemonItemList = require('./pokemon_items.json');

class Trainer extends Resource {
	constructor(user) {
		super(Constants.TRAINER_TEMPLATE, user);
		this.pokemon = new Pokedex(this.pokemon);
	}
	get activePokemon() {
		return this.pokemon.get(this.active);
	}
	set activePokemon(pokeID) {
		this.active = this.pokemon.getID(pokeID);
	}
	addPokemon(p) {
		let id = this.totalCaught++;
		return this.pokemon.add(id, p);
	}
	removePokemon(pokeID) {
		return this.pokemon.remove(pokeID);
	}
	tradePokemon(to, pokeID) {
		let p = this.removePokemon(pokeID);
		if (!p) {
			throw new PokeError('Invalid Pokemon ID: ' + pokeID);
		}
		return to.addPokemon(p);
	}
	catchARandomPokemon() {
		let now = Date.now();
		let timeLeft = this.cooldown - now;
		if (timeLeft > 0) {
			throw `Wait ${md.bold(fmt.time(timeLeft))} before catching another Pokémon!`;
		}
		
		this.cooldown = now + Constants.CATCH_COOLDOWN;
		return this.addPokemon(random(PokemonList));
	}
	trainPokemon(pokeID) {
		let now = Date.now();
		let timeLeft = this.trained - now;
		if (timeLeft > 0) {
			throw `Wait ${md.bold(fmt.time(timeLeft))} before training your Pokémon!`;
		}
		
		if (!pokeID) {
			pokeID = random(this.pokemon.ids);
		}
		
		let p  = this.pokemon.get(pokeID);
		if (p) {
			let xp = random(Constants.TRAIN_XP_MIN, Constants.TRAIN_XP_MAX);
			p.xp += xp;
			
			this.trained = now + Constants.TRAIN_COOLDOWN;
			
			return { pokemon: p, xp };
		} else {
			throw new PokeError('Invalid Pokemon ID: ' + pokeID);
		}
	}
	favoritePokemon(pokeID) {
		let p = this.pokemon.get(pokeID);
		if (p) {
			p.fav = 1;
			return p;
		} else {
			throw new PokeError('Invalid Pokemon ID: ' + pokeID);
		}
	}
	unfavoritePokemon(pokeID) {
		let p = this.pokemon.get(pokeID);
		if (p) {
			delete p.fav;
			return p;
		} else {
			throw new PokeError('Invalid Pokemon ID: ' + pokeID);
		}
	}
	displayPokemonInfo(pokeID) {
		let p = this.pokemon.get(pokeID);
		if (p) {
			return p.displayInfo();
		} else {
			throw new PokeError('Invalid Pokemon ID: ' + pokeID);
		}
	}
	hasItem(item) {
		return !!this.items[item.id];
	}
	addItem(item, amt = 1) {
		let id = item.id;
		this.items[id] = (this.items[id] || 0) + amt;
		return item;
	}
	removeItem(item, amt = 1) {
		let id = item.id;
		if (this.items[id]) {
			this.items[id] -= amt;
		} else {
			throw `${item.name} is not in your inventory!`;
		}
		return this;
	}
	scavengeForARandomItem() {
		let now = Date.now();
		let timeLeft = this.scavenged - now;
		if (timeLeft > 0) {
			throw `Wait ${md.bold(fmt.time(timeLeft))} before scavenging again!`;
		}
		this.scavenged = now + Constants.SCAVENGE_COOLDOWN;
		
		let totalRarity = PokemonItemList.reduce((r,i) => r += i.rarity, 0);
		let magicNumber = totalRarity * Math.random();
		for (var item of PokemonItemList) {
			if (magicNumber > item.rarity) {
				magicNumber -= item.rarity;
			} else {
				break;
			}
		}
		//console.log('Item:',item);
		return this.addItem(item);
	}
	displayItemInventory(page) {
		let color = Constants.COLOR;
		let fields = {};
		let ikeys = Object.keys(this.items);
		for (let {id,name,title} of PokemonItemList) {
			if (ikeys.includes(id)) {
				(fields[title] || (fields[title] = [])).push(`${name} (x${this.items[id]})`);
			}
		}
		fields = Object.keys(fields).map(name => ({name,value:fields[name].join('\n'),inline:true}));
		return { color, fields };
	}
}

module.exports = Trainer;
