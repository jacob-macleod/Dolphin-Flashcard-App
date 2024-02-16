"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectWhileEffect = collectWhileEffect;
exports.collectWhileEffect_ = collectWhileEffect_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var LoopOnPartialChunks = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./loopOnPartialChunks.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Effectfully transforms all elements of the stream for as long as the specified partial function is defined.
 */
function collectWhileEffect_(self, pf) {
  return LoopOnPartialChunks.loopOnPartialChunks_(self, (chunk, emit) => {
    const pfSome = a => O.fold_(pf(a), () => T.succeed(false), _ => T.as_(T.chain_(_, emit), true));

    const loop = chunk => {
      if (CK.isEmpty(chunk)) {
        return T.succeed(true);
      } else {
        return T.chain_(pfSome(CK.unsafeHead(chunk)), cont => {
          if (cont) {
            return loop(CK.unsafeTail(chunk));
          } else {
            return T.succeed(false);
          }
        });
      }
    };

    return loop(chunk);
  });
}
/**
 * Effectfully transforms all elements of the stream for as long as the specified partial function is defined.
 *
 * @ets_data_first collectWhileEffect_
 */


function collectWhileEffect(pf) {
  return self => collectWhileEffect_(self, pf);
}
//# sourceMappingURL=collectWhileEffect.js.map