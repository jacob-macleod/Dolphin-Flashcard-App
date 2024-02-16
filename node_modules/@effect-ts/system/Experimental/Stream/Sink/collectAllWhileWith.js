"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectAllWhileWith = collectAllWhileWith;
exports.collectAllWhileWith_ = collectAllWhileWith_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../Function/index.js");

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Ref/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Repeatedly runs the sink for as long as its results satisfy
 * the predicate `p`. The sink's results will be accumulated
 * using the stepping function `f`.
 */
function collectAllWhileWith_(self, z, p, f) {
  return new C.Sink(CH.chain_(CH.fromEffect(T.zip_(Ref.makeRef(CK.empty()), Ref.makeRef(false))), ({
    tuple: [leftoversRef, upstreamDoneRef]
  }) => {
    const upstreamMarker = CH.readWith(in_ => CH.zipRight_(CH.write(in_), upstreamMarker), _ => CH.fail(_), x => CH.as_(CH.fromEffect(upstreamDoneRef.set(true)), x));

    const loop = currentResult => CH.foldChannel_(CH.doneCollect(self.channel), _ => CH.fail(_), ({
      tuple: [leftovers, doneValue]
    }) => {
      if (p(doneValue)) {
        return CH.map_(CH.bind("result", ({
          accumulatedResult,
          upstreamDone
        }) => upstreamDone ? CH.as_(CH.write(CK.flatten(leftovers)), currentResult) : loop(accumulatedResult))(CH.let("accumulatedResult", () => f(currentResult, doneValue))(CH.bind("upstreamDone", () => CH.fromEffect(upstreamDoneRef.get))(CH.fromEffect(leftoversRef.set(CK.flatten(leftovers)))))), ({
          result
        }) => result);
      } else {
        return CH.as_(CH.write(CK.flatten(leftovers)), currentResult);
      }
    });

    return upstreamMarker[">>>"](CH.bufferChunk(leftoversRef))[">>>"](loop(z));
  }));
}
/**
 * Repeatedly runs the sink for as long as its results satisfy
 * the predicate `p`. The sink's results will be accumulated
 * using the stepping function `f`.
 *
 * @ets_data_first collectAllWhileWith_
 */


function collectAllWhileWith(z, p, f) {
  return self => collectAllWhileWith_(self, z, p, f);
}
//# sourceMappingURL=collectAllWhileWith.js.map