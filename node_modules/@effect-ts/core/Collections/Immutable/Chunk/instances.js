"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depthFirstChainRec = exports.breadthFirstChainRec = exports.WitherableWithIndex = exports.Witherable = exports.WiltableWithIndex = exports.Wiltable = exports.Separate = exports.ReduceWithIndex = exports.ReduceRightWithIndex = exports.ReduceRight = exports.Reduce = exports.PartitionWithIndex = exports.PartitionMapWithIndex = exports.PartitionMap = exports.Partition = exports.Monad = exports.ForEachWithIndex = exports.ForEach = exports.FoldableWithIndex = exports.Foldable = exports.FoldMapWithIndex = exports.FoldMap = exports.FilterableWithIndex = exports.Filterable = exports.FilterWithIndex = exports.FilterMapWithIndex = exports.FilterMap = exports.Filter = exports.Extend = exports.DepthFirstChainRec = exports.Covariant = exports.Compact = exports.Collection = exports.BreadthFirstChainRec = exports.AssociativeFlatten = exports.AssociativeBothZip = exports.ApplyZip = exports.Applicative = exports.Any = void 0;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Prelude/index.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./operations.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Collection = {
  builder: Chunk.builder
};
exports.Collection = Collection;
const Any = {
  any: () => Chunk.single({})
};
exports.Any = Any;
const AssociativeBothZip = {
  both: Chunk.zip
};
exports.AssociativeBothZip = AssociativeBothZip;
const AssociativeFlatten = {
  flatten: Chunk.flatten
};
exports.AssociativeFlatten = AssociativeFlatten;
const Covariant = {
  map: Chunk.map
};
exports.Covariant = Covariant;
const ApplyZip = { ...Covariant,
  ...AssociativeBothZip
};
exports.ApplyZip = ApplyZip;
const Monad = { ...Any,
  ...Covariant,
  ...AssociativeFlatten
};
exports.Monad = Monad;
const Applicative = /*#__PURE__*/(0, P.getApplicativeF)(Monad);
exports.Applicative = Applicative;
const ForEach = {
  map: Chunk.map,
  forEachF: Chunk.forEachF
};
exports.ForEach = ForEach;
const ForEachWithIndex = {
  map: Chunk.map,
  forEachWithIndexF: Chunk.forEachWithIndexF
};
exports.ForEachWithIndex = ForEachWithIndex;
const Wiltable = {
  separateF: Chunk.separateF
};
exports.Wiltable = Wiltable;
const WiltableWithIndex = {
  separateWithIndexF: Chunk.separateWithIndexF
};
exports.WiltableWithIndex = WiltableWithIndex;
const Witherable = {
  compactF: Chunk.compactF
};
exports.Witherable = Witherable;
const WitherableWithIndex = {
  compactWithIndexF: Chunk.compactWithIndexF
};
exports.WitherableWithIndex = WitherableWithIndex;
const Compact = {
  compact: Chunk.compact
};
exports.Compact = Compact;
const Separate = {
  separate: Chunk.separate
};
exports.Separate = Separate;
const Extend = {
  extend: f => fa => Chunk.single(f(fa))
};
exports.Extend = Extend;
const Reduce = {
  reduce: Chunk.reduce
};
exports.Reduce = Reduce;
const ReduceWithIndex = {
  reduceWithIndex: (b, f) => fa => Chunk.reduce_(Chunk.zipWithIndex(fa), b, (b, {
    tuple: [a, i]
  }) => f(i, b, a))
};
exports.ReduceWithIndex = ReduceWithIndex;
const ReduceRightWithIndex = {
  reduceRightWithIndex: (b, f) => fa => Chunk.reduceRight_(Chunk.zipWithIndex(fa), b, ({
    tuple: [a, i]
  }, b) => f(i, a, b))
};
exports.ReduceRightWithIndex = ReduceRightWithIndex;
const ReduceRight = {
  reduceRight: Chunk.reduceRight
};
exports.ReduceRight = ReduceRight;
const FoldMap = {
  foldMap: Chunk.foldMap
};
exports.FoldMap = FoldMap;
const FoldMapWithIndex = {
  foldMapWithIndex: Chunk.foldMapWithIndex
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
const Filter = {
  filter: Chunk.filter
};
exports.Filter = Filter;
const FilterWithIndex = {
  filterWithIndex: predicate => fa => Chunk.collect_(Chunk.zipWithIndex(fa), ({
    tuple: [a, i]
  }) => predicate(i, a) ? O.some(a) : O.none)
};
exports.FilterWithIndex = FilterWithIndex;
const FilterMap = {
  filterMap: Chunk.collect
};
exports.FilterMap = FilterMap;
const FilterMapWithIndex = {
  filterMapWithIndex: f => fa => Chunk.collect_(Chunk.zipWithIndex(fa), ({
    tuple: [a, i]
  }) => f(i, a))
};
exports.FilterMapWithIndex = FilterMapWithIndex;
const Partition = {
  partition: Chunk.partition
};
exports.Partition = Partition;
const PartitionWithIndex = {
  partitionWithIndex: Chunk.partitionWithIndex
};
exports.PartitionWithIndex = PartitionWithIndex;
const PartitionMap = {
  partitionMap: Chunk.partitionMap
};
exports.PartitionMap = PartitionMap;
const PartitionMapWithIndex = {
  partitionMapWithIndex: Chunk.partitionMapWithIndex
};
exports.PartitionMapWithIndex = PartitionMapWithIndex;
const Filterable = { ...Filter,
  ...FilterMap,
  ...Partition,
  ...PartitionMap
};
exports.Filterable = Filterable;
const FilterableWithIndex = { ...FilterWithIndex,
  ...FilterMapWithIndex,
  ...PartitionWithIndex,
  ...PartitionMapWithIndex
};
/**
 * Exposing depth first recursion
 */

exports.FilterableWithIndex = FilterableWithIndex;
const DepthFirstChainRec = {
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
exports.DepthFirstChainRec = DepthFirstChainRec;
const depthFirstChainRec = DepthFirstChainRec.chainRec;
/**
 * Exposing breadth first recursion
 */

exports.depthFirstChainRec = depthFirstChainRec;
const BreadthFirstChainRec = {
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
exports.BreadthFirstChainRec = BreadthFirstChainRec;
const breadthFirstChainRec = BreadthFirstChainRec.chainRec;
exports.breadthFirstChainRec = breadthFirstChainRec;
//# sourceMappingURL=instances.js.map