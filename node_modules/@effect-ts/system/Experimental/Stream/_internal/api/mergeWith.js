"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeWith = mergeWith;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Exit/index.js"));

var MH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/_internal/mergeHelpers.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Merges this stream and the specified stream together to a common element
 * type with the specified mapping functions.
 *
 * New produced stream will terminate when both specified stream terminate if
 * no termination strategy is specified.
 */
function mergeWith(self, that, l, r, strategy = "Both") {
  const handler = terminate => exit => {
    if (terminate || !Ex.succeeded(exit)) {
      return MH.done(T.done(exit));
    } else {
      return MH.await_(T.done);
    }
  };

  return new C.Stream(CH.mergeWith_(Map.map_(self, l).channel, Map.map_(that, r).channel, handler(strategy === "Either" || strategy === "Left"), handler(strategy === "Either" || strategy === "Right")));
}
//# sourceMappingURL=mergeWith.js.map