"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterOrDie = filterOrDie;
exports.filterOrDieMessage = filterOrDieMessage;
exports.filterOrDieMessage_ = filterOrDieMessage_;
exports.filterOrDie_ = filterOrDie_;
exports.filterOrElse = filterOrElse;
exports.filterOrElse_ = filterOrElse_;
exports.filterOrFail = filterOrFail;
exports.filterOrFail_ = filterOrFail_;

var _index = /*#__PURE__*/require("../Cause/index.js");

var _index2 = /*#__PURE__*/require("../Function/index.js");

var _core = /*#__PURE__*/require("./core.js");

var _die = /*#__PURE__*/require("./die.js");

var _fail = /*#__PURE__*/require("./fail.js");

// ets_tracing: off
function filterOrDie(p, dieWith, __trace) {
  return fa => filterOrDie_(fa, p, dieWith, __trace);
}

function filterOrDie_(fa, p, dieWith, __trace) {
  return filterOrElse_(fa, p, x => (0, _die.die)(dieWith(x)), __trace);
}

function filterOrFail(p, failWith, __trace) {
  return fa => filterOrFail_(fa, p, failWith, __trace);
}

function filterOrFail_(fa, p, failWith, __trace) {
  return filterOrElse_(fa, p, x => (0, _fail.fail)(failWith(x)), __trace);
}

function filterOrElse(p, or, __trace) {
  return fa => filterOrElse_(fa, p, or, __trace);
}

function filterOrElse_(fa, p, or, __trace) {
  return (0, _core.chain_)(fa, a => p(a) ? (0, _core.succeed)(a, __trace) : (0, _core.suspend)(() => or(a), __trace));
}

function filterOrDieMessage(p, message, __trace) {
  return fa => filterOrDieMessage_(fa, p, message, __trace);
}

function filterOrDieMessage_(fa, p, message, __trace) {
  return filterOrDie_(fa, p, a => new _index.RuntimeError(message(a)), __trace);
}
//# sourceMappingURL=filterOr.js.map