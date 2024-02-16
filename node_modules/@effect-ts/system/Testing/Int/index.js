"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Int = Int;

// ets_tracing: off
function Int(n) {
  if (!Number.isInteger(n)) {
    throw new Error("not an integer");
  }

  return n;
}
//# sourceMappingURL=index.js.map