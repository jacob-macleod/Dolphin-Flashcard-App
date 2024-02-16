"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Allocation = void 0;
exports.allocate = allocate;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../deps.js"));

var _index2 = /*#__PURE__*/require("../ReleaseMap/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class Allocation {
  constructor(value, release) {
    this.value = value;
    this.release = release;
  }

}
/**
 * Allocates the managed for future usage & release.
 *
 * Note: in case of failures during acquisition resources that
 * have been acquired will be immediately released. In case the
 * managed succeeds in acquiring all the resources an Allocation
 * will be returned and it is up to the caller to ensure invokation
 * of `release`, if that is not done resources will not be released.
 */


exports.Allocation = Allocation;

function allocate(self) {
  return T.chain_(_index2.makeReleaseMap, rm => T.foldCauseM_(T.provideSome_(self.effect, r => Tp.tuple(r, rm)), cause => T.chain_((0, _index2.releaseAll)(T.exitHalt(cause), T.sequential)(rm), () => T.halt(cause)), ({
    tuple: [_, a]
  }) => T.succeed(new Allocation(a, T.descriptorWith(d => (0, _index2.releaseAll)(T.exitInterrupt(d.id), T.sequential)(rm))))));
}
//# sourceMappingURL=allocate.js.map