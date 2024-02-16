"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.None = exports.Monad = exports.ForEach = exports.Covariant = exports.AssociativeFlatten = exports.AssociativeBoth = exports.Applicative = exports.Any = void 0;

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/index.js"));

var It = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./operations.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Any = {
  any: () => It.of(undefined)
};
exports.Any = Any;
const None = {
  never: () => It.never
};
exports.None = None;
const Covariant = {
  map: It.map
};
exports.Covariant = Covariant;
const AssociativeBoth = {
  both: It.zip
};
exports.AssociativeBoth = AssociativeBoth;
const AssociativeFlatten = {
  flatten: It.flatten
};
exports.AssociativeFlatten = AssociativeFlatten;
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
const ForEach = { ...Covariant,
  forEachF: It.forEachF
};
exports.ForEach = ForEach;
//# sourceMappingURL=instances.js.map