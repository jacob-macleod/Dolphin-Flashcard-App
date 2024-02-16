"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foldManagedM = foldManagedM;

var _foldWhileManagedM = /*#__PURE__*/require("./foldWhileManagedM.js");

/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 */
function foldManagedM(s) {
  return f => self => (0, _foldWhileManagedM.foldWhileManagedM)(s)(_ => true)(f)(self);
}
//# sourceMappingURL=foldManagedM.js.map