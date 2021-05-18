const Encoder = require("./gbk");

let cherugo = new Encoder("切卟叮咧哔唎啪啰啵嘭噜噼巴拉蹦铃");

console.log(cherugo.encode("你好"));
