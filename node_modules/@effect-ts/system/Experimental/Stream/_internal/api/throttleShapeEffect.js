"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttleShapeEffect = throttleShapeEffect;
exports.throttleShapeEffect_ = throttleShapeEffect_;

var CL = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Clock/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Delays the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. The weight of each chunk is determined by the `costFn`
 * effectful function.
 */
function throttleShapeEffect_(self, units, duration, costFn, burst = 0) {
  const loop = (tokens, timestamp) => CH.readWith(in_ => CH.unwrap(T.map_(T.bind_(T.bind_(T.do, "weight", () => costFn(in_)), "current", () => CL.currentTime), ({
    current,
    weight
  }) => {
    const elapsed = current - timestamp;
    const cycles = elapsed - duration;

    const available = (() => {
      const sum = Math.floor(tokens + cycles * units);
      const max = units + burst < 0 ? Number.MAX_SAFE_INTEGER : units + burst;
      return sum < 0 ? max : Math.min(sum, max);
    })();

    const remaining = available - weight;
    const waitCycles = remaining >= 0 ? 0 : -remaining / units;
    const delay = Math.floor(waitCycles * duration);

    if (delay > 0) {
      return CH.zipRight_(CH.zipRight_(CH.fromEffect(CL.sleep(delay)), CH.write(in_)), loop(remaining, current));
    } else {
      return CH.zipRight_(CH.write(in_), loop(remaining, current));
    }
  })), e => CH.fail(e), _ => CH.unit);

  return new C.Stream(CH.chain_(CH.fromEffect(CL.currentTime), _ => self.channel[">>>"](loop(units, _))));
}
/**
 * Delays the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. The weight of each chunk is determined by the `costFn`
 * effectful function.
 *
 * @ets_data_first throttleShapeEffect_
 */


function throttleShapeEffect(units, duration, costFn, burst = 0) {
  return self => throttleShapeEffect_(self, units, duration, costFn, burst);
}
//# sourceMappingURL=throttleShapeEffect.js.map