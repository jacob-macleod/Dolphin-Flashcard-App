"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withChildren = withChildren;

var SS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/SortedSet/index.js"));

var _index2 = /*#__PURE__*/require("../Supervisor/index.js");

var _core = /*#__PURE__*/require("./core.js");

var _descriptor = /*#__PURE__*/require("./descriptor.js");

var _map = /*#__PURE__*/require("./map.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Locally installs a supervisor and an effect that succeeds with all the
 * children that have been forked in the returned effect.
 */
function withChildren(get, __trace) {
  return (0, _core.chain_)(_index2.track, supervisor => (0, _core.supervised)(supervisor)(get((0, _core.chain_)(supervisor.value, children => (0, _map.map_)(_descriptor.descriptor, d => SS.filter_(children, _ => _.id !== d.id))))), __trace);
}
//# sourceMappingURL=withChildren.js.map