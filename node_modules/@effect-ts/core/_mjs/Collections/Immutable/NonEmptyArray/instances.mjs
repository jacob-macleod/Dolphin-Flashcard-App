import * as P from "../../../Prelude/index.mjs";
import * as A from "./operations.mjs";
export const Any = {
  any: () => [{}]
};
export const AssociativeBoth = {
  both: A.zip
};
export const AssociativeFlatten = {
  flatten: A.flatten
};
export const Covariant = {
  map: A.map
};
export const Applicative = { ...Any,
  ...Covariant,
  ...AssociativeBoth
};
export const Monad = { ...Any,
  ...Covariant,
  ...AssociativeFlatten
};
export const ForEach = {
  map: A.map,
  forEachF: A.forEachF
};
export const ForEachWithIndex = {
  map: A.map,
  forEachWithIndexF: A.forEachWithIndexF
};
export const Extend = {
  extend: A.extend
};
export const Reduce = {
  reduce: A.reduce
};
export const ReduceWithIndex = {
  reduceWithIndex: A.reduceWithIndex
};
export const ReduceRightWithIndex = {
  reduceRightWithIndex: A.reduceRightWithIndex
};
export const ReduceRight = {
  reduceRight: A.reduceRight
};
export const FoldMap = {
  foldMap: A.foldMap
};
export const FoldMapWithIndex = {
  foldMapWithIndex: A.foldMapWithIndex
};
export const Foldable = { ...FoldMap,
  ...Reduce,
  ...ReduceRight
};
export const FoldableWithIndex = { ...FoldMapWithIndex,
  ...ReduceWithIndex,
  ...ReduceRightWithIndex
};
//# sourceMappingURL=instances.mjs.map