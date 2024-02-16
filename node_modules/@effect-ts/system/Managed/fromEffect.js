"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromEffect = fromEffect;
exports.fromEffectUninterruptible = fromEffectUninterruptible;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./deps-core.js"));

var _managed = /*#__PURE__*/require("./managed.js");

var Finalizer = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ReleaseMap/finalizer.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with no release action. The
 * effect will be performed interruptibly.
 */
function fromEffect(effect, __trace) {
  return (0, _managed.managedApply)(T.map_(T.provideSome_(effect, _ => _.get(0), __trace), a => Tp.tuple(Finalizer.noopFinalizer, a)));
}
/**
 * Lifts a `Effect< R, E, A>` into `Managed<R, E, A>` with no release action. The
 * effect will be performed uninterruptibly. You usually want the `fromEffect`
 * variant.
 */


function fromEffectUninterruptible(effect, __trace) {
  return fromEffect(T.uninterruptible(effect), __trace);
}
//# sourceMappingURL=fromEffect.js.map