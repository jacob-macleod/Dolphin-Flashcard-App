"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchable = switchable;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var _ExecutionStrategy = /*#__PURE__*/require("../../Effect/ExecutionStrategy.js");

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var _index3 = /*#__PURE__*/require("../../Option/index.js");

var _core = /*#__PURE__*/require("../core.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../deps.js"));

var Do = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../do.js"));

var addIfOpen = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../ReleaseMap/addIfOpen.js"));

var makeReleaseMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../ReleaseMap/makeReleaseMap.js"));

var releaseAll = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../ReleaseMap/releaseAll.js"));

var replace = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../ReleaseMap/replace.js"));

var _releaseMap = /*#__PURE__*/require("./releaseMap.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a `Managed` value that represents a managed resource that can
 * be safely swapped within the scope of the `Managed`. The function provided
 * inside the `Managed` can be used to switch the resource currently in use.
 *
 * When the resource is switched, the finalizer for the previous finalizer will
 * be executed uninterruptibly. If the effect executing inside the `use`
 * is interrupted, the finalizer for the resource currently in use is guaranteed
 * to execute.
 *
 * This constructor can be used to create an expressive control flow that uses
 * several instances of a managed resource.
 */
function switchable(__trace) {
  return (0, _core.map)(({
    key,
    releaseMap
  }) => newResource => T.uninterruptibleMask(({
    restore
  }) => T.map_(T.tap_(T.bind_(T.bind_(T.bind_(T.zipRight_(T.chain_(replace.replace(key, _ => T.unit)(releaseMap), (0, _index3.fold)(() => T.unit, fin => fin(T.exitUnit))), T.do), "r", () => T.environment()), "inner", () => makeReleaseMap.makeReleaseMap), "a", ({
    inner,
    r
  }) => restore(T.provideAll_(newResource.effect, Tp.tuple(r, inner)))), ({
    inner
  }) => replace.replace(key, exit => releaseAll.releaseAll(exit, _ExecutionStrategy.sequential)(inner))(releaseMap)), ({
    a
  }) => a.get(1))), __trace)(Do.bind_(Do.bind_(Do.do, "releaseMap", () => _releaseMap.releaseMap), "key", ({
    releaseMap
  }) => T.toManaged(T.chain_(addIfOpen.addIfOpen(_ => T.unit)(releaseMap), (0, _index3.fold)(() => T.interrupt, T.succeed)))));
}
//# sourceMappingURL=switchable.js.map