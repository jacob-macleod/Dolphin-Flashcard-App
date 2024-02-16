"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferSignal = bufferSignal;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../../Managed/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../../Promise/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../../Queue/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../../Ref/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Channel/index.js"));

var TK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Take/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function bufferSignal(managed, channel) {
  const producer = (queue, ref) => {
    const terminate = take => CH.fromEffect(T.asUnit(T.tap_(T.tap_(T.tap_(T.bind_(T.tap_(T.bind_(T.do, "latch", () => ref.get), ({
      latch
    }) => P.await(latch)), "p", () => P.make()), ({
      p
    }) => Q.offer_(queue, Tp.tuple(take, p))), ({
      p
    }) => ref.set(p)), ({
      p
    }) => P.await(p))));

    return CH.readWith(_in => CH.zipRight_(CH.fromEffect(T.asUnit(T.tap_(T.bind_(T.bind_(T.do, "p", () => P.make()), "added", ({
      p
    }) => Q.offer_(queue, Tp.tuple(TK.chunk(_in), p))), ({
      added,
      p
    }) => T.when_(ref.set(p), () => added)))), producer(queue, ref)), err => terminate(TK.fail(err)), _ => terminate(TK.end));
  };

  const consumer = queue => {
    const process = CH.chain_(CH.fromEffect(Q.take(queue)), ({
      tuple: [take, promise]
    }) => CH.zipRight_(CH.fromEffect(P.succeed_(promise, undefined)), TK.fold_(take, CH.end(undefined), error => CH.failCause(error), value => CH.zipRight_(CH.write(value), process))));
    return process;
  };

  return CH.managed_(M.map_(M.tap_(M.bind_(M.tap_(M.bind_(M.bind_(M.do, "queue", () => managed), "start", () => T.toManaged(P.make())), ({
    start
  }) => T.toManaged(P.succeed_(start, undefined))), "ref", ({
    start
  }) => Ref.makeManagedRef(start)), ({
    queue,
    ref
  }) => M.fork(CH.runManaged(channel[">>>"](producer(queue, ref))))), ({
    queue
  }) => queue), queue => consumer(queue));
}
//# sourceMappingURL=bufferSignal.js.map