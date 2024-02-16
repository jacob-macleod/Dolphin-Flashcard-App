"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.haltWhen = haltWhen;
exports.haltWhen_ = haltWhen_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Exit/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Halts the evaluation of this stream when the provided IO completes. The given IO
 * will be forked as part of the returned stream, and its success will be discarded.
 *
 * An element in the process of being pulled will not be interrupted when the IO
 * completes. See `interruptWhen` for this behavior.
 *
 * If the IO completes with a failure, the stream will emit that failure.
 */
function haltWhen_(self, io) {
  const writer = fiber => CH.unwrap(T.map_(fiber.poll, O.fold(() => CH.readWith(in_ => CH.zipRight_(CH.write(in_), writer(fiber)), err => CH.fail(err), _ => CH.unit), exit => Ex.fold_(exit, _ => CH.failCause(_), _ => CH.unit))));

  return new C.Stream(CH.unwrapManaged(M.map_(T.forkManaged(io), fiber => self.channel[">>>"](writer(fiber)))));
}
/**
 * Halts the evaluation of this stream when the provided IO completes. The given IO
 * will be forked as part of the returned stream, and its success will be discarded.
 *
 * An element in the process of being pulled will not be interrupted when the IO
 * completes. See `interruptWhen` for this behavior.
 *
 * If the IO completes with a failure, the stream will emit that failure.
 *
 * @ets_data_first haltWhen_
 */


function haltWhen(io) {
  return self => haltWhen_(self, io);
}
//# sourceMappingURL=haltWhen.js.map