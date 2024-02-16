"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foldWeightedDecomposeEffect = foldWeightedDecomposeEffect;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var _index4 = /*#__PURE__*/require("../../../Function/index.js");

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a sink that effectfully folds elements of type `In` into a structure
 * of type `S`, until `max` worth of elements (determined by the `costFn`) have
 * been folded.
 *
 * The `decompose` function will be used for decomposing elements that
 * cause an `S` aggregate to cross `max` into smaller elements. Be vigilant with
 * this function, it has to generate "simpler" values or the fold may never end.
 * A value is considered indivisible if `decompose` yields the empty chunk or a
 * single-valued chunk. In these cases, there is no other choice than to yield
 * a value that will cross the threshold.
 *
 * See `foldWeightedDecompose` for an example.
 */
function foldWeightedDecomposeEffect(z, costFn, max, decompose, f) {
  const go = (s, cost, dirty) => CH.readWith(in_ => {
    const fold = (in_, s, dirty, cost, idx) => {
      if (idx === CK.size(in_)) {
        return T.succeed(Tp.tuple(s, cost, dirty, CK.empty()));
      } else {
        const elem = CK.unsafeGet_(in_, idx);
        return T.chain_(T.map_(costFn(s, elem), _ => cost + _), total => {
          if (total <= max) {
            return T.chain_(f(s, elem), _ => fold(in_, _, true, total, idx + 1));
          } else {
            return T.chain_(decompose(elem), decomposed => {
              if (CK.size(decomposed) <= 1 && !dirty) {
                return T.map_(f(s, elem), _ => Tp.tuple(_, total, true, CK.drop_(in_, idx + 1)));
              } else if (CK.size(decomposed) <= 1 && dirty) {
                return T.succeed(Tp.tuple(s, cost, dirty, CK.drop_(in_, idx)));
              } else {
                return fold(CK.concat_(decomposed, CK.drop_(in_, idx + 1)), s, dirty, cost, 0);
              }
            });
          }
        });
      }
    };

    return CH.chain_(CH.fromEffect(fold(in_, s, dirty, cost, 0)), ({
      tuple: [nextS, nextCost, nextDirty, leftovers]
    }) => {
      if (!CK.isEmpty(leftovers)) {
        return CH.zipRight_(CH.write(leftovers), CH.end(nextS));
      } else if (cost > max) {
        return CH.end(nextS);
      } else {
        return go(nextS, nextCost, nextDirty);
      }
    });
  }, err => CH.fail(err), _ => CH.end(s));

  return new C.Sink(go(z, 0, false));
}
//# sourceMappingURL=foldWeightedDecomposeEffect.js.map