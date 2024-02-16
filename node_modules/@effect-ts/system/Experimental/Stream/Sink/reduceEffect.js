"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceEffect = reduceEffect;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var _index4 = /*#__PURE__*/require("../../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * A sink that effectfully folds its inputs with the provided function, termination predicate and initial state.
 */
function reduceEffect(z, cont, f) {
  const reduceChunkSplit = (z, chunk) => cont => f => {
    const reduce = (s, chunk, idx, len) => {
      if (idx === len) {
        return T.succeed(Tp.tuple(s, O.none));
      } else {
        return T.chain_(f(s, CK.unsafeGet_(chunk, idx)), s1 => {
          if (cont(s1)) {
            return reduce(s1, chunk, idx + 1, len);
          } else {
            return T.succeed(Tp.tuple(s1, O.some(CK.drop_(chunk, idx + 1))));
          }
        });
      }
    };

    return reduce(z, chunk, 0, CK.size(chunk));
  };

  const reader = s => {
    if (!cont(s)) {
      return CH.end(s);
    } else {
      return CH.readWith(_in => {
        return CH.chain_(CH.fromEffect(reduceChunkSplit(s, _in)(cont)(f)), ({
          tuple: [nextS, leftovers]
        }) => {
          return O.fold_(leftovers, () => reader(nextS), l => CH.as_(CH.write(l), nextS));
        });
      }, err => CH.fail(err), _ => CH.end(s));
    }
  };

  return new C.Sink(reader(z));
}
//# sourceMappingURL=reduceEffect.js.map