const Encoder = require("./gbk");

let cherugo = new Encoder("切卟叮咧哔唎啪啰啵嘭噜噼巴拉蹦铃");

function valuesDecode(encoded_string) {
    if (encoded_string.substr(0, 4) !== "切噜～♪") {
        return "错误";
    }
    return encoded_string
        .substr(4)
        .replace(/切[切卟叮咧哔唎啪啰啵嘭噜噼巴拉蹦铃]+/g, che =>
            cherugo.decode(che.substr(1))
        );
}

function valuesEncode(raw_string) {
    var new_string = raw_string.replace(
        /[^，。？！、…：“”,\.\?!\s]+/g,
        word => "切" + cherugo.encode(word)
    );
    return "切噜～♪" + new_string;
}

window.onload = function () {
    const decodedArea = document.getElementById("decoded-area");
    const encodedArea = document.getElementById("encoded-area");
    const decodeBtn = document.getElementById("decode-btn");
    const encodeBtn = document.getElementById("encode-btn");

    encodeBtn.addEventListener("click", () => {
        encodedArea.value = "";
        encodedArea.value = valuesEncode(decodedArea.value);
    });

    decodeBtn.addEventListener("click", () => {
        decodedArea.value = "";
        decodedArea.value = valuesDecode(encodedArea.value);
    });
};
