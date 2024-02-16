"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapMPartitioned = mapMPartitioned;

var _groupByKey = /*#__PURE__*/require("./groupByKey.js");

var _mapM = /*#__PURE__*/require("./mapM.js");

/**
 * Maps over elements of the stream with the specified effectful function,
 * partitioned by `p` executing invocations of `f` concurrently. The number
 * of concurrent invocations of `f` is determined by the number of different
 * outputs of type `K`. Up to `buffer` elements may be buffered per partition.
 * Transformed elements may be reordered but the order within a partition is maintained.
 */
function mapMPartitioned(keyBy, f, buffer = 16) {
  return self => (0, _groupByKey.groupByKey_)(self, keyBy, buffer).merge((_, s) => (0, _mapM.mapM_)(s, f));
}
//# sourceMappingURL=mapMPartitioned.js.map