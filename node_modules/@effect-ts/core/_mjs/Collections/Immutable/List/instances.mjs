import * as P from "../../../Prelude/index.mjs";
import * as L from "./operations.mjs";
export const Any = {
  any: () => L.of({})
};
export const AssociativeBothZip = {
  both: L.zip
};
export const AssociativeFlatten = {
  flatten: L.flatten
};
export const Covariant = {
  map: L.map
};
export const Monad = { ...Any,
  ...Covariant,
  ...AssociativeFlatten
};
export const Applicative = /*#__PURE__*/P.getApplicativeF(Monad);
export const ApplyZip = { ...Covariant,
  ...AssociativeBothZip
};
export const ForEach = {
  map: L.map,
  forEachF: L.forEachF
};
export const Wiltable = {
  separateF: L.separateF
};
export const Witherable = {
  compactF: L.compactF
};
export const Compact = {
  compact: L.compact
};
export const Separate = {
  separate: L.separate
};
export const Reduce = {
  reduce: L.reduce
};
export const ReduceRight = {
  reduceRight: L.reduceRight
};
export const FoldMap = {
  foldMap: L.foldMap
};
export const Foldable = { ...FoldMap,
  ...Reduce,
  ...ReduceRight
};
export const Filter = {
  filter: L.filter
};
export const FilterMap = {
  filterMap: L.filterMap
};
export const Partition = {
  partition: L.partition
};
export const PartitionMap = {
  partitionMap: L.partitionMap
};
export const Filterable = { ...Filter,
  ...FilterMap,
  ...Partition,
  ...PartitionMap
};
export const Collection = {
  builder: L.builder
};
//# sourceMappingURL=instances.mjs.map