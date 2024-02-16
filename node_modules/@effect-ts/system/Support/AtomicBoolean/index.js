"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AtomicBoolean = void 0;

require("../../Operator/index.js");

var _index2 = /*#__PURE__*/require("../AtomicReference/index.js");

// ets_tracing: off
class AtomicBoolean extends _index2.AtomicReference {
  constructor(b) {
    super(b);
  }

}

exports.AtomicBoolean = AtomicBoolean;
//# sourceMappingURL=index.js.map