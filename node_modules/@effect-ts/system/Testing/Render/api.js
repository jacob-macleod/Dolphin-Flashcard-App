"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.className = className;
exports.field = field;
exports.function_ = function_;
exports.infix = infix;
exports.param = param;
exports.quoted = quoted;

var AssertionM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../AssertionM/AssertionM.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./definition.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Creates a string representation of a class name.
 */
function className(cons) {
  return cons.prototype.constructor.name;
}
/**
 * Creates a string representation of a field accessor.
 */


function field(name) {
  return `_.${name}`;
}
/**
 * Create a `Render` from an assertion combinator that should be rendered
 * using standard function notation.
 */


function function_(name, paramLists) {
  return new R.Function_(name, paramLists);
}
/**
 * Create a `Render` from an assertion combinator that should be rendered
 * using infix function notation.
 */


function infix(left, op, right) {
  return new R.Infix(left, op, right);
}
/**
 * Construct a `RenderParam` from an `AssertionM`.
 */


function param(value) {
  if (AssertionM.isAssertionM(value)) {
    return new R.AssertionM(value);
  }

  return new R.Value(value);
}
/**
 * Quote a string so it renders as a valid Scala string when rendered.
 */


function quoted(str) {
  return `"${str}"`;
}
//# sourceMappingURL=api.js.map