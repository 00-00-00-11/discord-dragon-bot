const Resource = require('../../../Structures/Resource');
const {Markdown:md,Format:fmt,random,Date} = require('../../../Utils');

const TEMPLATE = {
    date: t => t || Math.floor(Date.now() / 1000),
	announce: false
};

class Birthday extends Resource {
    constructor(bday) {
        super(TEMPLATE, bday);
    }
    get birthDate() {
        return new Date(this.date * 1000);
    }
    get lastBirthday() {
		let bd = this.birthDate;
        let td = new Date();
		if (compare(td,bd) == -1) {
			td.setFullYear(td.getFullYear()-1);
		}
		td.setMonth(bd.getMonth());
		td.setDate(bd.getDate());
		return td;
    }
    get nextBirthday() {
		let bd = this.birthDate;
        let td = new Date();
		if (Date.compare(td,bd) > -1) {
			td.setFullYear(td.getFullYear()+1);
		}
		td.setMonth(bd.getMonth());
		td.setDate(bd.getDate());
		return td;
    }
	get isToday() {
		let bd = this.birthDate;
        let td = new Date();
		return !Date.compare(bd,td);
	}
    get years() {
        let bd = this.birthDate;
        let td = new Date();
        let years = td.getFullYear() - bd.getFullYear();
		if (Date.compare(td,bd) == -1) {
			years--;
		}
		return years;
    }
    get under18() {
        return this.years < 18;
    }
	static get(client, userID) {
		return new Birthday(client.database.get('users').get(userID).birthday);
	}
	static set(client, userID, birthday) {
		client.database.get('users').modify(userID, userData => {
			userData.birthday = birthday;
			return userData;
		}).save();
	}
	static modify(client, userID, callback) {
		let message;
		client.database.get('users').modify(userID, userData => {
			let bday = new Birthday(userData.birthday);
			message = callback(bday);
			userData.birthday = bday;
			return userData;
		}).save();
		return message;
	}
	static delete(client, userID) {
		client.database.get('users').modify(userID, userData => {
			delete userData.birthday;
			return userData;
		}).save();
	}
	/**
	 * Parse a date and return the timestamp in seconds.
	 */
    static parse(input) {
		if (typeof(input) === 'number') {
			return input;
		} else {
			input = String(input);
		}
		let date = null;
		try {
			// try MM-DD-YYYY format
			let [m,d,y] = input.match(/\d{1,4}/g) || [];
			//console.log('MM-DD-YYYY:',m,d,y);
			if (!(m && d && y)) {
				// try Month DD, YYYY format
				[,m,d,y] = input.match(/(\w+) (\d+)[^\d]+(\d{4})/i) || [];
				//console.log('Month Day, Year:',m,d,y);
				m = ['','january','feburary','march','april','may','june','july','august','september','october','november','december'].indexOf(String(m).toLowerCase());
			}
			if (m && d && y) {
				m = parseInt(m);
				d = parseInt(d);
				y = parseInt(y);
				//console.log('Parsed:',m,d,y);
				date = new Date(y,m-1,d,0,0,0,0).getTime() / 1000;
			}
		} catch (e) {
			console.error(e);
		} finally {
			return date;
		}
    }
	static getUpcomingBirthdays(client, server) {
		let bdays = [];
		client.database.get('users').forEach((userID, userData) => {
			if (userID in server.members && userData.birthday) {
				let bday = new Birthday(userData.birthday);
				bdays.push({
					user: client.users[userID],
					date: bday.nextBirthday
				});
			}
		});
		return bdays.sort((b1,b2) => {
			let t1 = b1.date.getTime();
			let t2 = b2.date.getTime();
			return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
		});
	}
	static getTodaysBirthdays(client, server) {
		let users = [];
		client.database.get('users').forEach((userID, userData) => {
			if ((!server || userID in server.members) && userData.birthday) {
				let bday = new Birthday(userData.birthday);
				if (bday.isToday) {
					users.push({user: client.users[userID], bday});
				}
			}
		});
		return users;
	}
	static celebrate(client, user, bday) {
		let age = bday.years;
		let channelID = bday.announce || user.id;
		let message = random([
			`Happy Birthday to you!\nHappy Birthday to you!\nHappy Birthday dear ${md.mention(user)}!\nHappy Birthday to *you*!\n`,
			`${md.mention(user)} has just leveled :up: to ${md.bold(age)}!`,
			`Good Heavens, just look at the time :clock3:! It\'s time to celebrate ${md.mention(user)}\'s ${md.bold(fmt.ordinal(age))} birthday today! `,
			`You know what today is? ${md.mention(user)}'s ${md.bold(fmt.ordinal(age))} year on Earth :earth:! `,
			`It has now been ${md.bold(age)} years since ${md.mention(user)} was born :baby:! `,
			`Another year passes by :calendar:, but that's not stopping ${md.mention(user)} from celebrating their ${md.bold(fmt.ordinal(age))} birthday today! `,
			`Knock knock, it's the Birthday Police :cop:. We have an arrest warrant for ${md.mention(user)} for turning ${md.bold(age)} today and not telling us! `,
			`Smells like cake and burning candles :cake: ...Oh! It's totally ${md.mention(user)}'s birthday today! `,
			`Time to celebrate! :party_ball: ${md.mention(user)} has turned ${md.bold(age)} today! `,
			`Could this day get any better? Oh heck yeah! :sunglasses: Today is ${md.mention(user)}'s ${md.bold(fmt.ordinal(age))} birthday! `,
			`Mark your calendars :calendar: because today ${md.mention(user)} turns ${md.bold(age)}! `
		]) + random([
			'Congrats!',
			`Congrats, you\'re now ${md.bold(age)}!`,
			'Happy Birthday!',
			`Happy ${md.bold(fmt.ordinal(age))} Birthday!`,
			'(aka Happy Birthday!)',
			'Happy *Happy* Birthday!',
			'Feliz Cumpleanos!'
		]) + ' :tada:';
		return client.send(channelID, message)
		.then(() => client.wait(2000));
	}
}

module.exports = Birthday;
