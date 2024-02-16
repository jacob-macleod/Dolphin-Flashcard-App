"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStreamTimeout = exports.StreamTimeoutSymbol = exports.StreamTimeoutError = void 0;
exports.timeoutTo = timeoutTo;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var _catchSome = /*#__PURE__*/require("./catchSome.js");

var _timeoutErrorCause = /*#__PURE__*/require("./timeoutErrorCause.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _a; // ets_tracing: off


const StreamTimeoutSymbol = /*#__PURE__*/Symbol.for("@matechs/core/Stream/Stream/timeoutTo/StreamTimeout");
exports.StreamTimeoutSymbol = StreamTimeoutSymbol;

class StreamTimeoutError extends Error {
  constructor(message) {
    super(message);
    this[_a] = "StreamTimeoutError";
    this.name = this[StreamTimeoutSymbol];
  }

}

exports.StreamTimeoutError = StreamTimeoutError;
_a = StreamTimeoutSymbol;

const isStreamTimeout = u => u instanceof Error && u[StreamTimeoutSymbol] === "StreamTimeoutError";
/**
 * Switches the stream if it does not produce a value after d duration.
 */


exports.isStreamTimeout = isStreamTimeout;

function timeoutTo(d) {
  return that => self => (0, _catchSome.catchSome)(e => {
    if (isStreamTimeout(e)) {
      return O.some(that);
    }

    return O.none;
  })((0, _timeoutErrorCause.timeoutErrorCause)(C.die(new StreamTimeoutError()))(d)(self));
}
//# sourceMappingURL=timeoutTo.js.map