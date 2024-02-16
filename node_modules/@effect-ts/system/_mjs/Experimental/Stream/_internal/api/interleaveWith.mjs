import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as TK from "../../Take/index.mjs";
import * as C from "../core.mjs";
import * as HO from "../Handoff.mjs";
/**
 * Combines this stream and the specified stream deterministically using the
 * stream of boolean values `b` to control which stream to pull from next.
 * `true` indicates to pull from this stream and `false` indicates to pull
 * from the specified stream. Only consumes as many elements as requested by
 * `b`. If either this stream or the specified stream are exhausted further
 * requests for values from that stream will be ignored.
 */

export function interleaveWith_(self, that, b) {
  const producer = handoff => CH.readWithCause(value => CH.zipRight_(CH.fromEffect(HO.offer(handoff, TK.single(value))), producer(handoff)), cause => CH.fromEffect(HO.offer(handoff, TK.failCause(cause))), _ => CH.fromEffect(HO.offer(handoff, TK.end)));

  return new C.Stream(CH.managed_(M.map_(M.tap_(M.tap_(M.bind_(M.bind_(M.do, "left", () => T.toManaged(HO.make())), "right", () => T.toManaged(HO.make())), ({
    left
  }) => M.fork(CH.runManaged(CH.concatMap_(self.channel, _ => CH.writeChunk(_))[">>>"](producer(left))))), ({
    right
  }) => M.fork(CH.runManaged(CH.concatMap_(that.channel, _ => CH.writeChunk(_))[">>>"](producer(right))))), ({
    left,
    right
  }) => Tp.tuple(left, right)), ({
    tuple: [left, right]
  }) => {
    const process = (leftDone, rightDone) => CH.readWithCause(bool => {
      if (bool && !leftDone) {
        return CH.chain_(CH.fromEffect(HO.take(left)), TK.fold(rightDone ? CH.unit : process(true, rightDone), cause => CH.failCause(cause), chunk => CH.zipRight_(CH.write(chunk), process(leftDone, rightDone))));
      }

      if (!bool && !rightDone) {
        return CH.chain_(CH.fromEffect(HO.take(right)), TK.fold(leftDone ? CH.unit : process(leftDone, true), cause => CH.failCause(cause), chunk => CH.zipRight_(CH.write(chunk), process(leftDone, rightDone))));
      }

      return process(leftDone, rightDone);
    }, cause => CH.failCause(cause), _ => CH.unit);

    return CH.concatMap_(b.channel, _ => CH.writeChunk(_))[">>>"](process(false, false));
  }));
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