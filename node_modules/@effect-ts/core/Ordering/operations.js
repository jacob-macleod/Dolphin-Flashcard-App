"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Identity = exports.Associative = void 0;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Associative/makeAssociative.js"));

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Identity/makeIdentity.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * `Associative` instance for `Ordering`
 */
const Associative = /*#__PURE__*/A.makeAssociative((x, y) => x !== 0 ? x : y);
/**
 * `Identity` instance for `Ordering`
 */

exports.Associative = Associative;
const Identity = /*#__PURE__*/I.makeIdentity(0, Associative.combine);
exports.Identity = Identity;
//# sourceMappingURL=operations.js.map