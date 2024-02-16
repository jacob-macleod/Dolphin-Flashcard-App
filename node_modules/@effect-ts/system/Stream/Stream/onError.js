"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onError = onError;
exports.onError_ = onError_;

var _index = /*#__PURE__*/require("../../Function/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var _catchAllCause = /*#__PURE__*/require("./catchAllCause.js");

var _fromEffect = /*#__PURE__*/require("./fromEffect.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Runs the specified effect if this stream fails, providing the error to the effect if it exists.
 *
 * Note: Unlike `Effect.onError`, there is no guarantee that the provided effect will not be interrupted.
 */
function onError_(self, cleanup) {
  return (0, _catchAllCause.catchAllCause_)(self, cause => (0, _fromEffect.fromEffect)(T.zipRight_(cleanup(cause), T.halt(cause))));
}
/**
 * Runs the specified effect if this stream fails, providing the error to the effect if it exists.
 *
 * Note: Unlike `Effect.onError`, there is no guarantee that the provided effect will not be interrupted.
 */


function onError(cleanup) {
  return self => onError_(self, cleanup);
}
//# sourceMappingURL=onError.js.map