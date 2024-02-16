// ets_tracing: off
import * as CL from "../Clock/index.mjs";
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as T from "../Effect/index.mjs";
import { pipe } from "../Function/index.mjs";
import * as Ref from "../Ref/index.mjs";
export class StrategyBase {}
T._R, T._E, T._A;
/**
 * A strategy that does nothing to shrink excess items. This is useful
 * when the minimum size of the pool is equal to its maximum size and so
 * there is nothing to do.
 */

export class None extends StrategyBase {
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

export class TimeToLive extends StrategyBase {
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
//# sourceMappingURL=Strategy.mjs.map