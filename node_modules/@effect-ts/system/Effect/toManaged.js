"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toManaged = toManaged;
exports.toManagedRelease = toManagedRelease;
exports.toManagedRelease_ = toManagedRelease_;

var _fromEffect = /*#__PURE__*/require("../Managed/fromEffect.js");

var _makeExit = /*#__PURE__*/require("../Managed/makeExit.js");

// ets_tracing: off

/**
 * Converts this Effect to a Managed. This Effect and the provided release action
 * will be performed uninterruptibly.
 */
function toManaged(self) {
  return (0, _fromEffect.fromEffect)(self);
}
/**
 * Converts this Effect to a Managed. This Effect and the provided release action
 * will be performed uninterruptibly.
 */


function toManagedRelease_(self, release) {
  return (0, _makeExit.makeExit_)(self, release);
}
/**
 * Converts this Effect to a Managed. This Effect and the provided release action
 * will be performed uninterruptibly.
 *
 * @ets_data_first toManagedRelease_
 */


function toManagedRelease(release) {
  return self => (0, _makeExit.makeExit_)(self, release);
}
//# sourceMappingURL=toManaged.js.map