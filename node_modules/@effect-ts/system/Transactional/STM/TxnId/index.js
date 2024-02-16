"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTxnId = makeTxnId;
exports.txnCounter = void 0;

require("../../../Operator/index.js");

var _index2 = /*#__PURE__*/require("../../../Support/AtomicNumber/index.js");

// ets_tracing: off
const txnCounter = /*#__PURE__*/new _index2.AtomicNumber(0);
exports.txnCounter = txnCounter;

function makeTxnId() {
  return txnCounter.incrementAndGet();
}
//# sourceMappingURL=index.js.map