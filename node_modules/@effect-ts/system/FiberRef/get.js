"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;

/**
 * Reads the value associated with the current fiber. Returns initial value if
 * no value was `set` or inherited from parent.
 */
function get(fiberRef) {
  return fiberRef.get;
}
//# sourceMappingURL=get.js.map