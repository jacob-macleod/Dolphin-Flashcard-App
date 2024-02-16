"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cachedInvalidate = cachedInvalidate;
exports.cachedInvalidate_ = cachedInvalidate_;

var _index = /*#__PURE__*/require("../Clock/index.js");

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _index3 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../RefM/index.js"));

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var die = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./die.js"));

var Do = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./do.js"));

var _environment = /*#__PURE__*/require("./environment.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./excl-forEach-promise.js"));

var uninterruptibleMask = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./interruption.js"));

var map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var tap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./tap.js"));

var to = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./to.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns an effect that, if evaluated, will return the cached result of
 * this effect. Cached results will expire after `timeToLive` duration. In
 * addition, returns an effect that can be used to invalidate the current
 * cached value before the `timeToLive` duration expires.
 *
 * @ets_data_first cachedInvalidate_
 */
function cachedInvalidate(ttl, __trace) {
  return fa => cachedInvalidate_(fa, ttl);
}
/**
 * Returns an effect that, if evaluated, will return the cached result of
 * this effect. Cached results will expire after `timeToLive` duration. In
 * addition, returns an effect that can be used to invalidate the current
 * cached value before the `timeToLive` duration expires.
 */


function cachedInvalidate_(fa, ttl, __trace) {
  return map.map_(Do.bind_(Do.bind_(Do.do, "r", () => (0, _environment.environment)()), "cache", () => Ref.makeRefM(O.none)), ({
    cache,
    r
  }) => Tp.tuple(core.provideAll_(get(fa, ttl, cache), r), invalidate(cache)), __trace);
}

function invalidate(cache) {
  return cache.set(O.none);
}

function compute(fa, ttl, start) {
  return map.map_(tap.tap_(Do.bind_(Do.do, "p", () => P.make()), ({
    p
  }) => to.to_(fa, p)), ({
    p
  }) => O.some(Tp.tuple(start + ttl, p)));
}

function get(fa, ttl, cache) {
  return uninterruptibleMask.uninterruptibleMask(({
    restore
  }) => core.chain_(_index.currentTime, time => core.chain_(Ref.updateSomeAndGet(o => O.fold_(o, () => O.some(compute(fa, ttl, time)), ({
    tuple: [end]
  }) => end - time <= 0 ? O.some(compute(fa, ttl, time)) : O.none))(cache), a => a._tag === "None" ? die.die("bug") : restore(P.await(a.value.get(1))))));
}
//# sourceMappingURL=cachedInvalidate.js.map