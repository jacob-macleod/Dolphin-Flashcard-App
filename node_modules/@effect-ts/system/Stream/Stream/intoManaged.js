"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intoManaged = intoManaged;
exports.intoManaged_ = intoManaged_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/core.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var TK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Take/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Like `into`, but provides the result as a `Managed` to allow for scope
 * composition.
 */
function intoManaged_(stream, queue) {
  return M.chain_(stream.proc, as => {
    const go = T.foldCauseM_(as, o => O.fold_(C.sequenceCauseOption(o), () => T.asUnit(Q.offer_(queue, TK.end)), c => T.zipRight_(Q.offer_(queue, TK.halt(c)), go)), a => T.zipRight_(Q.offer_(queue, TK.chunk(a)), go));
    return M.asUnit(T.toManaged(go));
  });
}
/**
 * Like `into`, but provides the result as a `Managed` to allow for scope
 * composition.
 */


function intoManaged(queue) {
  return self => intoManaged_(self, queue);
}
//# sourceMappingURL=intoManaged.js.map