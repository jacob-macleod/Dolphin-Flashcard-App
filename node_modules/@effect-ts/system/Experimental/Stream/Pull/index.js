"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emit = emit;
exports.emitChunk = emitChunk;
exports.empty = empty;
exports.end = void 0;
exports.fail = fail;
exports.failCause = failCause;
exports.fromQueue = fromQueue;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Queue/index.js"));

var Take = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Take/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function emit(a) {
  return T.succeed(A.single(a));
}

function emitChunk(as) {
  return T.succeed(as);
}

function fromQueue(d) {
  return T.chain_(Q.take(d), _ => Take.done(_));
}

function fail(e) {
  return T.fail(O.some(e));
}

function failCause(c) {
  return T.mapError_(T.halt(c), O.some);
}

function empty() {
  return T.succeed(A.empty());
}

const end = /*#__PURE__*/T.fail(O.none);
exports.end = end;
//# sourceMappingURL=index.js.map