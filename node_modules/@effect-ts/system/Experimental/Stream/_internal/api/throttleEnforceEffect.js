"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttleEnforceEffect = throttleEnforceEffect;
exports.throttleEnforceEffect_ = throttleEnforceEffect_;

var CL = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Clock/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` effectful function.
 */
function throttleEnforceEffect_(self, units, duration, costFn, burst = 0) {
  const loop = (tokens, timestamp) => CH.readWith(in_ => CH.unwrap(T.map_(T.zip_(costFn(in_), CL.currentTime), ({
    tuple: [weight, current]
  }) => {
    const elapsed = current - timestamp;
    const cycles = elapsed / duration;

    const available = (() => {
      const sum = Math.floor(tokens + cycles * units);
      const max = units + burst < 0 ? Number.MAX_SAFE_INTEGER : units + burst;
      return sum < 0 ? max : Math.min(sum, max);
    })();

    if (weight <= available) {
      return CH.zipRight_(CH.write(in_), loop(available - weight, current));
    } else {
      return loop(available, current);
    }
  })), e => CH.fail(e), _ => CH.unit);

  return new C.Stream(CH.chain_(CH.fromEffect(CL.currentTime), _ => self.channel[">>>"](loop(units, _))));
}
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` effectful function.
 *
 * @ets_data_first throttleEnforceEffect_
 */


function throttleEnforceEffect(units, duration, costFn, burst = 0) {
  return self => throttleEnforceEffect_(self, units, duration, costFn, burst);
}
//# sourceMappingURL=throttleEnforceEffect.js.map