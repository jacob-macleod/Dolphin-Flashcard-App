"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWithPar = zipWithPar;
exports.zipWithPar_ = zipWithPar_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Exit/index.js"));

var _index3 = /*#__PURE__*/require("../../../Function/index.js");

var H = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Hub/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Managed/index.js"));

var MH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/_internal/mergeHelpers.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Runs both sinks in parallel on the input and combines the results
 * using the provided function.
 */
function zipWithPar_(self, that, f, capacity = 16) {
  const channel = CH.unwrapManaged(M.map_(M.let_(M.let_(M.let_(M.let_(M.bind_(M.bind_(M.bind_(M.do, "hub", () => T.toManaged(H.makeBounded(capacity))), "left", ({
    hub
  }) => CH.fromHubManaged(hub)), "right", ({
    hub
  }) => CH.fromHubManaged(hub)), "reader", ({
    hub
  }) => CH.toHub(hub)), "c1", ({
    left
  }) => left[">>>"](self.channel)), "c2", ({
    right
  }) => right[">>>"](that.channel)), "writer", ({
    c1,
    c2
  }) => CH.mergeWith_(c1, c2, Ex.fold(err => MH.done(T.halt(err)), lz => MH.await_(Ex.fold(cause => T.halt(cause), rz => T.succeed(f(lz, rz))))), Ex.fold(err => MH.done(T.halt(err)), rz => MH.await_(Ex.fold(cause => T.halt(cause), lz => T.succeed(f(lz, rz))))))), ({
    reader,
    writer
  }) => CH.mergeWith_(reader, writer, _ => MH.await_(Ex.fold(cause => T.halt(cause), z => T.succeed(z))), Ex.fold(cause => MH.done(T.halt(cause)), z => MH.done(T.succeed(z))))));
  return new C.Sink(channel);
}
/**
 * Runs both sinks in parallel on the input and combines the results
 * using the provided function.
 *
 * @ets_data_first zipWithPar_
 */


function zipWithPar(that, f, capacity = 16) {
  return self => zipWithPar_(self, that, f, capacity);
}
//# sourceMappingURL=zipWithPar.js.map