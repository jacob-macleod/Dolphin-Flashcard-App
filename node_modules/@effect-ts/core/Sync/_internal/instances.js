"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Run = exports.Provide = exports.Monad = exports.Fail = exports.Covariant = exports.AssociativeFlatten = exports.AssociativeEither = exports.AssociativeBoth = exports.Applicative = exports.Any = exports.Access = void 0;

var _Function = /*#__PURE__*/require("@effect-ts/system/Function");

var X = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Sync"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Prelude/index.js"));

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
const Run = {
  either: X.either
};
exports.Run = Run;
const Provide = {
  provide: X.provideAll
};
exports.Provide = Provide;
const Monad = { ...Any,
  ...AssociativeFlatten,
  ...Covariant
};
exports.Monad = Monad;
//# sourceMappingURL=instances.js.map