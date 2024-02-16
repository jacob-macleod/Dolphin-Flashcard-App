"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loopOnChunks = loopOnChunks;
exports.loopOnChunks_ = loopOnChunks_;

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Loops over the stream chunks concatenating the result of f
 */
function loopOnChunks_(self, f) {
  const loop = CH.readWith(chunk => CH.chain_(f(chunk), cont => cont ? loop : CH.end(false)), CH.fail, _ => CH.succeed(false));
  return new C.Stream(self.channel[">>>"](loop));
}
/**
 * Loops over the stream chunks concatenating the result of f
 *
 * @ets_data_first loopOnChunks_
 */


function loopOnChunks(f) {
  return self => loopOnChunks_(self, f);
}
//# sourceMappingURL=loopOnChunks.js.map