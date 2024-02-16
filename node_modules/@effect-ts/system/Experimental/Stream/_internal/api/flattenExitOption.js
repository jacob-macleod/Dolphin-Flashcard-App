"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenExitOption = flattenExitOption;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Exit/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Unwraps `Exit` values that also signify end-of-stream by failing with `None`.
 *
 * For `Exit<E, A>` values that do not signal end-of-stream, prefer:
 */
function flattenExitOption(self) {
  const processChunk = (chunk, cont) => {
    const {
      tuple: [toEmit, rest]
    } = CK.splitWhere_(chunk, _ => !Ex.succeeded(_));
    const next = O.fold_(CK.head(rest), () => cont, Ex.fold(cause => O.fold_(CS.flipCauseOption(cause), () => CH.end(undefined), cause => CH.failCause(cause)), () => CH.end(undefined)));
    return CH.zipRight_(CH.write(CK.collect_(toEmit, Ex.fold(() => O.none, a => O.some(a)))), next);
  };

  const process = CH.readWithCause(chunk => processChunk(chunk, process), cause => CH.failCause(cause), _ => CH.end(undefined));
  return new C.Stream(self.channel[">>>"](process));
}
//# sourceMappingURL=flattenExitOption.js.map