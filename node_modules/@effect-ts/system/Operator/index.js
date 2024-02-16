"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = patch;
// ets_tracing: off
let patched = false;

function patch() {
  if (patched || Object.prototype["|>"]) {
    return;
  }

  Object.defineProperty(Object.prototype, "|>", {
    value(next) {
      return next(this);
    },

    enumerable: false,
    writable: true
  });
  patched = true;
}

patch();
//# sourceMappingURL=index.js.map