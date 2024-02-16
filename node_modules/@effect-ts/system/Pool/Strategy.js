"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeToLive = exports.StrategyBase = exports.None = void 0;

var CL = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Clock/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Effect/index.js"));

var _index4 = /*#__PURE__*/require("../Function/index.js");

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Ref/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class StrategyBase {}

exports.StrategyBase = StrategyBase;
T._R, T._E, T._A;
/**
 * A strategy that does nothing to shrink excess items. This is useful
 * when the minimum size of the pool is equal to its maximum size and so
 * there is nothing to do.
 */

class None extends StrategyBase {
  initial() {
    return T.unit;
  }

  track(_state) {
    return _attempted => T.unit;
  }

  run(_state, _getExcess, _shrink) {
    return T.unit;
  }

}
/**
 * A strategy that shrinks the pool down to its minimum size if items in
 * the pool have not been used for the specified duration.
 */


exports.None = None;

class TimeToLive extends StrategyBase {
  constructor(timeToLive) {
    super();
    this.timeToLive = timeToLive;
    this.initial = this.initial.bind(this);
    this.track = this.track.bind(this);
    this.run = this.run.bind(this);
  }

  initial() {
    return T.map_(T.bind_(T.bind_(T.bind_(T.do, "clock", () => T.service(CL.HasClock)), "now", ({
      clock
    }) => clock.currentTime), "ref", ({
      now
    }) => Ref.makeRef(now)), ({
      clock,
      ref
    }) => Tp.tuple(clock, ref));
  }

  track(state) {
    return _attempted => {
      const {
        tuple: [clock, ref]
      } = state;
      return T.asUnit(T.tap_(T.bind_(T.do, "now", () => clock.currentTime), ({
        now
      }) => ref.set(now)));
    };
  }

  run(state, getExcess, shrink) {
    const {
      tuple: [clock, ref]
    } = state;
    return T.chain_(getExcess, excess => {
      if (excess <= 0) {
        return T.zipRight_(clock.sleep(this.timeToLive), this.run(state, getExcess, shrink));
      } else {
        return T.chain_(T.zip_(ref.get, clock.currentTime), ({
          tuple: [start, end]
        }) => {
          const duration = end - start;

          if (duration >= this.timeToLive) {
            return T.zipRight_(shrink, this.run(state, getExcess, shrink));
          } else {
            return T.zipRight_(clock.sleep(this.timeToLive), this.run(state, getExcess, shrink));
          }
        });
      }
    });
  }

}

exports.TimeToLive = TimeToLive;
//# sourceMappingURL=Strategy.js.map