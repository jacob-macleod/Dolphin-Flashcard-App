"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cached = cached;
exports.cached_ = cached_;

var _cachedInvalidate = /*#__PURE__*/require("./cachedInvalidate.js");

var _map = /*#__PURE__*/require("./map.js");

/**
 * Returns an effect that, if evaluated, will return the cached result of
 * this effect. Cached results will expire after `timeToLive` duration.
 *
 * @ets_data_first cached_
 */
function cached(ttl, __trace) {
  return fa => cached_(fa, ttl);
}
/**
 * Returns an effect that, if evaluated, will return the cached result of
 * this effect. Cached results will expire after `timeToLive` duration.
 */


function cached_(fa, ttl, __trace) {
  return (0, _map.map_)((0, _cachedInvalidate.cachedInvalidate_)(fa, ttl, __trace), ({
    tuple: [cachedEffect, _]
  }) => cachedEffect);
}
//# sourceMappingURL=cached.js.map