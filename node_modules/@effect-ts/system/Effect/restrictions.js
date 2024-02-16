"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noEnv = noEnv;
exports.onlyDefaultEnv = onlyDefaultEnv;
exports.unfailable = unfailable;

/**
 * Forces `self` to be non failable
 *
 * @ets_optimize identity
 */
function unfailable(self) {
  return self;
}
/**
 * Forces `self` to be only require `DefaultEnv`
 *
 * @ets_optimize identity
 */


function onlyDefaultEnv(self) {
  return self;
}
/**
 * Forces `self` to be not require any environment
 *
 * @ets_optimize identity
 */


function noEnv(self) {
  return self;
}
//# sourceMappingURL=restrictions.js.map