"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orDie = orDie;

var _orDieWith = /*#__PURE__*/require("./orDieWith.js");

/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `unknown`.
 */
function orDie(effect, __trace) {
  return (0, _orDieWith.orDieWith_)(effect, e => e, __trace);
}
//# sourceMappingURL=orDie.js.map