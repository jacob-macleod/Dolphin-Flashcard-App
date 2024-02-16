"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tuple = exports.struct = exports.matchTagIn = exports.matchTag = exports.matchMorph = exports.matchIn = exports.match = exports.let = exports.if_ = exports.if = exports.gen = exports.do = exports.bind = void 0;

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Prelude/index.js"));

var _instances = /*#__PURE__*/require("./instances.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Struct based applicative for IO[+_]
 */
const struct = /*#__PURE__*/P.structF(_instances.Applicative);
/**
 * Tuple based applicative for IO[+_]
 */

exports.struct = struct;
const tuple = /*#__PURE__*/P.tupleF(_instances.Applicative);
/**
 * Matchers
 */

exports.tuple = tuple;
const {
  match,
  matchIn,
  matchMorph,
  matchTag,
  matchTagIn
} = /*#__PURE__*/P.matchers(_instances.Covariant);
/**
 * Conditionals
 */

exports.matchTagIn = matchTagIn;
exports.matchTag = matchTag;
exports.matchMorph = matchMorph;
exports.matchIn = matchIn;
exports.match = match;
const branch = /*#__PURE__*/P.conditionalF(_instances.Covariant);
exports.if = branch;
const branch_ = /*#__PURE__*/P.conditionalF_(_instances.Covariant);
exports.if_ = branch_;

/**
 * Do
 */
const bind = /*#__PURE__*/P.bindF(_instances.Monad);
exports.bind = bind;
const let_ = /*#__PURE__*/P.letF(_instances.Monad);
exports.let = let_;
const do_ = /*#__PURE__*/P.doF(_instances.Monad);
exports.do = do_;

/**
 * Generator
 */
const gen = /*#__PURE__*/P.genF(_instances.Monad);
exports.gen = gen;
//# sourceMappingURL=dsls.js.map