import Encoder from "./gbk/index.js";

let cherugo = new Encoder("切卟叮咧哔唎啪啰啵嘭噜噼巴拉蹦铃");

export function decode(encoded_string) {
  if (encoded_string.substr(0, 4) !== "切噜～♪") {
    throw new Error("Invalid encoded string");
  }
  return encoded_string
    .substr(4)
    .replace(/切[切卟叮咧哔唎啪啰啵嘭噜噼巴拉蹦铃]+/g, (che) =>
      cherugo.decode(che.substr(1))
    );
}

export function encode(raw_string) {
  var new_string = raw_string.replace(
    /[a-zA-Z0-9一-龥]+/g,
    (word) => "切" + cherugo.encode(word)
  );
  return "切噜～♪" + new_string;
}
