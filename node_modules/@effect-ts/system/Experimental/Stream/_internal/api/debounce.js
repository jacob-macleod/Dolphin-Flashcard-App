"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.debounce_ = debounce_;

var CL = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Clock/index.js"));

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Exit/index.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Fiber/index.js"));

var _index6 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var HO = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Handoff.js"));

var SER = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../SinkEndReason.js"));

var CrossRight = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./crossRight.js"));

var Managed = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./managed.js"));

var Unwrap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./unwrap.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const NotStartedTypeId = /*#__PURE__*/Symbol();

class NotStarted {
  constructor() {
    this._typeId = NotStartedTypeId;
  }

}

const PreviousTypeId = /*#__PURE__*/Symbol();

class Previous {
  constructor(fiber) {
    this.fiber = fiber;
    this._typeId = PreviousTypeId;
  }

}

const CurrentTypeId = /*#__PURE__*/Symbol();

class Current {
  constructor(fiber) {
    this.fiber = fiber;
    this._typeId = CurrentTypeId;
  }

}
/**
 * Delays the emission of values by holding new values for a set duration. If no new values
 * arrive during that time the value is emitted, however if a new value is received during the holding period
 * the previous value is discarded and the process is repeated with the new value.
 *
 * This operator is useful if you have a stream of "bursty" events which eventually settle down and you
 * only need the final event of the burst.
 *
 * @example A search engine may only want to initiate a search after a user has paused typing
 *          so as to not prematurely recommend results.
 */


function debounce_(self, d) {
  return Unwrap.unwrap(T.map_(T.bind_(T.bind_(T.do, "scope", () => T.forkScope), "handoff", () => HO.make()), ({
    handoff,
    scope
  }) => {
    const enqueue = last => T.map_(T.bind_(T.do, "f", () => T.forkIn_(T.as_(CL.sleep(d), last), scope)), ({
      f
    }) => consumer(new Previous(f)));

    const producer = CH.readWithCause(in_ => O.fold_(CK.last(in_), () => producer, last => CH.zipRight_(CH.fromEffect(HO.offer(handoff, new HO.Emit(CK.single(last)))), producer)), cause => CH.fromEffect(HO.offer(handoff, new HO.Halt(cause))), _ => CH.fromEffect(HO.offer(handoff, new HO.End(new SER.UpstreamEnd()))));

    const consumer = state => CH.unwrap((() => {
      switch (state._typeId) {
        case NotStartedTypeId:
          return T.map_(HO.take(handoff), sig => {
            switch (sig._typeId) {
              case HO.EmitTypeId:
                return CH.unwrap(enqueue(sig.els));

              case HO.HaltTypeId:
                return CH.failCause(sig.error);

              case HO.EndTypeId:
                return CH.unit;
            }
          });

        case CurrentTypeId:
          return T.map_(F.join(state.fiber), sig => {
            switch (sig._typeId) {
              case HO.EmitTypeId:
                return CH.unwrap(enqueue(sig.els));

              case HO.HaltTypeId:
                return CH.failCause(sig.error);

              case HO.EndTypeId:
                return CH.unit;
            }
          });

        case PreviousTypeId:
          return T.raceWith_(F.join(state.fiber), HO.take(handoff), (ex, current) => {
            if (Ex.succeeded(ex)) {
              return T.succeed(CH.zipRight_(CH.write(ex.value), consumer(new Current(current))));
            } else {
              return T.as_(F.interrupt(current), CH.failCause(ex.cause));
            }
          }, (ex, previous) => {
            if (Ex.succeeded(ex)) {
              const sig = ex.value;

              switch (sig._typeId) {
                case HO.EmitTypeId:
                  return T.zipRight_(F.interrupt(previous), enqueue(sig.els));

                case HO.HaltTypeId:
                  return T.as_(F.interrupt(previous), CH.failCause(sig.error));

                case HO.EndTypeId:
                  return T.map_(F.join(previous), _ => CH.zipRight_(CH.write(_), CH.unit));
              }
            } else {
              return T.as_(F.interrupt(previous), CH.failCause(ex.cause));
            }
          });
      }
    })());

    return CrossRight.crossRight_(Managed.managed(M.fork(CH.runManaged(self.channel[">>>"](producer)))), new C.Stream(consumer(new NotStarted())));
  }));
}
/**
 * Delays the emission of values by holding new values for a set duration. If no new values
 * arrive during that time the value is emitted, however if a new value is received during the holding period
 * the previous value is discarded and the process is repeated with the new value.
 *
 * This operator is useful if you have a stream of "bursty" events which eventually settle down and you
 * only need the final event of the burst.
 *
 * @example A search engine may only want to initiate a search after a user has paused typing
 *          so as to not prematurely recommend results.
 *
 * @ets_data_first debounce_
 */


function debounce(d) {
  return self => debounce_(self, d);
}
//# sourceMappingURL=debounce.js.map