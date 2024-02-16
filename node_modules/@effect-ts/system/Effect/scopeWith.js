"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scopeWith = scopeWith;

var _core = /*#__PURE__*/require("./core.js");

/**
 * Passes the fiber's scope to the specified function, which creates an effect
 * that will be returned from this method.
 */
function scopeWith(f, __trace) {
  return (0, _core.descriptorWith)(d => f(d.scope), __trace);
}
//# sourceMappingURL=scopeWith.js.map