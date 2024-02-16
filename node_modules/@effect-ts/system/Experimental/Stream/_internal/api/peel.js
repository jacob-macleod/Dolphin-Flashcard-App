"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Halt = exports.End = exports.Emit = void 0;
exports.peel = peel;
exports.peel_ = peel_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Promise/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var SK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Sink/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var HO = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Handoff.js"));

var RunManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./runManaged.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const SignalTypeId = /*#__PURE__*/Symbol();
const EmitTypeId = /*#__PURE__*/Symbol();

class Emit {
  constructor(els) {
    this.els = els;
    this._signalTypeId = SignalTypeId;
    this._typeId = EmitTypeId;
  }

}

exports.Emit = Emit;
const HaltTypeId = /*#__PURE__*/Symbol();

class Halt {
  constructor(cause) {
    this.cause = cause;
    this._signalTypeId = SignalTypeId;
    this._typeId = HaltTypeId;
  }

}

exports.Halt = Halt;
const EndTypeId = /*#__PURE__*/Symbol();

class End {
  constructor() {
    this._signalTypeId = SignalTypeId;
    this._typeId = EndTypeId;
  }

}
/**
 * Peels off enough material from the stream to construct a `Z` using the
 * provided `Sink` and then returns both the `Z` and the rest of the
 * `Stream` in a managed resource. Like all `Managed` values, the provided
 * stream is valid only within the scope of `Managed`.
 */


exports.End = End;

function peel_(self, sink) {
  return M.flatten(M.map_(M.bind_(M.bind_(M.do, "p", () => T.toManaged(P.make())), "handoff", () => T.toManaged(HO.make())), ({
    handoff,
    p
  }) => {
    const consumer = SK.foldSink_(SK.exposeLeftover(sink), e => SK.zipRight_(SK.fromEffect(P.fail_(p, e)), SK.fail(e)), ({
      tuple: [z1, leftovers]
    }) => {
      const loop = CH.readWithCause(in_ => CH.zipRight_(CH.fromEffect(HO.offer(handoff, new Emit(in_))), loop), e => CH.zipRight_(CH.fromEffect(HO.offer(handoff, new Halt(e))), CH.failCause(e)), _ => CH.zipRight_(CH.fromEffect(HO.offer(handoff, new End())), CH.unit));
      return new SK.Sink(CH.zipRight_(CH.zipRight_(CH.fromEffect(P.succeed_(p, z1)), CH.fromEffect(HO.offer(handoff, new Emit(leftovers)))), loop));
    });
    const producer = CH.unwrap(T.map_(HO.take(handoff), sig => {
      switch (sig._typeId) {
        case EmitTypeId:
          return CH.zipRight_(CH.write(sig.els), producer);

        case HaltTypeId:
          return CH.failCause(sig.cause);

        default:
          return CH.unit;
      }
    }));
    return M.map_(M.chain_(M.fork(RunManaged.runManaged_(self, consumer)), _ => T.toManaged(P.await(p))), z => Tp.tuple(z, new C.Stream(producer)));
  }));
}
/**
 * Peels off enough material from the stream to construct a `Z` using the
 * provided `Sink` and then returns both the `Z` and the rest of the
 * `Stream` in a managed resource. Like all `Managed` values, the provided
 * stream is valid only within the scope of `Managed`.
 *
 * @ets_data_first peel_
 */


function peel(sink) {
  return self => peel_(self, sink);
}
//# sourceMappingURL=peel.js.map