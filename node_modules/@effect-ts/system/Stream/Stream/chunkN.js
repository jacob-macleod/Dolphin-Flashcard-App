"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chunkN_ = exports.chunkN = void 0;

var _rechunk = /*#__PURE__*/require("./rechunk.js");

// ets_tracing: off

/**
 * Re-chunks the elements of the stream into chunks of
 * `n` elements each.
 * The last chunk might contain less than `n` elements
 *
 * @deprecated
 */
const chunkN_ = _rechunk.rechunk_;
/**
 * Re-chunks the elements of the stream into chunks of
 * `n` elements each.
 * The last chunk might contain less than `n` elements
 *
 * @deprecated
 */

exports.chunkN_ = chunkN_;
const chunkN = _rechunk.rechunk;
exports.chunkN = chunkN;
//# sourceMappingURL=chunkN.js.map