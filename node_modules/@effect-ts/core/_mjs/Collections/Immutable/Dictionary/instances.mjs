import * as P from "../../../Prelude/index.mjs";
import { compact, compactF, compactWithIndexF, foldMap, foldMapWithIndex, forEachF, forEachWithIndexF, map, mapWithIndex, reduce, reduceRight, reduceRightWithIndex, reduceWithIndex, separate, separateF, separateWithIndexF } from "./operations.mjs";
export const Covariant = {
  map
};
export const CovariantWithIndex = {
  mapWithIndex
};
export const ForEach = {
  map,
  forEachF
};
export const ForEachWithIndex = {
  map,
  forEachWithIndexF
};
export const Reduce = {
  reduce
};
export const ReduceRight = {
  reduceRight
};
export const ReduceWithIndex = {
  reduceWithIndex
};
export const ReduceRightWithIndex = {
  reduceRightWithIndex
};
export const FoldMap = {
  foldMap
};
export const FoldMapWithIndex = {
  foldMapWithIndex
};
export const Foldable = { ...FoldMap,
  ...Reduce,
  ...ReduceRight
};
export const FoldableWithIndex = { ...FoldMapWithIndex,
  ...ReduceWithIndex,
  ...ReduceRightWithIndex
};
export const Wiltable = {
  separateF
};
export const WiltableWithIndex = {
  separateWithIndexF
};
export const Witherable = {
  compactF
};
export const WitherableWithIndex = {
  compactWithIndexF
};
export const Compact = {
  compact
};
export const Separate = {
  separate
};
export const Compactable = { ...Separate,
  ...Compact
};
//# sourceMappingURL=instances.mjs.map