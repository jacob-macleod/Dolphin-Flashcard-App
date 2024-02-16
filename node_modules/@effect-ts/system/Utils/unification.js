"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = patch;
let patched = false;

function patch() {
  if (patched || Object.prototype["|>"]) {
    return;
  }

  Object.defineProperty(Object.prototype, "unify", {
    value() {
      return this;
    },

    enumerable: false,
    writable: true
  });
  patched = true;
}

patch();
//# sourceMappingURL=unification.js.map