"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.peel = peel;
exports.peel_ = peel_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var SK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Sink/index.js"));

var _concat = /*#__PURE__*/require("./concat.js");

var _fromChunk = /*#__PURE__*/require("./fromChunk.js");

var _repeatEffectChunkOption = /*#__PURE__*/require("./repeatEffectChunkOption.js");

var _run = /*#__PURE__*/require("./run.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Peels off enough material from the stream to construct a `Z` using the
 * provided `Sink` and then returns both the `Z` and the rest of the
 * `Stream` in a managed resource. Like all `Managed` values, the provided
 * stream is valid only within the scope of `Managed`.
 */
function peel_(self, sink) {
  return M.chain_(self.proc, pull => {
    const stream = (0, _repeatEffectChunkOption.repeatEffectChunkOption)(pull);
    const s = SK.exposeLeftover(sink);
    return M.map_(T.toManaged((0, _run.run)(s)(stream)), e => Tp.tuple(e.get(0), (0, _concat.concat_)((0, _fromChunk.fromChunk)(e.get(1)), stream)));
  });
}
/**
 * Peels off enough material from the stream to construct a `Z` using the
 * provided `Sink` and then returns both the `Z` and the rest of the
 * `Stream` in a managed resource. Like all `Managed` values, the provided
 * stream is valid only within the scope of `Managed`.
 */


function peel(sink) {
  return self => peel_(self, sink);
}
//# sourceMappingURL=peel.js.map