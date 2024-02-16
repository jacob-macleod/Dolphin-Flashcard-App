"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipChunks_ = zipChunks_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function zipChunks_(fa, fb, f) {
  let fc = A.empty();
  const len = Math.min(A.size(fa), A.size(fb));

  for (let i = 0; i < len; i++) {
    fc = A.append_(fc, f(A.unsafeGet_(fa, i), A.unsafeGet_(fb, i)));
  }

  if (A.size(fa) > A.size(fb)) {
    return [fc, E.left(A.drop_(fa, A.size(fb)))];
  }

  return [fc, E.right(A.drop_(fb, A.size(fa)))];
}
//# sourceMappingURL=utils.js.map