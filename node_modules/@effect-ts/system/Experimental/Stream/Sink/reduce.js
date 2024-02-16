"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = reduce;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Tuple/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * A sink that folds its inputs with the provided function, termination predicate and initial state.
 */
function reduce(z, cont, f) {
  const reduceChunkSplit = (z, chunk) => cont => f => {
    const reduce = (s, chunk, idx, len) => {
      if (idx === len) {
        return Tp.tuple(s, CK.empty());
      } else {
        const s1 = f(s, CK.unsafeGet_(chunk, idx));

        if (cont(s1)) {
          return reduce(s1, chunk, idx + 1, len);
        } else {
          return Tp.tuple(s1, CK.drop_(chunk, idx + 1));
        }
      }
    };

    return reduce(z, chunk, 0, CK.size(chunk));
  };

  const reader = s => {
    if (!cont(s)) {
      return CH.end(s);
    } else {
      return CH.readWith(_in => {
        const {
          tuple: [nextS, leftovers]
        } = reduceChunkSplit(s, _in)(cont)(f);

        if (!CK.isEmpty(leftovers)) {
          return CH.as_(CH.write(leftovers), nextS);
        } else {
          return reader(nextS);
        }
      }, err => CH.fail(err), _ => CH.end(s));
    }
  };

  return new C.Sink(reader(z));
}
//# sourceMappingURL=reduce.js.map