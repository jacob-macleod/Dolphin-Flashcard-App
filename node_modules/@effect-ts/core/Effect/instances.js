"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Any: true,
  AssociativeEither: true,
  AssociativeFlatten: true,
  AssociativeBoth: true,
  Covariant: true,
  IdentityFlatten: true,
  IdentityBoth: true,
  Monad: true,
  Applicative: true,
  Fail: true,
  Run: true,
  Access: true,
  Provide: true,
  getValidationApplicative: true,
  Category: true,
  match: true,
  matchIn: true,
  matchMorph: true,
  matchTag: true,
  matchTagIn: true,
  getIdentity: true,
  getIdentityPar: true,
  EffectURI: true
};
exports.Covariant = exports.Category = exports.AssociativeFlatten = exports.AssociativeEither = exports.AssociativeBoth = exports.Applicative = exports.Any = exports.Access = void 0;
Object.defineProperty(exports, "EffectURI", {
  enumerable: true,
  get: function () {
    return _index5.EffectURI;
  }
});
exports.Run = exports.Provide = exports.Monad = exports.IdentityFlatten = exports.IdentityBoth = exports.Fail = void 0;
exports.getIdentity = getIdentity;
exports.getIdentityPar = getIdentityPar;
exports.matchTagIn = exports.matchTag = exports.matchMorph = exports.matchIn = exports.match = exports.getValidationApplicative = void 0;

require("../Operator/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Effect"));

Object.keys(T).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === T[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return T[key];
    }
  });
});

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Identity/index.js"));

var DSL = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/DSL/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/index.js"));

var _index5 = /*#__PURE__*/require("../Modules/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const Any = {
  any: () => T.succeed({})
};
exports.Any = Any;
const AssociativeEither = {
  orElseEither: T.orElseEither
};
exports.AssociativeEither = AssociativeEither;
const AssociativeFlatten = {
  flatten: T.flatten
};
exports.AssociativeFlatten = AssociativeFlatten;
const AssociativeBoth = {
  both: T.zip
};
exports.AssociativeBoth = AssociativeBoth;
const Covariant = {
  map: T.map
};
exports.Covariant = Covariant;
const IdentityFlatten = { ...Any,
  ...AssociativeFlatten
};
exports.IdentityFlatten = IdentityFlatten;
const IdentityBoth = { ...Any,
  ...AssociativeBoth
};
exports.IdentityBoth = IdentityBoth;
const Monad = { ...IdentityFlatten,
  ...Covariant
};
exports.Monad = Monad;
const Applicative = { ...Covariant,
  ...IdentityBoth
};
exports.Applicative = Applicative;
const Fail = {
  fail: T.fail
};
exports.Fail = Fail;
const Run = {
  either: T.either
};
exports.Run = Run;
const Access = {
  access: T.access
};
exports.Access = Access;
const Provide = {
  provide: T.provideAll
};
exports.Provide = Provide;
const getValidationApplicative = /*#__PURE__*/DSL.getValidationF({ ...Monad,
  ...Run,
  ...Fail,
  ...Applicative
});
exports.getValidationApplicative = getValidationApplicative;
const Category = {
  id: T.environment,
  compose: T.compose
};
/**
 * Matchers
 */

exports.Category = Category;
const {
  match,
  matchIn,
  matchMorph,
  matchTag,
  matchTagIn
} = /*#__PURE__*/DSL.matchers(Covariant);
/**
 * Derive sequential identity
 */

exports.matchTagIn = matchTagIn;
exports.matchTag = matchTag;
exports.matchMorph = matchMorph;
exports.matchIn = matchIn;
exports.match = match;

function getIdentity(Id) {
  return () => I.makeIdentity(T.succeed(Id.identity), (x, y) => T.zipWith_(x, y, Id.combine));
}
/**
 * Derive parallel identity
 */


function getIdentityPar(Id) {
  return () => I.makeIdentity(T.succeed(Id.identity), (x, y) => T.zipWithPar_(x, y, Id.combine));
}
//# sourceMappingURL=instances.js.map