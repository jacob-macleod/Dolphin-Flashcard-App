"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  all: true,
  any: true,
  sum: true,
  product: true,
  string: true,
  "void": true
};
exports.void = exports.sum = exports.string = exports.product = exports.any = exports.all = void 0;

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

/**
 * Boolean `Associative`  under conjunction
 */
const all = /*#__PURE__*/(0, _makeAssociative.makeAssociative)((x, y) => x && y);
/**
 * Boolean `Associative` under disjunction
 */

exports.all = all;
const any = /*#__PURE__*/(0, _makeAssociative.makeAssociative)((x, y) => x || y);
/**
 * Number `Associative` under addition
 */

exports.any = any;
const sum = /*#__PURE__*/(0, _makeAssociative.makeAssociative)((x, y) => x + y);
/**
 * Number `Associative` under multiplication
 */

exports.sum = sum;
const product = /*#__PURE__*/(0, _makeAssociative.makeAssociative)((x, y) => x * y);
/**
 * String `Associative` under concatenation
 */

exports.product = product;
const string = /*#__PURE__*/(0, _makeAssociative.makeAssociative)((x, y) => x + y);
/**
 * Void `Associative`
 */

exports.string = string;
const void_ = /*#__PURE__*/(0, _makeAssociative.makeAssociative)(() => undefined);
exports.void = void_;
//# sourceMappingURL=common.js.map