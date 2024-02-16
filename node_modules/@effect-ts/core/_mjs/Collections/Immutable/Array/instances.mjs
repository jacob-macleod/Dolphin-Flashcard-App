import { getApplicativeF } from "../../../Prelude/index.mjs";
import * as P from "../../../Prelude/index.mjs";
import * as A from "./operations.mjs";
export const Any = {
  any: () => [{}]
};
export const AssociativeBothZip = {
  both: A.zip
};
export const AssociativeFlatten = {
  flatten: A.flatten
};
export const Covariant = {
  map: A.map
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
  map: A.map,
  forEachF: A.forEachF
};
export const ForEachWithIndex = {
  map: A.map,
  forEachWithIndexF: A.forEachWithIndexF
};
export const Wiltable = {
  separateF: A.separateF
};
export const WiltableWithIndex = {
  separateWithIndexF: A.separateWithIndexF
};
export const Witherable = {
  compactF: A.compactF
};
export const WitherableWithIndex = {
  compactWithIndexF: A.compactWithIndexF
};
export const Compact = {
  compact: A.compact
};
export const Separate = {
  separate: A.separate
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
export const Filter = {
  filter: A.filter
};
export const FilterWithIndex = {
  filterWithIndex: A.filterWithIndex
};
export const FilterMap = {
  filterMap: A.collect
};
export const FilterMapWithIndex = {
  filterMapWithIndex: A.collectWithIndex
};
export const Partition = {
  partition: A.partition
};
export const PartitionWithIndex = {
  partitionWithIndex: A.partitionWithIndex
};
export const PartitionMap = {
  partitionMap: A.partitionMap
};
export const PartitionMapWithIndex = {
  partitionMapWithIndex: A.partitionMapWithIndex
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
export const depthFirstChainRec = f => {
  return a => {
    // tslint:disable-next-line: readonly-array
    const todo = [...f(a)]; // tslint:disable-next-line: readonly-array

    const result = [];

    while (todo.length > 0) {
      const e = todo.shift();

      if (e._tag === "Left") {
        todo.unshift(...f(e.left));
      } else {
        result.push(e.right);
      }
    }

    return result;
  };
};
export function breadthFirstChainRec(f) {
  return a => {
    const initial = f(a); // tslint:disable-next-line: readonly-array

    const todo = []; // tslint:disable-next-line: readonly-array

    const result = [];

    function go(e) {
      if (e._tag === "Left") {
        f(e.left).forEach(v => todo.push(v));
      } else {
        result.push(e.right);
      }
    }

    for (const e of initial) {
      go(e);
    }

    while (todo.length > 0) {
      go(todo.shift());
    }

    return result;
  };
}
/**
 * Exposing depth first recursion
 */

export const DepthFirstChainRec = {
  chainRec: depthFirstChainRec
};
/**
 * Exposing breadth first recursion
 */

export const BreadthFirstChainRec = {
  chainRec: breadthFirstChainRec
};
//# sourceMappingURL=instances.mjs.map