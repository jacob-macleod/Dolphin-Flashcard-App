"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeExit = makeExit;
exports.makeExit_ = makeExit_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _index2 = /*#__PURE__*/require("../Function/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./deps-core.js"));

var _managed = /*#__PURE__*/require("./managed.js");

var add = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ReleaseMap/add.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action
 * that handles `Exit`. The acquire and release actions will be performed uninterruptibly.
 *
 * @ets_data_first makeExit_
 */
function makeExit(release, __trace) {
  return acquire => makeExit_(acquire, release, __trace);
}
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action
 * that handles `Exit`. The acquire and release actions will be performed uninterruptibly.
 */


function makeExit_(acquire, release, __trace) {
  return (0, _managed.managedApply)(T.uninterruptible(T.map_(T.bind_(T.bind_(T.bind_(T.do, "r", () => T.environment()), "a", s => T.provideAll_(acquire, s.r.get(0)), __trace), "rm", s => add.add(ex => T.provideAll_(release(s.a, ex), s.r.get(0), __trace))(s.r.get(1))), s => Tp.tuple(s.rm, s.a))));
}
//# sourceMappingURL=makeExit.js.map