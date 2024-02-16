"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = apply;

var _definitions = /*#__PURE__*/require("./definitions.js");

/**
 * Creates a new {@link Stream} from a managed effect that yields chunks.
 * The effect will be evaluated repeatedly until it fails with a `None`
 * (to signify stream end) or a `Some<E>` (to signify stream failure).
 *
 * The stream evaluation guarantees proper acquisition and release of the
 * {@link Managed}.
 */
function apply(proc) {
  return new _definitions.Stream(proc);
}
//# sourceMappingURL=apply.js.map