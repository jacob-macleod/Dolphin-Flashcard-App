"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chunk = chunk;
exports.done = done;
exports.end = void 0;
exports.fold = fold;
exports.foldM = foldM;
exports.foldM_ = foldM_;
exports.fold_ = fold_;
exports.fromPull = fromPull;
exports.halt = halt;
exports.map = map;
exports.map_ = map_;
exports.tap = tap;
exports.tap_ = tap_;

require("../../Operator/index.js");

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/core.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Exit/api.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function chunk(as) {
  return E.succeed(as);
}

function halt(cause) {
  return E.halt(C.map(O.some)(cause));
}

const end = /*#__PURE__*/E.fail(O.none);
exports.end = end;

function done(take) {
  return T.done(take);
}

function fromPull(pull) {
  return T.foldCause_(pull, c => O.fold_(C.sequenceCauseOption(c), () => end, halt), chunk);
}

function tap_(take, f) {
  return T.asUnit(E.forEach_(take, f));
}

function tap(f) {
  return take => tap_(take, f);
}
/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 */


function fold_(take, end, error, value) {
  return E.fold_(take, x => O.fold_(C.sequenceCauseOption(x), () => end, error), value);
}
/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 */


function fold(end, error, value) {
  return take => fold_(take, end, error, value);
}
/**
 * Effectful version of `Take#fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 */


function foldM_(take, end, error, value) {
  return E.foldM_(take, x => O.fold_(C.sequenceCauseOption(x), end, error), value);
}
/**
 * Effectful version of `Take#fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 */


function foldM(end, error, value) {
  return take => foldM_(take, end, error, value);
}

function map_(take, f) {
  return E.map_(take, A.map(f));
}

function map(f) {
  return take => map_(take, f);
}
//# sourceMappingURL=index.js.map