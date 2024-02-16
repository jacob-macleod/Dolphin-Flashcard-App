"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contramapChunks = contramapChunks;
exports.contramapChunks_ = contramapChunks_;

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 */
function contramapChunks_(self, f) {
  const loop = CH.readWith(chunk => CH.zipRight_(CH.write(f(chunk)), loop), _ => CH.fail(_), _ => CH.succeed(_));
  return new C.Sink(loop[">>>"](self.channel));
}
/**
 * Transforms this sink's input chunks.
 * `f` must preserve chunking-invariance
 *
 * @ets_data_first contramapChunks_
 */


function contramapChunks(f) {
  return self => contramapChunks_(self, f);
}
//# sourceMappingURL=contramapChunks.js.map