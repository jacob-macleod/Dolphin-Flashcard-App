"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessMF = accessMF;
exports.accessServiceMF = accessServiceMF;
exports.provideServiceF = provideServiceF;
exports.provideSomeF = provideSomeF;

var _index = /*#__PURE__*/require("../../Function/index.js");

// ets_tracing: off
function accessMF(F) {
  return x => F.flatten(F.access(x));
}

function accessServiceMF(F) {
  return H => f => accessMF(F)(x => f(H.read(x)));
}

function provideServiceF(F) {
  return H => S => fa => accessMF(F)(r => F.provide({ ...r,
    [H.key]: S
  })(fa));
}

function provideSomeF(F) {
  return f => fa => accessMF(F)(r0 => F.provide(f(r0))(fa));
}
//# sourceMappingURL=access-provide.js.map