"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applicative = applicative;
exports.branchF = branchF;
exports.ifF = ifF;
exports.monad = monad;
exports.whenF = whenF;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Either"));

var _index = /*#__PURE__*/require("../../Function/index.js");

var HKT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Prelude/HKT/index.js"));

var _index3 = /*#__PURE__*/require("../DSL/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function monad(F) {
  return { ...F,
    select: fab => fa => (0, _index3.chainF)(F)(E.fold(a => F.map(g => g(a))(fab), b => (0, _index3.succeedF)(F)(b)))(fa)
  };
}

function applicative(F) {
  return { ...F,
    select: fab => fa => F.map(({
      tuple: [ea, f]
    }) => E.fold_(ea, f, _index.identity))(F.both(fab)(fa))
  };
}

function branchF(F) {
  return (lhs, rhs) => x => F.select(rhs)(F.select(F.map(fac => x => E.widenE()(E.right(fac(x))))(lhs))(F.map(E.map(E.left))(x)));
}

function ifF(F) {
  return (then_, else_) => x => branchF(F)(F.map(_index.constant)(then_), F.map(_index.constant)(else_))(F.map(x => x ? E.left(undefined) : E.right(undefined))(x));
}

function whenF(F) {
  return act => ifF(F)(act, (0, _index3.succeedF)(F)(undefined));
}
//# sourceMappingURL=index.js.map