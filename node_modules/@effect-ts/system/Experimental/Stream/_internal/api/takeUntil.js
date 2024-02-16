"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeUntil = takeUntil;
exports.takeUntil_ = takeUntil_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Takes all elements of the stream until the specified predicate evaluates
 * to `true`.
 */
function takeUntil_(self, f) {
  const loop = CH.readWith(chunk => {
    const taken = CK.takeWhile_(chunk, _ => !f(_));
    const last = CK.take_(CK.drop_(chunk, CK.size(taken)), 1);

    if (CK.isEmpty(last)) {
      return CH.zipRight_(CH.write(taken), loop);
    } else {
      return CH.write(CK.concat_(taken, last));
    }
  }, _ => CH.fail(_), _ => CH.succeed(_));
  return new C.Stream(self.channel[">>>"](loop));
}
/**
 * Takes all elements of the stream until the specified predicate evaluates
 * to `true`.
 *
 * @ets_data_first takeUntil_
 */


function takeUntil(f) {
  return self => takeUntil_(self, f);
}
//# sourceMappingURL=takeUntil.js.map