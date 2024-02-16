// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as F from "../../../../Fiber/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Ref from "../../../../Ref/index.mjs";
import * as SC from "../../../../Schedule/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
import * as HO from "../Handoff.mjs";
import * as SER from "../SinkEndReason.mjs";
import * as Chain from "./chain.mjs";
import * as CrossRight from "./crossRight.mjs";
import * as FromEffect from "./fromEffect.mjs";
import * as Managed from "./managed.mjs";
/**
 * Aggregates elements using the provided sink until it completes, or until the
 * delay signalled by the schedule has passed.
 *
 * This operator divides the stream into two asynchronous islands. Operators upstream
 * of this operator run on one fiber, while downstream operators run on another. Elements
 * will be aggregated by the sink until the downstream fiber pulls the aggregated value,
 * or until the schedule's delay has passed.
 *
 * Aggregated elements will be fed into the schedule to determine the delays between
 * pulls.
 */

export function aggregateAsyncWithinEither_(self, sink, schedule) {
  const deps = T.tuple(HO.make(), Ref.makeRef(new SER.SinkEnd()), Ref.makeRef(CK.empty()), SC.driver(schedule));
  return Chain.chain_(FromEffect.fromEffect(deps), ({
    tuple: [handoff, sinkEndReason, sinkLeftovers, scheduleDriver]
  }) => {
    const handoffProducer = CH.readWithCause(_in => CH.zipRight_(CH.fromEffect(HO.offer(handoff, new HO.Emit(_in))), handoffProducer), cause => CH.fromEffect(HO.offer(handoff, new HO.Halt(cause))), _ => CH.fromEffect(HO.offer(handoff, new HO.End(new SER.UpstreamEnd()))));
    const handoffConsumer = CH.unwrap(T.chain_(Ref.getAndSet_(sinkLeftovers, CK.empty()), leftovers => {
      if (CK.isEmpty(leftovers)) {
        return T.succeed(CH.zipRight_(CH.write(leftovers), handoffConsumer));
      } else {
        return T.map_(HO.take(handoff), _ => {
          switch (_._typeId) {
            case HO.EmitTypeId:
              return CH.zipRight_(CH.write(_.els), handoffConsumer);

            case HO.HaltTypeId:
              return CH.failCause(_.error);

            case HO.EndTypeId:
              return CH.fromEffect(Ref.set_(sinkEndReason, _.reason));
          }
        });
      }
    }));

    const scheduledAggregator = lastB => {
      const timeout = T.foldCauseM_(scheduleDriver.next(lastB), _ => E.fold_(CS.failureOrCause(_), _ => HO.offer(handoff, new HO.End(new SER.ScheduleTimeout())), cause => HO.offer(handoff, new HO.Halt(cause))), c => HO.offer(handoff, new HO.End(new SER.ScheduleEnd(c))));
      return CH.chain_(CH.managed_(T.forkManaged(timeout), fiber => {
        return CH.chain_(CH.doneCollect(handoffConsumer[">>>"](sink.channel)), ({
          tuple: [leftovers, b]
        }) => {
          return CH.zipRight_(CH.fromEffect(T.zipRight_(F.interrupt(fiber), Ref.set_(sinkLeftovers, CK.flatten(leftovers)))), CH.unwrap(Ref.modify_(sinkEndReason, reason => {
            switch (reason._typeId) {
              case SER.ScheduleEndTypeId:
                return Tp.tuple(CH.as_(CH.write(CK.from([E.right(b), E.left(reason.c)])), O.some(b)), new SER.SinkEnd());

              case SER.ScheduleTimeoutTypeId:
                return Tp.tuple(CH.as_(CH.write(CK.single(E.right(b))), O.some(b)), new SER.SinkEnd());

              case SER.SinkEndTypeId:
                return Tp.tuple(CH.as_(CH.write(CK.single(E.right(b))), O.some(b)), new SER.SinkEnd());

              case SER.UpstreamEndTypeId:
                return Tp.tuple(CH.as_(CH.write(CK.single(E.right(b))), O.none), new SER.UpstreamEnd());
            }
          })));
        });
      }), _ => {
        if (O.isNone(_)) {
          return CH.unit;
        } else {
          return scheduledAggregator(_);
        }
      });
    };

    return CrossRight.crossRight_(Managed.managed(M.fork(CH.runManaged(self.channel[">>>"](handoffProducer)))), new C.Stream(scheduledAggregator(O.none)));
  });
}
/**
 * Aggregates elements using the provided sink until it completes, or until the
 * delay signalled by the schedule has passed.
 *
 * This operator divides the stream into two asynchronous islands. Operators upstream
 * of this operator run on one fiber, while downstream operators run on another. Elements
 * will be aggregated by the sink until the downstream fiber pulls the aggregated value,
 * or until the schedule's delay has passed.
 *
 * Aggregated elements will be fed into the schedule to determine the delays between
 * pulls.
 *
 * @ets_data_first aggregateAsyncWithinEither_
 */

export function aggregateAsyncWithinEither(sink, schedule) {
  return self => aggregateAsyncWithinEither_(self, sink, schedule);
}
//# sourceMappingURL=aggregateAsyncWithinEither.mjs.map