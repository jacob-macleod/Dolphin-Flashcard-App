"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mkString = mkString;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../../Function/index.js");

var FoldLeftChunks = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./foldLeftChunks.js"));

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var Suspend = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./suspend.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function mkString() {
  return Suspend.suspend(() => {
    const strings = [];
    return Map.map_(FoldLeftChunks.foldLeftChunks(undefined, (_, els) => CK.forEach_(els, el => {
      strings.push(String(el));
    })), _ => strings.join(""));
  });
}
//# sourceMappingURL=mkString.js.map