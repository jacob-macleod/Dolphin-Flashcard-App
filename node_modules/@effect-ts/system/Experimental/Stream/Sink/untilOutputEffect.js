"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.untilOutputEffect = untilOutputEffect;
exports.untilOutputEffect_ = untilOutputEffect_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Ref/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a sink that produces values until one verifies
 * the predicate `f`.
 */
function untilOutputEffect_(self, f) {
  return new C.Sink(CH.chain_(CH.fromEffect(T.zip_(Ref.makeRef(CK.empty()), Ref.makeRef(false))), ({
    tuple: [leftoversRef, upstreamDoneRef]
  }) => {
    const upstreamMarker = CH.readWith(in_ => CH.zipRight_(CH.write(in_), upstreamMarker), _ => CH.fail(_), _ => CH.as_(CH.fromEffect(upstreamDoneRef.set(true)), _));
    const loop = CH.foldChannel_(CH.doneCollect(self.channel), CH.fail, ({
      tuple: [leftovers, doneValue]
    }) => CH.map_(CH.bind("res", ({
      satisfied,
      upstreamDone
    }) => {
      if (satisfied) {
        return CH.as_(CH.write(CK.flatten(leftovers)), O.some(doneValue));
      } else if (upstreamDone) {
        return CH.as_(CH.write(CK.flatten(leftovers)), O.none);
      } else {
        return loop;
      }
    })(CH.bind("upstreamDone", () => CH.fromEffect(upstreamDoneRef.get))(CH.bind("_", () => CH.fromEffect(leftoversRef.set(CK.flatten(leftovers))))(CH.bind("satisfied", () => CH.fromEffect(f(doneValue)))(CH.do)))), ({
      res
    }) => res));
    return upstreamMarker[">>>"](CH.bufferChunk(leftoversRef))[">>>"](loop);
  }));
}
/**
 * Creates a sink that produces values until one verifies
 * the predicate `f`.
 *
 * @ets_data_first untilOutputEffect_
 */


function untilOutputEffect(f) {
  return self => untilOutputEffect_(self, f);
}
//# sourceMappingURL=untilOutputEffect.js.map