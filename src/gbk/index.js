import charMap from './char-map.js';

function isAscii(unicode) {
    return unicode == 0x20ac || (unicode <= 0x007f && unicode >= 0x0000);
}

let charData = charMap
    .replace(/#(\d+)\$/g, function (a, b) {
        return Array(+b + 3).join("#");
    })
    .replace(/#/g, "####")
    .replace(/(\w\w):([\w#]+)(?:,|$)/g, function (a, hd, dt) {
        return dt.replace(/../g, function (a) {
            if (a != "##") {
                return hd + a;
            } else {
                return a;
            }
        });
    });

class Encoder {
    constructor(charset) {
        this.charset = charset;
        this.charsetDict = Object.keys(charset).reduce((acc, key) => {
            acc[charset[key]] = parseInt(key);
            return acc;
        }, {});
        this.unicode2gbk = {};
        this.gbk2unicode = {};
        var k = 0;
        let data = charData.match(/..../g);
        for (var i = 0x81; i <= 0xfe; i++) {
            for (var j = 0x40; j <= 0xfe; j++) {
                this.unicode2gbk[data[k++]] =
                    charset[i & 0xf] +
                    charset[i >> 4] +
                    charset[j & 0xf] +
                    charset[j >> 4];
            }
        }
        for (var key in this.unicode2gbk) {
            this.gbk2unicode[this.unicode2gbk[key]] = key;
        }
    }
    encode(str) {
        return str.replace(/./g, a => {
            var code = a.charCodeAt(0);
            if (isAscii(code)) {
                return this.charset[code & 0xf] + this.charset[code >> 4];
            } else {
                var key = code.toString(16);
                if (key.length != 4) key = ("000" + key).match(/....$/)[0];
                return this.unicode2gbk[key] || a;
            }
        });
    }
    decode(str) {
        var output = "";
        var h = null;
        for (let i = 0, charsLength = str.length; i < charsLength; i += 2) {
            if (h !== null) {
                var a = h + str.substr(i, 2);
                h = null;
                output += String.fromCharCode("0x" + this.gbk2unicode[a]);
            } else if (this.charsetDict[str[i + 1]] < 8) {
                var code =
                    (this.charsetDict[str[i + 1]] << 4) +
                    this.charsetDict[str[i]];
                output += String.fromCharCode(code);
            } else {
                h = str.substr(i, 2);
            }
        }
        return output;
    }
}

export default Encoder;
