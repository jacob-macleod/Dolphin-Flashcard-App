import * as P from "../Prelude/index.mjs";
import * as E from "./operations/index.mjs";
export const Any = {
  any: () => E.right({})
};
export const AssociativeBoth = {
  both: E.zip
};
export const AssociativeEither = {
  orElseEither: fb => fa => fa._tag === "Right" ? E.right(E.left(fa.right)) : E.map_(fb(), E.right)
};
export const AssociativeFlatten = {
  flatten: E.flatten
};
export const Covariant = {
  map: E.map
};
export const Applicative = { ...Any,
  ...Covariant,
  ...AssociativeBoth
};
export const Monad = { ...Any,
  ...Covariant,
  ...AssociativeFlatten
};
export const Fail = {
  fail: E.left
};
export const Run = {
  either: E.right
};
export const ForEach = {
  map: E.map,
  forEachF: E.forEachF
};
export const FoldMap = {
  foldMap: E.foldMap
};
export const Reduce = {
  reduce: E.reduce
};
export const ReduceRight = {
  reduceRight: E.reduceRight
};
export const Foldable = { ...FoldMap,
  ...Reduce,
  ...ReduceRight
};
export const ChainRec = {
  chainRec: f => a => P.tailRec(f(a), e => E.isLeft(e) ? E.right(E.left(e.left)) : E.isLeft(e.right) ? E.left(f(e.right.left)) : E.right(E.right(e.right.right)))
};
export const {
  chainRec
} = ChainRec;
//# sourceMappingURL=instances.mjs.map