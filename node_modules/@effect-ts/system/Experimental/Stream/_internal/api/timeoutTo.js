"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isStreamTimeoutError = exports.StreamTimeoutSymbol = exports.StreamTimeoutError = void 0;
exports.timeoutTo = timeoutTo;
exports.timeoutTo_ = timeoutTo_;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var CatchSomeCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./catchSomeCause.js"));

var TimeoutFailCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./timeoutFailCause.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _a; // ets_tracing: off


const StreamTimeoutSymbol = /*#__PURE__*/Symbol.for("@matechs/core/symbols/errors/StreamTimeout");
exports.StreamTimeoutSymbol = StreamTimeoutSymbol;

class StreamTimeoutError {
  constructor(message) {
    this.message = message;
    this[_a] = "StreamTimeoutError";
  }

}

exports.StreamTimeoutError = StreamTimeoutError;
_a = StreamTimeoutSymbol;

const isStreamTimeoutError = u => u instanceof StreamTimeoutError && u[StreamTimeoutSymbol] === "StreamTimeoutError";
/**
 * Switches the stream if it does not produce a value after d duration.
 */


exports.isStreamTimeoutError = isStreamTimeoutError;

function timeoutTo_(self, d, that) {
  return CatchSomeCause.catchSomeCause_(TimeoutFailCause.timeoutFailCause_(self, CS.die(new StreamTimeoutError()), d), e => {
    if (e._tag === "Die") {
      return O.some(that);
    }

    return O.none;
  });
}
/**
 * Switches the stream if it does not produce a value after d duration.
 *
 * @ets_data_first timeoutTo_
 */


function timeoutTo(d, that) {
  return self => timeoutTo_(self, d, that);
}
//# sourceMappingURL=timeoutTo.js.map