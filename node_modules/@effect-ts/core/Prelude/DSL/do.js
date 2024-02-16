"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindF = bindF;
exports.doF = doF;
exports.letF = letF;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _chain = /*#__PURE__*/require("./chain.js");

var _succeed = /*#__PURE__*/require("./succeed.js");

// ets_tracing: off
function doF(F) {
  return (0, _succeed.succeedF)(F)({});
}

function bindF(F) {
  return (tag, f) => mk => (0, _chain.chainF)(F)(k => F.map(a => Object.assign({}, k, {
    [tag]: a
  }))(f(k)))(mk);
}

function letF(F) {
  return (tag, f) => mk => F.map(k => Object.assign({}, k, {
    [tag]: f(k)
  }))(mk);
}
//# sourceMappingURL=do.js.map