"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chainRec = exports.Run = exports.ReduceRight = exports.Reduce = exports.Monad = exports.ForEach = exports.Foldable = exports.FoldMap = exports.Fail = exports.Covariant = exports.ChainRec = exports.AssociativeFlatten = exports.AssociativeEither = exports.AssociativeBoth = exports.Applicative = exports.Any = void 0;

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./operations/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Any = {
  any: () => E.right({})
};
exports.Any = Any;
const AssociativeBoth = {
  both: E.zip
};
exports.AssociativeBoth = AssociativeBoth;
const AssociativeEither = {
  orElseEither: fb => fa => fa._tag === "Right" ? E.right(E.left(fa.right)) : E.map_(fb(), E.right)
};
exports.AssociativeEither = AssociativeEither;
const AssociativeFlatten = {
  flatten: E.flatten
};
exports.AssociativeFlatten = AssociativeFlatten;
const Covariant = {
  map: E.map
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
const Fail = {
  fail: E.left
};
exports.Fail = Fail;
const Run = {
  either: E.right
};
exports.Run = Run;
const ForEach = {
  map: E.map,
  forEachF: E.forEachF
};
exports.ForEach = ForEach;
const FoldMap = {
  foldMap: E.foldMap
};
exports.FoldMap = FoldMap;
const Reduce = {
  reduce: E.reduce
};
exports.Reduce = Reduce;
const ReduceRight = {
  reduceRight: E.reduceRight
};
exports.ReduceRight = ReduceRight;
const Foldable = { ...FoldMap,
  ...Reduce,
  ...ReduceRight
};
exports.Foldable = Foldable;
const ChainRec = {
  chainRec: f => a => P.tailRec(f(a), e => E.isLeft(e) ? E.right(E.left(e.left)) : E.isLeft(e.right) ? E.left(f(e.right.left)) : E.right(E.right(e.right.right)))
};
exports.ChainRec = ChainRec;
const {
  chainRec
} = ChainRec;
exports.chainRec = chainRec;
//# sourceMappingURL=instances.js.map