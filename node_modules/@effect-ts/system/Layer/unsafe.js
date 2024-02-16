"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainProvider = void 0;
exports.unsafeMainProvider = unsafeMainProvider;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Exit/index.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Fiber/index.js"));

var _index4 = /*#__PURE__*/require("../Managed/ReleaseMap/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Promise/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Ref/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./deps-effect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class MainProvider {
  constructor(allocate, release, provide) {
    this.allocate = allocate;
    this.release = release;
    this.provide = provide;
  }

}
/**
 * Unsafely returns a `MainProvider` to be used in frontend-like
 * contexts where initialization needs to be global and sync
 */


exports.MainProvider = MainProvider;

function unsafeMainProvider(self) {
  const promise = P.unsafeMake(F.None);
  const relMap = new _index4.ReleaseMap(Ref.unsafeMakeRef(new _index4.Running(0, new Map())));
  return new MainProvider(T.foldCauseM_(T.map_(T.provideSome_(L.build(self["+++"](L.identity())).effect, r => Tp.tuple(r, relMap)), _ => _.get(1)), cause => T.chain_(P.halt_(promise, cause), () => T.halt(cause)), r => P.succeed(r)(promise)), T.descriptorWith(d => T.asUnit((0, _index4.releaseAll)(Ex.interrupt(d.id), T.sequential)(relMap))), self => T.chain_(P.await(promise), env => T.provide_(self, env)));
}
//# sourceMappingURL=unsafe.js.map