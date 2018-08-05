const {random,Markdown:md} = require('../Utils');

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

module.exports = {
	id: 'memes',
	info: 'Reply with maymays',
	permissions: 'public',
	resolver({message}) {
		if (/doot|calcium|strong bones/i.test(message)) return 'doot';
		else if (/^me(.{1,4}|<.*>)?irl$/i.test(message)) return 'me_irl';
		else if (/thicc/i.test(message)) return 'thicc';
		else if (/^(oof|ouch|ow|owie)$/i.test(message)) return 'oof';
		else if (/you know (i|he|she|they) had to do it to (th)?em/i.test(message)) return 'ykihtditt';
		else if (/really makes you think/i.test(message)) return 'thinking';
		else if (/lenny ?face/i.test(message)) return 'lennyface';
		else if (/omae wa mou shindeiru/i.test(message)) return 'nani';
		else if (/is this loss/i.test(message)) return 'loss';
		else if (/delete? this/i.test(message)) return 'delet_this';
		else if (/we live in a society/i.test(message)) return 'society';
		else if (/ay{2,} ?lmao/i.test(message)) return 'ayylmao';
		else if (/^what[\.\?]*$/i.test(message)) return 'what';
		else if (/(\w+)-ass (\w+)/i.test(message)) return 'x_ass_y';
		else if (/(alexa|siri|google|dragon|dragonbot),? play (.+)/i.test(message)) return 'despacito';
	},
	events: {
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
				'\u6211\u4E5F\u662F\uFF0C\u8B1D\u8B1D' // chinese
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
			return random([
				'*OOF*',
				'**OOF**',
				'***OOF***',
				'oof ouch owie',
				'oof ouch my bones',
				'oof ouch my discord',
				'oof ow my message',
				'ow oof ouchie my memes',
				'/r/bonehurtingjuice',
				'/r/oof',
				OOF
			]);
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
			return '*NANI?!*';
		},
		delet_this({client, channelID}) {
			return client.undo(channelID);
		},
		society() {
			return random([
				'BOTTOM TEXT!',
				'There\'s people in the world.',
				'We preside in a civilization.',
				'Really makes you think. :thinking:',
				'I\'m crying this is so powerful',
				'omg I\'m literally shaking this can\'t be real',
				'this is so sad\ncan we hit 50 likes',
				'this is so sad\ncan we hit ~~50 likes~~ babies',
				'this is so sad\nAlexa play Despacito',
				'Real shit? <:wokeThink:341907071953797130>'
			]);
		},
		ayylmao({client, channelID, messageID}) {
			client.addReaction({channelID, messageID, reaction: '👽'}).catch(e => client.error(e));
		},
		what({client, channelID, messageID}) {
			return client.getMessages({channelID,limit:1,before:messageID})
			.then(res => (res[0] && res[0].content ? `*${res[0].content.toUpperCase()}*` : ''));
		},
		x_ass_y({client, message}) {
			var [,x,y] = message.match(/(\w+)-ass (\w+)/i);
			return x+' ass-'+y;
		}
	}
};


