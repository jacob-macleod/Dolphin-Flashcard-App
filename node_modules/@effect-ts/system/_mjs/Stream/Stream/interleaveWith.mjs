// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as Ex from "../../Exit/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as BP from "../../Stream/BufferedPull/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { combine_ } from "./combine.mjs";
import { Stream } from "./definitions.mjs";

function loop(leftDone, rightDone, s, left, right) {
  return T.foldCauseM_(s, _ => O.fold_(C.sequenceCauseOption(_), () => T.succeed(Ex.fail(O.none)), e => T.succeed(Ex.halt(C.map_(e, O.some)))), b => {
    if (b && !leftDone) {
      return T.foldCauseM_(left, _ => O.fold_(C.sequenceCauseOption(_), () => {
        if (rightDone) {
          return T.succeed(Ex.fail(O.none));
        } else {
          return loop(true, rightDone, s, left, right);
        }
      }, e => T.succeed(Ex.halt(C.map_(e, O.some)))), a => T.succeed(Ex.succeed(Tp.tuple(a, Tp.tuple(leftDone, rightDone, s)))));
    } else if (!b && !rightDone) {
      return T.foldCauseM_(right, _ => O.fold_(C.sequenceCauseOption(_), () => {
        if (leftDone) {
          return T.succeed(Ex.fail(O.none));
        } else {
          return loop(leftDone, true, s, left, right);
        }
      }, e => T.succeed(Ex.halt(C.map_(e, O.some)))), a => T.succeed(Ex.succeed(Tp.tuple(a, Tp.tuple(leftDone, rightDone, s)))));
    } else {
      return loop(leftDone, rightDone, s, left, right);
    }
  });
}
/**
 * Combines this stream and the specified stream deterministically using the
 * stream of boolean values `b` to control which stream to pull from next.
 * `true` indicates to pull from this stream and `false` indicates to pull
 * from the specified stream. Only consumes as many elements as requested by
 * `b`. If either this stream or the specified stream are exhausted further
 * requests for values from that stream will be ignored.
 */


export function interleaveWith_(self, that, b) {
  return new Stream(M.map_(M.bind_(M.bind_(M.do, "sides", () => M.mapM_(b.proc, BP.make)), "result", ({
    sides
  }) => combine_(self, that, Tp.tuple(false, false, BP.pullElement(sides)), ({
    tuple: [leftDone, rightDone, sides]
  }, left, right) => {
    return loop(leftDone, rightDone, sides, left, right);
  }).proc), ({
    result
  }) => result));
}
/**
 * Combines this stream and the specified stream deterministically using the
 * stream of boolean values `b` to control which stream to pull from next.
 * `true` indicates to pull from this stream and `false` indicates to pull
 * from the specified stream. Only consumes as many elements as requested by
 * `b`. If either this stream or the specified stream are exhausted further
 * requests for values from that stream will be ignored.
 *
 * @ets_data_first interleaveWith_
 */

export function interleaveWith(that, b) {
  return self => interleaveWith_(self, that, b);
}
//# sourceMappingURL=interleaveWith.mjs.map