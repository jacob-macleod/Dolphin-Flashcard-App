"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transduce = transduce;
exports.transduce_ = transduce_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var AB = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Support/AtomicBoolean/index.js"));

var AR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Support/AtomicReference/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Applies the transducer to the stream and emits its outputs.
 */
function transduce_(self, sink) {
  return new C.Stream(CH.suspend(() => {
    const leftovers = new AR.AtomicReference(CK.empty());
    const upstreamDone = new AB.AtomicBoolean(false);
    const buffer = CH.suspend(() => {
      const l = leftovers.get;

      if (CK.isEmpty(l)) {
        return CH.readWith(c => CH.zipRight_(CH.write(c), buffer), e => CH.fail(e), done => CH.end(done));
      } else {
        leftovers.set(CK.empty());
        return CH.zipRight_(CH.writeChunk(l), buffer);
      }
    });

    const concatAndGet = c => {
      const ls = leftovers.get;
      const concat = CK.concat_(ls, CK.filter_(c, a => !CK.isEmpty(a)));
      leftovers.set(concat);
      return concat;
    };

    const upstreamMarker = CH.readWith(_in => CH.zipRight_(CH.write(_in), upstreamMarker), err => CH.fail(err), done => CH.zipRight_(CH.succeedWith(() => upstreamDone.set(true)), CH.end(done)));
    const transducer = CH.chain_(CH.doneCollect(sink.channel), ({
      tuple: [leftover, z]
    }) => CH.chain_(CH.succeedWith(() => Tp.tuple(upstreamDone.get, concatAndGet(leftover))), ({
      tuple: [done, newLeftovers]
    }) => {
      const nextChannel = done && CK.isEmpty(newLeftovers) ? CH.end(undefined) : transducer;
      return CH.zipRight_(CH.write(CK.single(z)), nextChannel);
    }));
    return self.channel[">>>"](upstreamMarker)[">>>"](buffer)[">>>"](transducer);
  }));
}
/**
 * Applies the transducer to the stream and emits its outputs.
 *
 * @ets_data_first transduce_
 */


function transduce(sink) {
  return self => transduce_(self, sink);
}
//# sourceMappingURL=transduce.js.map