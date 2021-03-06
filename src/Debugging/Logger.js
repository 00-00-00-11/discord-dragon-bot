const {PIPE,CODE,LEVELS,FONT,FOREGROUND,BACKGROUND} = require('../Constants/Debug');

class Logger {
	constructor(name) {
		this.name = name;
		Object.defineProperties(this, {
			'_indent': {
				value: '',
				writable: true,
				enumerable: false
			},
			'_level': {
				value: LEVELS.NORMAL,
				writable: true,
				enumerable: false
			}
		});
	}
	indent() {
		this._indent += '  ';
	}
	unindent() {
		this._indent = this._indent.substring(0, this._indent.length - 2);
	}
	ln() {
		console.log('');
	}
	log(...x) {
		if (this._level > LEVELS.NORMAL) console.log(FOREGROUND.White + this.name, PIPE + this._indent, ...x);
		return x[0];
	}
	info(...x) {
		if (this._level > LEVELS.NONE) console.log(FOREGROUND.Green + this.name, PIPE, CODE.Info, PIPE + this._indent, ...x, FONT.Reset);
		return x[0];
	}
	warn(...x) {
		if (this._level > LEVELS.LIMITED) console.warn(FOREGROUND.Yellow + this.name, PIPE, CODE.Warn, PIPE + this._indent, ...x, FONT.Reset);
		return x[0];
	}
	error(...x) {
		if (this._level > LEVELS.LIMITED) console.error(FOREGROUND.Red + this.name, PIPE, CODE.Error, PIPE + this._indent, ...x, FONT.Reset);
		return x[0];
	}
	notice(...x) {
		if (this._level > LEVELS.LIMITED) console.log(FOREGROUND.Cyan + this.name, PIPE, CODE.Notice, PIPE + this._indent, ...x, FONT.Reset);
		return x[0];
	}
	red(...x) {
		console.log(FOREGROUND.Red + this.name, PIPE + this._indent, ...x, FONT.Reset);
	}
	green(...x) {
		console.log(FOREGROUND.Green + this.name, PIPE + this._indent, ...x, FONT.Reset)
	}
	yellow(...x) {
		console.log(FOREGROUND.Yellow + this.name, PIPE + this._indent, ...x, FONT.Reset)
	}
	blue(...x) {
		console.log(FOREGROUND.Blue + this.name, PIPE + this._indent, ...x, FONT.Reset)
	}
	magenta(...x) {
		console.log(FOREGROUND.Magenta + this.name, PIPE + this._indent, ...x, FONT.Reset)
	}
	cyan(...x) {
		console.log(FOREGROUND.Cyan + this.name, PIPE + this._indent, ...x, FONT.Reset)
	}
}

module.exports = Logger;
