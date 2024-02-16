"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.split = split;
exports.split_ = split_;

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

var _forEach = /*#__PURE__*/require("./forEach.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Splits this chunk into `n` equally sized chunks.
 */
function split_(self, n) {
  const length = self.length;
  const k = Math.floor(n);
  const quotient = Math.floor(length / k);
  const remainder = length % k;
  let chunks = Chunk.empty();
  let i = 0;
  let chunk = Chunk.empty();
  (0, _forEach.forEach_)(self, a => {
    chunk = Chunk.append_(chunk, a);

    if (i <= remainder && chunk.length > quotient || i > remainder && chunk.length >= quotient) {
      chunks = Chunk.append_(chunks, chunk);
      chunk = Chunk.empty();
    }

    i++;
  });

  if (chunk.length > 0) {
    chunks = Chunk.append_(chunks, chunk);
  }

  return chunks;
}
/**
 * Splits this chunk into `n` equally sized chunks.
 *
 * @ets_data_first split_
 */


function split(n) {
  return self => split_(self, n);
}
//# sourceMappingURL=split.js.map