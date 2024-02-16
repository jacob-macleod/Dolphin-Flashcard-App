"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReduceWithIndex = exports.ReduceRightWithIndex = exports.ReduceRight = exports.Reduce = exports.Monad = exports.ForEachWithIndex = exports.ForEach = exports.FoldableWithIndex = exports.Foldable = exports.FoldMapWithIndex = exports.FoldMap = exports.Extend = exports.Covariant = exports.AssociativeFlatten = exports.AssociativeBoth = exports.Applicative = exports.Any = void 0;

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Prelude/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./operations.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Any = {
  any: () => [{}]
};
exports.Any = Any;
const AssociativeBoth = {
  both: A.zip
};
exports.AssociativeBoth = AssociativeBoth;
const AssociativeFlatten = {
  flatten: A.flatten
};
exports.AssociativeFlatten = AssociativeFlatten;
const Covariant = {
  map: A.map
};
exports.Covariant = Covariant;
const Applicative = { ...Any,
  ...Covariant,
  ...AssociativeBoth
};
exports.Applicative = Applicative;
const Monad = { ...Any,
  ...Covariant,
  ...AssociativeFlatten
};
exports.Monad = Monad;
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
//# sourceMappingURL=instances.js.map