"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  "if": true,
  if_: true,
  Covariant: true,
  Any: true,
  AssociativeBoth: true,
  AssociativeFlatten: true,
  IdentityBoth: true,
  IdentityFlatten: true,
  Applicative: true,
  Monad: true,
  Fail: true,
  Run: true,
  either: true,
  getValidation: true,
  Provide: true,
  Access: true,
  gen: true,
  flatten: true,
  fromEither: true,
  fromSync: true,
  match: true,
  matchIn: true,
  matchMorph: true,
  matchTag: true,
  matchTagIn: true
};
exports.either = exports.Run = exports.Provide = exports.Monad = exports.IdentityFlatten = exports.IdentityBoth = exports.Fail = exports.Covariant = exports.AssociativeFlatten = exports.AssociativeBoth = exports.Applicative = exports.Any = exports.Access = void 0;
exports.flatten = flatten;
exports.fromEither = fromEither;
exports.fromSync = fromSync;
exports.matchTagIn = exports.matchTag = exports.matchMorph = exports.matchIn = exports.match = exports.if_ = exports.if = exports.getValidation = exports.gen = void 0;

require("../Operator/index.js");

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Async"));

Object.keys(A).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === A[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return A[key];
    }
  });
});

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Either"));

var _GlobalExceptions = /*#__PURE__*/require("@effect-ts/system/GlobalExceptions");

var _index2 = /*#__PURE__*/require("../Function/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/index.js"));

var _index4 = /*#__PURE__*/require("../Sync/index.js");

var _index5 = /*#__PURE__*/require("../Utils/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Async is a lightweight Effect data type that support as parameters:
 * - R: environment
 * - E: error
 * - A: output
 *
 * And additionally supports interruption
 */
const Covariant = {
  map: A.map
};
exports.Covariant = Covariant;
const Any = {
  any: () => A.succeed({})
};
exports.Any = Any;
const AssociativeBoth = {
  both: A.zip
};
exports.AssociativeBoth = AssociativeBoth;
const AssociativeFlatten = {
  flatten
};
exports.AssociativeFlatten = AssociativeFlatten;
const IdentityBoth = { ...Any,
  ...AssociativeBoth
};
exports.IdentityBoth = IdentityBoth;
const IdentityFlatten = { ...Any,
  ...AssociativeFlatten
};
exports.IdentityFlatten = IdentityFlatten;
const Applicative = { ...Covariant,
  ...IdentityBoth
};
exports.Applicative = Applicative;
const Monad = { ...Covariant,
  ...IdentityFlatten
};
exports.Monad = Monad;
const Fail = {
  fail: A.fail
};
exports.Fail = Fail;
const Run = {
  either: x => A.catchAll_(A.map_(x, E.right), e => A.succeed(E.left(e)))
};
exports.Run = Run;
const either = Run.either;
exports.either = either;
const getValidation = /*#__PURE__*/P.getValidationF({ ...Monad,
  ...Run,
  ...Applicative,
  ...Fail
});
exports.getValidation = getValidation;
const Provide = {
  provide: A.provideAll
};
exports.Provide = Provide;
const Access = {
  access: A.access
};
exports.Access = Access;

const genAdapter = (_, __) => {
  if ((0, _index5.isTag)(_)) {
    return new P.GenHKT(A.service(_));
  }

  if ((0, _index5.isEither)(_)) {
    return new P.GenHKT(_._tag === "Left" ? A.fail(_.left) : A.succeed(_.right));
  }

  if ((0, _index5.isOption)(_)) {
    return new P.GenHKT(_._tag === "None" ? A.fail(__ ? __() : new _GlobalExceptions.NoSuchElementException()) : A.succeed(_.value));
  }

  return new P.GenHKT(_);
};

const gen = /*#__PURE__*/P.genF(Monad, {
  adapter: genAdapter
});
exports.gen = gen;

function flatten(ffa) {
  return A.chain_(ffa, _index2.identity);
}

function fromEither(_) {
  return _._tag === "Left" ? A.fail(_.left) : A.succeed(_.right);
}

function fromSync(_) {
  return A.accessM(r => fromEither((0, _index4.runEitherEnv)(r)(_)));
}

const {
  match,
  matchIn,
  matchMorph,
  matchTag,
  matchTagIn
} = /*#__PURE__*/P.matchers(Covariant);
/**
 * Conditionals
 */

exports.matchTagIn = matchTagIn;
exports.matchTag = matchTag;
exports.matchMorph = matchMorph;
exports.matchIn = matchIn;
exports.match = match;
const branch = /*#__PURE__*/P.conditionalF(Covariant);
exports.if = branch;
const branch_ = /*#__PURE__*/P.conditionalF_(Covariant);
exports.if_ = branch_;
//# sourceMappingURL=index.js.map