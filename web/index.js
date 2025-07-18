import { encode, decode } from "../src/cherugo.js";

window.onload = function () {
  const decodedArea = document.getElementById("decoded-area");
  const encodedArea = document.getElementById("encoded-area");
  const decodeBtn = document.getElementById("decode-btn");
  const encodeBtn = document.getElementById("encode-btn");

  encodeBtn.addEventListener("click", () => {
    encodedArea.value = "";
    encodedArea.value = encode(decodedArea.value);
  });

  decodeBtn.addEventListener("click", () => {
    decodedArea.value = "";
    decodedArea.value = decode(encodedArea.value);
  });
};
