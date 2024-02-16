"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raceBoth = raceBoth;
exports.raceBoth_ = raceBoth_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Either/index.js"));

var _index3 = /*#__PURE__*/require("../../../Function/index.js");

var H = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Hub/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Managed/index.js"));

var MH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/_internal/mergeHelpers.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var UnwrapManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./unwrapManaged.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 */
function raceBoth_(self, that, capacity = 16) {
  const managed = M.map_(M.let_(M.let_(M.let_(M.bind_(M.bind_(M.bind_(M.do, "hub", () => T.toManaged(H.makeBounded(capacity))), "c1", ({
    hub
  }) => CH.fromHubManaged(hub)), "c2", ({
    hub
  }) => CH.fromHubManaged(hub)), "reader", ({
    hub
  }) => CH.toHub(hub)), "writer", ({
    c1,
    c2
  }) => CH.mergeWith_(c1[">>>"](self.channel), c2[">>>"](that.channel), selfDone => MH.done(T.map_(T.done(selfDone), E.left)), thatDone => MH.done(T.map_(T.done(thatDone), E.right)))), "channel", ({
    reader,
    writer
  }) => CH.mergeWith_(reader, writer, _ => MH.await_(_ => T.done(_)), done => MH.done(T.done(done)))), ({
    channel
  }) => new C.Sink(channel));
  return UnwrapManaged.unwrapManaged(managed);
}
/**
 * Runs both sinks in parallel on the input, returning the result or the error from the
 * one that finishes first.
 *
 * @ets_data_first orElse_
 */


function raceBoth(that, capacity = 16) {
  return self => raceBoth_(self, that, capacity);
}
//# sourceMappingURL=raceBoth.js.map