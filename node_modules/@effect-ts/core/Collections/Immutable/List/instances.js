"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Witherable = exports.Wiltable = exports.Separate = exports.ReduceRight = exports.Reduce = exports.PartitionMap = exports.Partition = exports.Monad = exports.ForEach = exports.Foldable = exports.FoldMap = exports.Filterable = exports.FilterMap = exports.Filter = exports.Covariant = exports.Compact = exports.Collection = exports.AssociativeFlatten = exports.AssociativeBothZip = exports.ApplyZip = exports.Applicative = exports.Any = void 0;

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Prelude/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./operations.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Any = {
  any: () => L.of({})
};
exports.Any = Any;
const AssociativeBothZip = {
  both: L.zip
};
exports.AssociativeBothZip = AssociativeBothZip;
const AssociativeFlatten = {
  flatten: L.flatten
};
exports.AssociativeFlatten = AssociativeFlatten;
const Covariant = {
  map: L.map
};
exports.Covariant = Covariant;
const Monad = { ...Any,
  ...Covariant,
  ...AssociativeFlatten
};
exports.Monad = Monad;
const Applicative = /*#__PURE__*/P.getApplicativeF(Monad);
exports.Applicative = Applicative;
const ApplyZip = { ...Covariant,
  ...AssociativeBothZip
};
exports.ApplyZip = ApplyZip;
const ForEach = {
  map: L.map,
  forEachF: L.forEachF
};
exports.ForEach = ForEach;
const Wiltable = {
  separateF: L.separateF
};
exports.Wiltable = Wiltable;
const Witherable = {
  compactF: L.compactF
};
exports.Witherable = Witherable;
const Compact = {
  compact: L.compact
};
exports.Compact = Compact;
const Separate = {
  separate: L.separate
};
exports.Separate = Separate;
const Reduce = {
  reduce: L.reduce
};
exports.Reduce = Reduce;
const ReduceRight = {
  reduceRight: L.reduceRight
};
exports.ReduceRight = ReduceRight;
const FoldMap = {
  foldMap: L.foldMap
};
exports.FoldMap = FoldMap;
const Foldable = { ...FoldMap,
  ...Reduce,
  ...ReduceRight
};
exports.Foldable = Foldable;
const Filter = {
  filter: L.filter
};
exports.Filter = Filter;
const FilterMap = {
  filterMap: L.filterMap
};
exports.FilterMap = FilterMap;
const Partition = {
  partition: L.partition
};
exports.Partition = Partition;
const PartitionMap = {
  partitionMap: L.partitionMap
};
exports.PartitionMap = PartitionMap;
const Filterable = { ...Filter,
  ...FilterMap,
  ...Partition,
  ...PartitionMap
};
exports.Filterable = Filterable;
const Collection = {
  builder: L.builder
};
exports.Collection = Collection;
//# sourceMappingURL=instances.js.map