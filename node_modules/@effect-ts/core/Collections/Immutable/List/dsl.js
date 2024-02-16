"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tupleZip = exports.tuple = exports.structZip = exports.struct = exports.sequenceF = exports.matchTagIn = exports.matchTag = exports.matchMorph = exports.matchIn = exports.match = exports.gen = void 0;

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Prelude/index.js"));

var _instances = /*#__PURE__*/require("./instances.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * `ForEach`'s `sequenceF` derivation
 */
const sequenceF = /*#__PURE__*/P.sequenceF(_instances.ForEach);
/**
 * Generator
 */

exports.sequenceF = sequenceF;
const gen = /*#__PURE__*/P.genWithHistoryF(_instances.Monad);
/**
 * Struct derivation
 */

exports.gen = gen;
const struct = /*#__PURE__*/P.structF(_instances.Applicative);
/**
 * Tuple derivation
 */

exports.struct = struct;
const tuple = /*#__PURE__*/P.tupleF(_instances.Applicative);
/**
 * Struct derivation
 */

exports.tuple = tuple;
const structZip = /*#__PURE__*/P.structF(_instances.ApplyZip);
/**
 * Tuple derivation
 */

exports.structZip = structZip;
const tupleZip = /*#__PURE__*/P.tupleF(_instances.ApplyZip);
/**
 * Matchers
 */

exports.tupleZip = tupleZip;
const {
  match,
  matchIn,
  matchMorph,
  matchTag,
  matchTagIn
} = /*#__PURE__*/P.matchers(_instances.Covariant);
exports.matchTagIn = matchTagIn;
exports.matchTag = matchTag;
exports.matchMorph = matchMorph;
exports.matchIn = matchIn;
exports.match = match;
//# sourceMappingURL=dsl.js.map