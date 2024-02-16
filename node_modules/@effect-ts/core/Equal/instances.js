"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.None = exports.IdentityEither = exports.IdentityBoth = exports.Contravariant = exports.AssociativeEither = exports.AssociativeBoth = exports.Any = void 0;

var Equal = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Equal"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * The `AssociativeBoth` instance for `Equal`.
 */
const AssociativeBoth = {
  both: Equal.both
};
/**
 * The `AssociativeEither` instance for `Equal`.
 */

exports.AssociativeBoth = AssociativeBoth;
const AssociativeEither = {
  orElseEither: Equal.orElseEither
};
/**
 * The `Contravariant` instance for `Equal`.
 */

exports.AssociativeEither = AssociativeEither;
const Contravariant = {
  contramap: Equal.contramap
};
/**
 * The `Any` instance for `Equal`.
 */

exports.Contravariant = Contravariant;
const Any = {
  any: () => Equal.any
};
/**
 * The `IdentityBoth` instance for `Equal`.
 */

exports.Any = Any;
const IdentityBoth = { ...Any,
  ...AssociativeBoth
};
/**
 * The `None` instance for `Equal`.
 */

exports.IdentityBoth = IdentityBoth;
const None = {
  never: () => Equal.never
};
/**
 * The `IdentityEither` instance for `Equal`.
 */

exports.None = None;
const IdentityEither = { ...None,
  ...AssociativeEither
};
exports.IdentityEither = IdentityEither;
//# sourceMappingURL=instances.js.map