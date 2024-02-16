"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  fold: true,
  first: true,
  last: true,
  tuple: true,
  inverted: true,
  func: true,
  struct: true,
  min: true,
  max: true,
  object: true,
  intercalate: true
};
exports.first = first;
exports.fold = fold;
exports.func = func;
exports.intercalate = intercalate;
exports.inverted = inverted;
exports.last = last;
exports.max = max;
exports.min = min;
exports.object = object;
exports.struct = struct;
exports.tuple = tuple;

var Ord = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Ord"));

var _makeAssociative = /*#__PURE__*/require("./makeAssociative.js");

var _definition = /*#__PURE__*/require("./definition.js");

Object.keys(_definition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _definition[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _definition[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Fold `Associative` through an `Array`
 */
function fold(S) {
  return a => as => as.reduce((x, y) => S.combine(x, y), a);
}
/**
 * `Associative` that returns first element
 */


function first() {
  return (0, _makeAssociative.makeAssociative)(x => x);
}
/**
 * `Associative` that returns last element
 */


function last() {
  return (0, _makeAssociative.makeAssociative)((_, y) => y);
}
/**
 * Given a tuple of `Associative` returns an `Associative` for the tuple
 */


function tuple(...associatives) {
  return (0, _makeAssociative.makeAssociative)((x, y) => associatives.map((s, i) => s.combine(x[i], y[i])));
}
/**
 * The dual of a `Associative`, obtained by swapping the arguments of `combine`.
 */


function inverted(S) {
  return (0, _makeAssociative.makeAssociative)((x, y) => S.combine(y, x));
}
/**
 * `Associative` for function combination
 */


function func(S) {
  return () => (0, _makeAssociative.makeAssociative)((f, g) => a => S.combine(f(a), g(a)));
}
/**
 * `Associative` for a structure
 */


function struct(associatives) {
  return (0, _makeAssociative.makeAssociative)((x, y) => {
    const r = {};

    for (const key of Object.keys(associatives)) {
      r[key] = associatives[key].combine(x[key], y[key]);
    }

    return r;
  });
}
/**
 * `Associative` that returns last `Min` of elements
 */


function min(O) {
  return (0, _makeAssociative.makeAssociative)(Ord.min(O));
}
/**
 * `Associative` that returns last `Max` of elements
 */


function max(O) {
  return (0, _makeAssociative.makeAssociative)(Ord.max(O));
}
/**
 * Returns a `Associative` instance for objects preserving their type
 */


function object() {
  return (0, _makeAssociative.makeAssociative)((x, y) => Object.assign({}, x, y));
}
/**
 * You can glue items between and stay associative
 */


function intercalate(a) {
  return S => (0, _makeAssociative.makeAssociative)((x, y) => S.combine(x, S.combine(a, y)));
}
//# sourceMappingURL=operations.js.map