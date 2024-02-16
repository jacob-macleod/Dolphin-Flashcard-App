"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeUntilEffect = takeUntilEffect;
exports.takeUntilEffect_ = takeUntilEffect_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var LoopOnPartialChunks = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./loopOnPartialChunks.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Takes all elements of the stream until the specified effectual predicate
 * evaluates to `true`.
 */
function takeUntilEffect_(self, f) {
  return LoopOnPartialChunks.loopOnPartialChunks_(self, (chunk, emit) => T.map_(T.let_(T.bind_(T.do, "taken", () => CK.takeWhileEffect_(chunk, v => T.zipRight_(emit(v), T.map_(f(v), _ => !_)))), "last", ({
    taken
  }) => CK.take_(CK.drop_(chunk, CK.size(taken)), 1)), ({
    last
  }) => CK.isEmpty(last)));
}
/**
 * Takes all elements of the stream until the specified effectual predicate
 * evaluates to `true`.
 *
 * @ets_data_first takeUntilEffect_
 */


function takeUntilEffect(f) {
  return self => takeUntilEffect_(self, f);
}
//# sourceMappingURL=takeUntilEffect.js.map