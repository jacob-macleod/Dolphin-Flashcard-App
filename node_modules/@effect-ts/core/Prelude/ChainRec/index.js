"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tailRec = tailRec;

function tailRec(a, f) {
  let v = f(a);

  while (v._tag === "Left") {
    v = f(v.left);
  }

  return v.right;
}
//# sourceMappingURL=index.js.map