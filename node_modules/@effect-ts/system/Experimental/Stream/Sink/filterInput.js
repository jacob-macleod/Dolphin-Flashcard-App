"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterInput = filterInput;
exports.filterInput_ = filterInput_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var ContramapChunks = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./contramapChunks.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function filterInput_(self, p) {
  return ContramapChunks.contramapChunks_(self, CK.filter(p));
}

function filterInput(p) {
  return self => filterInput_(self, p);
}
//# sourceMappingURL=filterInput.js.map