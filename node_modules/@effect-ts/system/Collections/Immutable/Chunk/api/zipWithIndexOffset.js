"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWithIndexOffset = zipWithIndexOffset;
exports.zipWithIndexOffset_ = zipWithIndexOffset_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Tuple/index.js"));

var _core = /*#__PURE__*/require("../core.js");

var _definition = /*#__PURE__*/require("../definition.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Zips this chunk with the index of every element, starting from the initial
 * index value.
 */
function zipWithIndexOffset_(self, offset) {
  const iterator = self.arrayLikeIterator();
  let next;
  let i = offset;
  let builder = (0, _core.empty)();

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let j = 0;

    while (j < len) {
      const a = array[j];
      builder = (0, _core.append_)(builder, Tp.tuple(a, i));
      j++;
      i++;
    }
  }

  return builder;
}
/**
 * Zips this chunk with the index of every element, starting from the initial
 * index value.
 *
 * @ets_data_first zipWithIndexOffset_
 */


function zipWithIndexOffset(offset) {
  return self => zipWithIndexOffset_(self, offset);
}
//# sourceMappingURL=zipWithIndexOffset.js.map