"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Any: true,
  Covariant: true,
  AssociativeBoth: true,
  AssociativeEither: true,
  AssociativeFlatten: true,
  Applicative: true,
  Access: true,
  Fail: true,
  Provide: true,
  Monad: true,
  StateCategory: true,
  Category: true,
  struct: true,
  tuple: true,
  match: true,
  matchIn: true,
  matchMorph: true,
  matchTag: true,
  matchTagIn: true
};
exports.tuple = exports.struct = exports.matchTagIn = exports.matchTag = exports.matchMorph = exports.matchIn = exports.match = exports.StateCategory = exports.Provide = exports.Monad = exports.Fail = exports.Covariant = exports.Category = exports.AssociativeFlatten = exports.AssociativeEither = exports.AssociativeBoth = exports.Applicative = exports.Any = exports.Access = void 0;

require("../Operator/index.js");

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/Tuple"));

var _Function = /*#__PURE__*/require("@effect-ts/system/Function");

var X = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/XPure"));

Object.keys(X).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === X[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return X[key];
    }
  });
});

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const Any = {
  any: () => X.succeed((0, _Function.constant)({}))
};
exports.Any = Any;
const Covariant = {
  map: X.map
};
exports.Covariant = Covariant;
const AssociativeBoth = {
  both: X.zip
};
exports.AssociativeBoth = AssociativeBoth;
const AssociativeEither = {
  orElseEither: X.orElseEither
};
exports.AssociativeEither = AssociativeEither;
const AssociativeFlatten = {
  flatten: ffa => X.chain_(ffa, _Function.identity)
};
exports.AssociativeFlatten = AssociativeFlatten;
const Applicative = { ...Any,
  ...Covariant,
  ...AssociativeBoth
};
exports.Applicative = Applicative;
const Access = {
  access: X.access
};
exports.Access = Access;
const Fail = {
  fail: X.fail
};
exports.Fail = Fail;
const Provide = {
  provide: X.provideAll
};
exports.Provide = Provide;
const Monad = { ...Any,
  ...AssociativeFlatten,
  ...Covariant
};
exports.Monad = Monad;
const StateCategory = {
  id: () => X.modify(a => Tp.tuple(a, a)),
  compose: bc => X.chain(_ => bc)
};
exports.StateCategory = StateCategory;
const Category = {
  id: () => X.access(_Function.identity),
  compose: bc => ab => X.chain_(ab, b => X.provideAll_(bc, b))
};
exports.Category = Category;
const struct = /*#__PURE__*/P.structF(Applicative);
exports.struct = struct;
const tuple = /*#__PURE__*/P.tupleF(Applicative);
/**
 * Matchers
 */

exports.tuple = tuple;
const {
  match,
  matchIn,
  matchMorph,
  matchTag,
  matchTagIn
} = /*#__PURE__*/P.matchers(Covariant);
exports.matchTagIn = matchTagIn;
exports.matchTag = matchTag;
exports.matchMorph = matchMorph;
exports.matchIn = matchIn;
exports.match = match;
//# sourceMappingURL=index.js.map