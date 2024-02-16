"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggregateAsyncWithinEither = aggregateAsyncWithinEither;
exports.aggregateAsyncWithinEither_ = aggregateAsyncWithinEither_;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Fiber/index.js"));

var _index7 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Ref/index.js"));

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Schedule/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var HO = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Handoff.js"));

var SER = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../SinkEndReason.js"));

var Chain = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chain.js"));

var CrossRight = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./crossRight.js"));

var FromEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromEffect.js"));

var Managed = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./managed.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

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
function aggregateAsyncWithinEither_(self, sink, schedule) {
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


function aggregateAsyncWithinEither(sink, schedule) {
  return self => aggregateAsyncWithinEither_(self, sink, schedule);
}
//# sourceMappingURL=aggregateAsyncWithinEither.js.map