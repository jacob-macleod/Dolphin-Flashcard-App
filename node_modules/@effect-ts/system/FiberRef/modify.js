"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modify = modify;
exports.modify_ = modify_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index3 = /*#__PURE__*/require("../Function/index.js");

var _index4 = /*#__PURE__*/require("../Utils/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./excl-effect.js"));

var _fiberRef = /*#__PURE__*/require("./fiberRef.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Atomically modifies the `FiberRef` with the specified function, which computes
 * a return value for the modification. This is a more powerful version of
 * `update`.
 *
 * @ets_data_first modify_
 */
function modify(f) {
  return fiberRef => modify_(fiberRef, f);
}
/**
 * Atomically modifies the `FiberRef` with the specified function, which computes
 * a return value for the modification. This is a more powerful version of
 * `update`.
 */


function modify_(fiberRef, f) {
  return (0, _index4.matchTag)({
    Runtime: self => self.modify(f),
    Derived: self => self.use((value, getEither, setEither) => T.absolve(value.modify(s => E.fold_(getEither(s), e => Tp.tuple(E.left(e), s), a1 => (({
      tuple: [b, a2]
    }) => E.fold_(setEither(a2), e => Tp.tuple(E.left(e), s), s => Tp.tuple(E.right(b), s)))(f(a1)))))),
    DerivedAll: self => self.use((value, getEither, setEither) => T.absolve(value.modify(s => E.fold_(getEither(s), e => Tp.tuple(E.left(e), s), a1 => (({
      tuple: [b, a2]
    }) => E.fold_(setEither(a2)(s), e => Tp.tuple(E.left(e), s), s => Tp.tuple(E.right(b), s)))(f(a1))))))
  })(fiberRef);
}
//# sourceMappingURL=modify.js.map