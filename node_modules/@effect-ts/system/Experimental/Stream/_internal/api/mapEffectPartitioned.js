"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapEffectPartitioned = mapEffectPartitioned;
exports.mapEffectPartitioned_ = mapEffectPartitioned_;

var GroupByKey = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./groupByKey.js"));

var MapEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapEffect.js"));

var MergeGroupBy = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mergeGroupBy.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Maps over elements of the stream with the specified effectful function,
 * partitioned by `p` executing invocations of `f` concurrently. The number
 * of concurrent invocations of `f` is determined by the number of different
 * outputs of type `K`. Up to `buffer` elements may be buffered per partition.
 * Transformed elements may be reordered but the order within a partition is maintained.
 */
function mapEffectPartitioned_(self, keyBy, f, buffer = 16) {
  return MergeGroupBy.mergeGroupBy_(GroupByKey.groupByKey_(self, keyBy, buffer), (_, s) => MapEffect.mapEffect_(s, f));
}
/**
 * Maps over elements of the stream with the specified effectful function,
 * partitioned by `p` executing invocations of `f` concurrently. The number
 * of concurrent invocations of `f` is determined by the number of different
 * outputs of type `K`. Up to `buffer` elements may be buffered per partition.
 * Transformed elements may be reordered but the order within a partition is maintained.
 *
 * @ets_data_first mapEffectPartitioned_
 */


function mapEffectPartitioned(keyBy, f, buffer = 16) {
  return self => mapEffectPartitioned_(self, keyBy, f, buffer);
}
//# sourceMappingURL=mapEffectPartitioned.js.map