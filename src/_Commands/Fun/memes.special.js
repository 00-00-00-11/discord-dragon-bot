const {random,Markdown:md} = require('../../Utils');

const OOF = `
▒██████╗▒   ▒██████╗▒   ███████╗
██╔═══██╗   ██╔═══██╗   ██╔════╝
██║▒▒▒██║   ██║▒▒▒██║   █████╗▒▒
██║▒▒▒██║   ██║▒▒▒██║   ██╔══╝▒▒
╚██████╔╝   ╚██████╔╝   ██║▒▒▒▒▒
▒╚═════╝▒   ▒╚═════╝▒   ╚═╝▒▒▒▒▒`;

const YKIHTDITT =
`⠀⠀⠀⠀⣠⣦⣤⣀
⠀⠀⠀⠀⢡⣤⣿⣿
⠀⠀⠀⠀⠠⠜⢾⡟
⠀⠀⠀⠀⠀⠹⠿⠃⠄
⠀⠀⠈⠀⠉⠉⠑⠀⠀⠠⢈⣆
⠀⠀⣄⠀⠀⠀⠀⠀⢶⣷⠃⢵
⠐⠰⣷⠀⠀⠀⠀⢀⢟⣽⣆⠀⢃
⠰⣾⣶⣤⡼⢳⣦⣤⣴⣾⣿⣿⠞
⠀⠈⠉⠉⠛⠛⠉⠉⠉⠙⠁
⠀⠀⡐⠘⣿⣿⣯⠿⠛⣿⡄
⠀⠀⠁⢀⣄⣄⣠⡥⠔⣻⡇
⠀⠀⠀⠘⣛⣿⣟⣖⢭⣿⡇
⠀⠀⢀⣿⣿⣿⣿⣷⣿⣽⡇
⠀⠀⢸⣿⣿⣿⡇⣿⣿⣿⣇
⠀⠀⠀⢹⣿⣿⡀⠸⣿⣿⡏
⠀⠀⠀⢸⣿⣿⠇⠀⣿⣿⣿
⠀⠀⠀⠈⣿⣿⠀⠀⢸⣿⡿
⠀⠀⠀⠀⣿⣿⠀⠀⢀⣿⡇
⠀⣠⣴⣿⡿⠟⠀⠀⢸⣿⣷
⠀⠉⠉⠁⠀⠀⠀⠀⢸⣿⣿⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈`;

const THINKING = 
`⠀⠰⡿⠿⠛⠛⠻⠿⣷
⠀⠀⠀⠀⠀⠀⣀⣄⡀⠀⠀⠀⠀⢀⣀⣀⣤⣄⣀⡀
⠀⠀⠀⠀⠀⢸⣿⣿⣷⠀⠀⠀⠀⠛⠛⣿⣿⣿⡛⠿⠷
⠀⠀⠀⠀⠀⠘⠿⠿⠋⠀⠀⠀⠀⠀⠀⣿⣿⣿⠇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁

⠀⠀⠀⠀⣿⣷⣄⠀⢶⣶⣷⣶⣶⣤⣀
⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠈⠙⠻⠗
⠀⠀⠀⣰⣿⣿⣿⠀⠀⠀⠀⢀⣀⣠⣤⣴⣶⡄
⠀⣠⣾⣿⣿⣿⣥⣶⣶⣿⣿⣿⣿⣿⠿⠿⠛⠃
⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄
⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁
⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁
⠀⠀⠛⢿⣿⣿⣿⣿⣿⣿⡿⠟
⠀⠀⠀⠀⠀⠉⠉⠉`;

const LOSS = 
`⠀⠀⠀⣴⣴⡤
⠀⣠⠀⢿⠇⡇⠀⠀⠀⠀⠀⠀⠀⢰⢷⡗
⠀⢶⢽⠿⣗⠀⠀⠀⠀⠀⠀⠀⠀⣼⡧⠂⠀⠀⣼⣷⡆
⠀⠀⣾⢶⠐⣱⠀⠀⠀⠀⠀⣤⣜⣻⣧⣲⣦⠤⣧⣿⠶
⠀⢀⣿⣿⣇⠀⠀⠀⠀⠀⠀⠛⠿⣿⣿⣷⣤⣄⡹⣿⣷
⠀⢸⣿⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣿⣿⣿⣿⣿
⠀⠿⠃⠈⠿⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⠿⠿⠿

⠀⢀⢀⡀⠀⢀⣤⠀⠀⠀⠀⠀⠀⠀⡀⡀
⠀⣿⡟⡇⠀⠭⡋⠅⠀⠀⠀⠀⠀⢰⣟⢿
⠀⣹⡌⠀⠀⣨⣾⣷⣄⠀⠀⠀⠀⢈⠔⠌
⠰⣷⣿⡀⢐⢿⣿⣿⢻⠀⠀⠀⢠⣿⡿⡤⣴⠄⢀⣀⡀
⠘⣿⣿⠂⠈⢸⣿⣿⣸⠀⠀⠀⢘⣿⣿⣀⡠⣠⣺⣿⣷
⠀⣿⣿⡆⠀⢸⣿⣿⣾⡇⠀⣿⣿⣿⣿⣿⣗⣻⡻⠿⠁
⠀⣿⣿⡇⠀⢸⣿⣿⡇⠀⠀⠉⠉⠉⠉⠉⠉⠁`;

const DESPACITO =
`ɴᴏᴡ ᴘʟᴀʏɪɴɢ: $SONG_NAME

───────────────⚪────────────────────────────

◄◄⠀▐▐ ⠀►►⠀⠀ ⠀ 1:17 / 3:48 ⠀ ───○ 🔊⠀ ᴴᴰ ⚙ ❐ ⊏⊐`;

const LENNYFACE = `( ͡° ͜ʖ ͡°)`;

const DEJAVU = [
	'Deja vu!',
	'I\'ve just been in this place before!',
	'Higher on the street',
	'And I know it\'s my time to go',
	'Calling you',
	'And the search is a mystery',
	'Standing on my feet,',
	'It\'s so hard when I try to be me, woah',
	'Deja vu!',
	'I\'ve just been in this time before!',
	'Higher on the beat',
	'And I know it\'s a place to go',
	'Calling you',
	'And the search is a mystery',
	'Standing on my feet,',
	'It\'s so hard when I try to be me, yeah!'
];

module.exports = {
	id: 'memes',
	category: 'Fun',
	title: '',
	info: 'Reply with maymays',
	permissions: 'public',
	data: {
		dejavu: 0,
		cj: {}
	},
	resolver({message,channelID,userID}) {
		if (message.toLowerCase() == 'f') return 'payrespects';
		else if (/doot|calcium|strong bones/i.test(message)) return 'doot';
		else if (/^me(.{1,4}|<.*>)?irl$/i.test(message)) return 'me_irl';
		else if (/thicc/i.test(message)) return 'thicc';
		else if (/^oof.?$/i.test(message)) return 'oof';
		else if (/you know (i|he|she|they) had to do it to (th)?em/i.test(message)) return 'ykihtditt';
		else if (/really makes you think/i.test(message)) return 'thinking';
		else if (/lenny ?face/i.test(message)) return 'lennyface';
		else if (/^(omae wa mou shindeiru|you('re| are) already dead)/i.test(message)) return 'nani';
		else if (/is this loss/i.test(message)) return 'loss';
		else if (/we live in a society/i.test(message)) return 'society';
		else if (/ay{2,} ?lmao/i.test(message)) return 'ayylmao';
		else if (/(\w+)-ass (\w+)/i.test(message)) return 'x_ass_y';
		else if (/(alexa|siri|google|dragon|dragonbot),? play (.+)/i.test(message)) return 'despacito';
		else if (/(thanks|thank you),? (dragon|draggy)(bot)?/i.test(message)) return 'thankyou';
		else if (/party rock(ers| is) in the hou/i.test(message)) return 'se_tonight';
		else {
			let msg = message.toLowerCase().replace(/[',.!?]/g,'');
			for (let l = this.data.dejavu, line; l < DEJAVU.length; l++) {
				line = DEJAVU[l].toLowerCase().replace(/[',.!?]/g,'');
				if (msg == line) {
					this.data.dejavu = l+1;
					return 'dejavu';
				}
			}
			this.data.dejavu = 0;
			
			// when 3 people send the same message in a channel in succession, join in on the fun
			let cj = this.data.cj[channelID] = this.data.cj[channelID] || {message:'',users:[]};
			if (message == cj.message && !cj.users.includes(userID)) {
				cj.users.push(userID);
				if (cj.users.length == 3) {
					return 'cj';
				}
			} else if (message.length > 50) {
				cj.message = '';
				cj.users = [];
			} else {
				cj.message = message;
				cj.users = [userID];
			}
		}
	},
	events: {
		payrespects({client, channelID, messageID}) {
			client.addReaction({channelID, messageID, reaction: '🇫'}).catch(e => client.error(e));
		},
		ayylmao({client, channelID, messageID}) {
			client.addReaction({channelID, messageID, reaction: '👽'}).catch(e => client.error(e));
		},
		cj({channelID}) {
			return this.data.cj[channelID].message;
		},
		doot() {
			return 'doot doot thank mr skeltal';
		},
		me_irl() {
			return random([
				'haha this is so me',
				'relatable',
				'me_irl',
				'me:dragon:irl',
				'haha yes',
				'very good',
				'beep beep lettuce',
				'chungus',
				'zoop',
				'Nice.',
				'nice',
				':ok_hand::eyes::ok_hand:',
				'holy whiskers you go sisters',
				':point_right::sunglasses::point_right: zoop',
				':point_left::sunglasses::point_left: zoop',
				'me too thanks',
				'me toothaches',
				'me two T. Hanks',
				'moi aussi merci', // french
				'yo también gracias', // spanish
				'ich auch danke', // german
				'ek ook dankie', // afrikaans
				'\u79C1\u3082\u3001\u3042\u308A\u304C\u3068\u3046', // japanese
				'\u6211\u4E5F\u662F\uFF0C\u8B1D\u8B1D', // chinese
				'Best By 07 SEP 18 043 | 49',
				'bean time :)',
				'can i get uhhhhhh fortnite borgar',
				'Thanos Car\nThanos Car',
				'they did surgery on a grape',
				'walter',
				'thog dont c aare'
			]);
		},
		thicc() {
			return random([
				'***THICC***',
				'***T H I C C***',
				'***EXTRA THICC***',
				'***E X T R A T H I C C***',
				'\u4E47\u4E42\u3112\u5C3A\u5342 \u3112\u5344\u4E28\u531A\u531A',
				'\uD835\uDCEE\uD835\uDD01\uD835\uDCFD\uD835\uDCFB\uD835\uDCEA \uD835\uDCFD\uD835\uDCF1\uD835\uDCF2\uD835\uDCEC\uD835\uDCEC'
			]);
		},
		oof() {
			if (random(100) == 0) return OOF;
			let reply = random(5) ? 'oof' : ('o'.repeat(random(3,8)) + 'f');
			if (random(true)) reply = reply[0].toUpperCase() + reply.substring(1);
			else if (random(true)) reply = reply.toUpperCase();
			if (!random(10))  reply += random(['.mp3','.mp4','.wav']);
			if (random(true)) reply = md.italics(reply);
			if (random(true)) reply = md.bold(reply);
			return reply;
		},
		ykihtditt() {
			return md.codeblock(YKIHTDITT);
		},
		thinking() {
			return md.codeblock(THINKING);
		},
		loss() {
			return md.codeblock(LOSS);
		},
		despacito({message}) {
			let song = message.substring(message.indexOf('play') + 5);
			if (song.toLowerCase() === 'despacito') {
				song = 'Luis Fonsi - Despacito (ft. Daddy Yankee)';
			}
			return md.codeblock(DESPACITO.replace('$SONG_NAME', song));
		},
		lennyface() {
			return LENNYFACE;
		},
		nani() {
			let reply = random([
				'何？！',  'マジかよ？！',   'それはどうかな…',
				'Nani?!', 'Majikayo?!', 'Sore wa dou kana...',
				'What?!', 'Seriously?', 'Are you sure about that?'
			]);
			if (random(true)) reply = reply.toUpperCase();
			if (random(true)) reply = md.italics(reply);
			if (random(true)) reply = md.bold(reply);			
			return reply;
		},
		society() {
			return random([
				'Gamers rise up!',
				'BOTTOM TEXT!',
				'There\'s people in the world.',
				'We preside in a civilization.',
				'Really makes you think. :thinking:',
				'I\'m crying this is so powerful',
				'omg I\'m literally shaking this can\'t be real',
				'this is so sad\ncan we hit 50 likes',
				'this is so sad\nAlexa play Despacito',
				'Real shit? <:wokeThink:341907071953797130>'
			]);
		},
		x_ass_y({client, message}) {
			var [,x,y] = message.match(/(\w+)-ass (\w+)/i);
			return x+' ass-'+y;
		},
		thankyou({client, message}) {
			return random([
				'you\'re welcome',
				'no problem',
				':ok_hand:',
				':thumbsup:',
				':smile:'
			]);
		},
		dejavu() {
			return DEJAVU[this.data.dejavu];
		},
		se_tonight() {
			return 'se tonight';
		}
	}
};
