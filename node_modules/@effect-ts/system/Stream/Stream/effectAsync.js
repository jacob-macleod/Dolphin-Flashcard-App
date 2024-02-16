"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.effectAsync = effectAsync;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var _effectAsyncMaybe = /*#__PURE__*/require("./effectAsyncMaybe.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Creates a stream from an asynchronous callback that can be called multiple times.
 * The optionality of the error type `E` can be used to signal the end of the stream,
 * by setting it to `None`.
 */
function effectAsync(register, outputBuffer = 16) {
  return (0, _effectAsyncMaybe.effectAsyncMaybe)(cb => {
    register(cb);
    return O.none;
  }, outputBuffer);
}
//# sourceMappingURL=effectAsync.js.map