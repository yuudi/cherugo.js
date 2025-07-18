# 切噜语

Demo: <https://pcrbot.github.io/cherugo.js/>

[原版切噜语](https://github.com/Ice-Cirno/HoshinoBot/blob/master/hoshino/modules/priconne/cherugo.py) 的 JavaScript 实现，与原版兼容

## 使用

```sh
npm i "cherugo@git+https://github.com/yuudi/cherugo.js.git"
```

```js
import { encode, decode } from "cherugo";
console.log(cherugo.encode("你好"));
```

## 构建 demo

```sh
webpack ./web/index.js
```
