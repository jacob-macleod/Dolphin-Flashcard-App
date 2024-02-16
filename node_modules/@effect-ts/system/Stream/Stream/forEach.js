"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = forEach;
exports.forEachChunk = forEachChunk;
exports.forEachChunkManaged = forEachChunkManaged;
exports.forEachChunkManaged_ = forEachChunkManaged_;
exports.forEachChunk_ = forEachChunk_;
exports.forEachManaged = forEachManaged;
exports.forEachManaged_ = forEachManaged_;
exports.forEachWhile = forEachWhile;
exports.forEachWhileManaged = forEachWhileManaged;
exports.forEachWhileManaged_ = forEachWhileManaged_;
exports.forEachWhile_ = forEachWhile_;
exports.forEach_ = forEach_;

var SK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Sink/index.js"));

var _run = /*#__PURE__*/require("./run.js");

var _runManaged = /*#__PURE__*/require("./runManaged.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */
function forEach_(self, f) {
  return (0, _run.run_)(self, SK.forEach(f));
}
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */


function forEach(f) {
  return self => forEach_(self, f);
}
/**
 * Like `Stream#forEachWhile`, but returns a `Managed` so the finalization order
 * can be controlled.
 */


function forEachWhileManaged_(self, f) {
  return (0, _runManaged.runManaged_)(self, SK.forEachWhile(f));
}
/**
 * Like `Stream#forEachWhile`, but returns a `Managed` so the finalization order
 * can be controlled.
 */


function forEachWhileManaged(f) {
  return self => forEachWhileManaged_(self, f);
}
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */


function forEachChunk_(self, f) {
  return (0, _run.run_)(self, SK.forEachChunk(f));
}
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */


function forEachChunk(f) {
  return self => (0, _run.run_)(self, SK.forEachChunk(f));
}
/**
 * Consumes elements of the stream, passing them to the specified callback,
 * and terminating consumption when the callback returns `false`.
 */


function forEachWhile_(self, f) {
  return (0, _run.run_)(self, SK.forEachWhile(f));
}
/**
 * Consumes elements of the stream, passing them to the specified callback,
 * and terminating consumption when the callback returns `false`.
 */


function forEachWhile(f) {
  return self => forEachWhile_(self, f);
}
/**
 * Like `forEach`, but returns a `Managed` so the finalization order
 * can be controlled.
 */


function forEachManaged_(self, f) {
  return (0, _runManaged.runManaged_)(self, SK.forEach(f));
}
/**
 * Like `forEach`, but returns a `Managed` so the finalization order
 * can be controlled.
 */


function forEachManaged(f) {
  return self => forEachManaged_(self, f);
}
/**
 * Like `Stream#forEachChunk`, but returns a `Managed` so the finalization order
 * can be controlled.
 */


function forEachChunkManaged_(self, f) {
  return (0, _runManaged.runManaged_)(self, SK.forEachChunk(f));
}
/**
 * Like `Stream#forEachChunk`, but returns a `Managed` so the finalization order
 * can be controlled.
 */


function forEachChunkManaged(f) {
  return self => forEachChunkManaged_(self, f);
}
//# sourceMappingURL=forEach.js.map