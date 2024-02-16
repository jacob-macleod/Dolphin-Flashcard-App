"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WitherableWithIndex = exports.Witherable = exports.WiltableWithIndex = exports.Wiltable = exports.Separate = exports.ReduceWithIndex = exports.ReduceRightWithIndex = exports.ReduceRight = exports.Reduce = exports.PartitionWithIndex = exports.PartitionMapWithIndex = exports.PartitionMap = exports.Partition = exports.Monad = exports.ForEachWithIndex = exports.ForEach = exports.FoldableWithIndex = exports.Foldable = exports.FoldMapWithIndex = exports.FoldMap = exports.FilterableWithIndex = exports.Filterable = exports.FilterWithIndex = exports.FilterMapWithIndex = exports.FilterMap = exports.Filter = exports.Extend = exports.DepthFirstChainRec = exports.Covariant = exports.Compact = exports.BreadthFirstChainRec = exports.AssociativeFlatten = exports.AssociativeBothZip = exports.ApplyZip = exports.Applicative = exports.Any = void 0;
exports.breadthFirstChainRec = breadthFirstChainRec;
exports.depthFirstChainRec = void 0;

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Prelude/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./operations.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Any = {
  any: () => [{}]
};
exports.Any = Any;
const AssociativeBothZip = {
  both: A.zip
};
exports.AssociativeBothZip = AssociativeBothZip;
const AssociativeFlatten = {
  flatten: A.flatten
};
exports.AssociativeFlatten = AssociativeFlatten;
const Covariant = {
  map: A.map
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
  map: A.map,
  forEachF: A.forEachF
};
exports.ForEach = ForEach;
const ForEachWithIndex = {
  map: A.map,
  forEachWithIndexF: A.forEachWithIndexF
};
exports.ForEachWithIndex = ForEachWithIndex;
const Wiltable = {
  separateF: A.separateF
};
exports.Wiltable = Wiltable;
const WiltableWithIndex = {
  separateWithIndexF: A.separateWithIndexF
};
exports.WiltableWithIndex = WiltableWithIndex;
const Witherable = {
  compactF: A.compactF
};
exports.Witherable = Witherable;
const WitherableWithIndex = {
  compactWithIndexF: A.compactWithIndexF
};
exports.WitherableWithIndex = WitherableWithIndex;
const Compact = {
  compact: A.compact
};
exports.Compact = Compact;
const Separate = {
  separate: A.separate
};
exports.Separate = Separate;
const Extend = {
  extend: A.extend
};
exports.Extend = Extend;
const Reduce = {
  reduce: A.reduce
};
exports.Reduce = Reduce;
const ReduceWithIndex = {
  reduceWithIndex: A.reduceWithIndex
};
exports.ReduceWithIndex = ReduceWithIndex;
const ReduceRightWithIndex = {
  reduceRightWithIndex: A.reduceRightWithIndex
};
exports.ReduceRightWithIndex = ReduceRightWithIndex;
const ReduceRight = {
  reduceRight: A.reduceRight
};
exports.ReduceRight = ReduceRight;
const FoldMap = {
  foldMap: A.foldMap
};
exports.FoldMap = FoldMap;
const FoldMapWithIndex = {
  foldMapWithIndex: A.foldMapWithIndex
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
  filter: A.filter
};
exports.Filter = Filter;
const FilterWithIndex = {
  filterWithIndex: A.filterWithIndex
};
exports.FilterWithIndex = FilterWithIndex;
const FilterMap = {
  filterMap: A.collect
};
exports.FilterMap = FilterMap;
const FilterMapWithIndex = {
  filterMapWithIndex: A.collectWithIndex
};
exports.FilterMapWithIndex = FilterMapWithIndex;
const Partition = {
  partition: A.partition
};
exports.Partition = Partition;
const PartitionWithIndex = {
  partitionWithIndex: A.partitionWithIndex
};
exports.PartitionWithIndex = PartitionWithIndex;
const PartitionMap = {
  partitionMap: A.partitionMap
};
exports.PartitionMap = PartitionMap;
const PartitionMapWithIndex = {
  partitionMapWithIndex: A.partitionMapWithIndex
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
exports.FilterableWithIndex = FilterableWithIndex;

const depthFirstChainRec = f => {
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

exports.depthFirstChainRec = depthFirstChainRec;

function breadthFirstChainRec(f) {
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


const DepthFirstChainRec = {
  chainRec: depthFirstChainRec
};
/**
 * Exposing breadth first recursion
 */

exports.DepthFirstChainRec = DepthFirstChainRec;
const BreadthFirstChainRec = {
  chainRec: breadthFirstChainRec
};
exports.BreadthFirstChainRec = BreadthFirstChainRec;
//# sourceMappingURL=instances.js.map