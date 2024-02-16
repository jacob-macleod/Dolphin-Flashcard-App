"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Monad = exports.IdentityFlatten = exports.IdentityBoth = exports.Covariant = exports.AssociativeFlatten = exports.AssociativeBoth = exports.Applicative = exports.Any = void 0;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Effect"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Layer"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Prelude/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const AssociativeBoth = {
  both: L.zip
};
exports.AssociativeBoth = AssociativeBoth;
const Any = {
  any: () => L.fromRawEffect(T.succeed({}))
};
exports.Any = Any;
const Covariant = {
  map: L.map
};
exports.Covariant = Covariant;
const IdentityBoth = { ...Any,
  ...AssociativeBoth
};
exports.IdentityBoth = IdentityBoth;
const Applicative = { ...Covariant,
  ...IdentityBoth
};
exports.Applicative = Applicative;
const AssociativeFlatten = {
  flatten: L.flatten
};
exports.AssociativeFlatten = AssociativeFlatten;
const IdentityFlatten = { ...Any,
  ...AssociativeFlatten
};
exports.IdentityFlatten = IdentityFlatten;
const Monad = { ...Covariant,
  ...IdentityFlatten
};
exports.Monad = Monad;
//# sourceMappingURL=instances.js.map