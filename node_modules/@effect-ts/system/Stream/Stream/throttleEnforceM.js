"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttleEnforceM = throttleEnforceM;
exports.throttleEnforceM_ = throttleEnforceM_;

var CL = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Clock/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` effectful function.
 *
 * @ets_data_first throttleEnforceM_
 */
function throttleEnforceM(costFn, units, duration, burst = 0) {
  return self => throttleEnforceM_(self, costFn, units, duration, burst);
}
/**
 * Throttles the chunks of this stream according to the given bandwidth parameters using the token bucket
 * algorithm. Allows for burst in the processing of elements by allowing the token bucket to accumulate
 * tokens up to a `units + burst` threshold. Chunks that do not meet the bandwidth constraints are dropped.
 * The weight of each chunk is determined by the `costFn` effectful function.
 */


function throttleEnforceM_(self, costFn, units, duration, burst = 0) {
  return new _definitions.Stream(M.map_(M.let_(M.bind_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "currentTime", () => T.toManaged(CL.currentTime)), "bucket", ({
    currentTime
  }) => T.toManaged(Ref.makeRef(Tp.tuple(units, currentTime)))), "pull", ({
    bucket,
    chunks
  }) => {
    const go = T.chain_(chunks, chunk => T.chain_(T.zip_(T.mapError_(costFn(chunk), O.some), CL.currentTime), ({
      tuple: [weight, current]
    }) => T.chain_(Ref.modify_(bucket, ({
      tuple: [tokens, timestamp]
    }) => {
      const elapsed = current - timestamp;
      const cycles = elapsed / duration;

      const available = (() => {
        const sum = tokens + cycles * units;
        const max = units + burst < 0 ? Number.MAX_VALUE : units + burst;
        return sum < 0 ? max : Math.min(sum, max);
      })();

      if (weight <= available) {
        return Tp.tuple(O.some(chunk), Tp.tuple(available - weight, current));
      } else {
        return Tp.tuple(O.none, Tp.tuple(available, current));
      }
    }), O.fold(() => go, os => T.succeed(os))))); //

    return go;
  }), ({
    pull
  }) => pull));
}
//# sourceMappingURL=throttleEnforceM.js.map