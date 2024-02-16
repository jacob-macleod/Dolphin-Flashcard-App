import * as O from "../../../Option/index.mjs";
import { getApplicativeF } from "../../../Prelude/index.mjs";
import * as P from "../../../Prelude/index.mjs";
import * as Chunk from "./operations.mjs";
export const Collection = {
  builder: Chunk.builder
};
export const Any = {
  any: () => Chunk.single({})
};
export const AssociativeBothZip = {
  both: Chunk.zip
};
export const AssociativeFlatten = {
  flatten: Chunk.flatten
};
export const Covariant = {
  map: Chunk.map
};
export const ApplyZip = { ...Covariant,
  ...AssociativeBothZip
};
export const Monad = { ...Any,
  ...Covariant,
  ...AssociativeFlatten
};
export const Applicative = /*#__PURE__*/getApplicativeF(Monad);
export const ForEach = {
  map: Chunk.map,
  forEachF: Chunk.forEachF
};
export const ForEachWithIndex = {
  map: Chunk.map,
  forEachWithIndexF: Chunk.forEachWithIndexF
};
export const Wiltable = {
  separateF: Chunk.separateF
};
export const WiltableWithIndex = {
  separateWithIndexF: Chunk.separateWithIndexF
};
export const Witherable = {
  compactF: Chunk.compactF
};
export const WitherableWithIndex = {
  compactWithIndexF: Chunk.compactWithIndexF
};
export const Compact = {
  compact: Chunk.compact
};
export const Separate = {
  separate: Chunk.separate
};
export const Extend = {
  extend: f => fa => Chunk.single(f(fa))
};
export const Reduce = {
  reduce: Chunk.reduce
};
export const ReduceWithIndex = {
  reduceWithIndex: (b, f) => fa => Chunk.reduce_(Chunk.zipWithIndex(fa), b, (b, {
    tuple: [a, i]
  }) => f(i, b, a))
};
export const ReduceRightWithIndex = {
  reduceRightWithIndex: (b, f) => fa => Chunk.reduceRight_(Chunk.zipWithIndex(fa), b, ({
    tuple: [a, i]
  }, b) => f(i, a, b))
};
export const ReduceRight = {
  reduceRight: Chunk.reduceRight
};
export const FoldMap = {
  foldMap: Chunk.foldMap
};
export const FoldMapWithIndex = {
  foldMapWithIndex: Chunk.foldMapWithIndex
};
export const Foldable = { ...FoldMap,
  ...Reduce,
  ...ReduceRight
};
export const FoldableWithIndex = { ...FoldMapWithIndex,
  ...ReduceWithIndex,
  ...ReduceRightWithIndex
};
export const Filter = {
  filter: Chunk.filter
};
export const FilterWithIndex = {
  filterWithIndex: predicate => fa => Chunk.collect_(Chunk.zipWithIndex(fa), ({
    tuple: [a, i]
  }) => predicate(i, a) ? O.some(a) : O.none)
};
export const FilterMap = {
  filterMap: Chunk.collect
};
export const FilterMapWithIndex = {
  filterMapWithIndex: f => fa => Chunk.collect_(Chunk.zipWithIndex(fa), ({
    tuple: [a, i]
  }) => f(i, a))
};
export const Partition = {
  partition: Chunk.partition
};
export const PartitionWithIndex = {
  partitionWithIndex: Chunk.partitionWithIndex
};
export const PartitionMap = {
  partitionMap: Chunk.partitionMap
};
export const PartitionMapWithIndex = {
  partitionMapWithIndex: Chunk.partitionMapWithIndex
};
export const Filterable = { ...Filter,
  ...FilterMap,
  ...Partition,
  ...PartitionMap
};
export const FilterableWithIndex = { ...FilterWithIndex,
  ...FilterMapWithIndex,
  ...PartitionWithIndex,
  ...PartitionMapWithIndex
};
/**
 * Exposing depth first recursion
 */

export const DepthFirstChainRec = {
  chainRec: f => a => {
    let todo = f(a);
    let result = Chunk.empty();

    while (Chunk.size(todo) > 0) {
      const e = Chunk.unsafeHead(todo);
      todo = Chunk.unsafeTail(todo);

      if (e._tag === "Left") {
        todo = Chunk.concat_(f(e.left), todo);
      } else {
        result = Chunk.append_(result, e.right);
      }
    }

    return result;
  }
};
export const depthFirstChainRec = DepthFirstChainRec.chainRec;
/**
 * Exposing breadth first recursion
 */

export const BreadthFirstChainRec = {
  chainRec: f => a => {
    let todo = f(a);
    let result = Chunk.empty();

    while (Chunk.size(todo) > 0) {
      const e = Chunk.unsafeHead(todo);
      todo = Chunk.unsafeTail(todo);

      if (e._tag === "Left") {
        todo = Chunk.concat_(todo, f(e.left));
      } else {
        result = Chunk.append_(result, e.right);
      }
    }

    return result;
  }
};
export const breadthFirstChainRec = BreadthFirstChainRec.chainRec;
//# sourceMappingURL=instances.mjs.map