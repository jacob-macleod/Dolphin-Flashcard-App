"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WitherableWithIndex = exports.Witherable = exports.WiltableWithIndex = exports.Wiltable = exports.Separate = exports.ReduceWithIndex = exports.ReduceRightWithIndex = exports.ReduceRight = exports.Reduce = exports.ForEachWithIndex = exports.ForEach = exports.FoldableWithIndex = exports.Foldable = exports.FoldMapWithIndex = exports.FoldMap = exports.CovariantWithIndex = exports.Covariant = exports.Compactable = exports.Compact = void 0;

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Prelude/index.js"));

var _operations = /*#__PURE__*/require("./operations.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Covariant = {
  map: _operations.map
};
exports.Covariant = Covariant;
const CovariantWithIndex = {
  mapWithIndex: _operations.mapWithIndex
};
exports.CovariantWithIndex = CovariantWithIndex;
const ForEach = {
  map: _operations.map,
  forEachF: _operations.forEachF
};
exports.ForEach = ForEach;
const ForEachWithIndex = {
  map: _operations.map,
  forEachWithIndexF: _operations.forEachWithIndexF
};
exports.ForEachWithIndex = ForEachWithIndex;
const Reduce = {
  reduce: _operations.reduce
};
exports.Reduce = Reduce;
const ReduceRight = {
  reduceRight: _operations.reduceRight
};
exports.ReduceRight = ReduceRight;
const ReduceWithIndex = {
  reduceWithIndex: _operations.reduceWithIndex
};
exports.ReduceWithIndex = ReduceWithIndex;
const ReduceRightWithIndex = {
  reduceRightWithIndex: _operations.reduceRightWithIndex
};
exports.ReduceRightWithIndex = ReduceRightWithIndex;
const FoldMap = {
  foldMap: _operations.foldMap
};
exports.FoldMap = FoldMap;
const FoldMapWithIndex = {
  foldMapWithIndex: _operations.foldMapWithIndex
};
exports.FoldMapWithIndex = FoldMapWithIndex;
const Foldable = { ...FoldMap,
  ...Reduce,
  ...ReduceRight
};
exports.Foldable = Foldable;
const FoldableWithIndex = { ...FoldMapWithIndex,
  ...ReduceWithIndex,
  ...ReduceRightWithIndex
};
exports.FoldableWithIndex = FoldableWithIndex;
const Wiltable = {
  separateF: _operations.separateF
};
exports.Wiltable = Wiltable;
const WiltableWithIndex = {
  separateWithIndexF: _operations.separateWithIndexF
};
exports.WiltableWithIndex = WiltableWithIndex;
const Witherable = {
  compactF: _operations.compactF
};
exports.Witherable = Witherable;
const WitherableWithIndex = {
  compactWithIndexF: _operations.compactWithIndexF
};
exports.WitherableWithIndex = WitherableWithIndex;
const Compact = {
  compact: _operations.compact
};
exports.Compact = Compact;
const Separate = {
  separate: _operations.separate
};
exports.Separate = Separate;
const Compactable = { ...Separate,
  ...Compact
};
exports.Compactable = Compactable;
//# sourceMappingURL=instances.js.map