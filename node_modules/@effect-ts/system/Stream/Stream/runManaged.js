"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runManaged = runManaged;
exports.runManaged_ = runManaged_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 */
function runManaged_(self, sink) {
  return M.mapM(([pull, push]) => {
    const go = T.foldCauseM_(pull, c => O.fold_(C.sequenceCauseOption(c), () => T.foldCauseM_(push(O.none), c => E.fold_(C.sequenceCauseEither(C.map(_ => _.get(0))(c)), T.halt, T.succeed), () => T.dieMessage("empty stream / empty sinks")), T.halt), os => T.foldCauseM_(push(O.some(os)), c => E.fold_(C.sequenceCauseEither(C.map(_ => _.get(0))(c)), T.halt, T.succeed), () => go));
    return go;
  })(M.zip_(self.proc, sink.push));
}
/**
 * Runs the sink on the stream to produce either the sink's result or an error.
 */


function runManaged(sink) {
  return self => runManaged_(self, sink);
}
//# sourceMappingURL=runManaged.js.map