"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findEffect = findEffect;
exports.findEffect_ = findEffect_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var _definition = /*#__PURE__*/require("../definition.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns the first element that satisfies the effectful predicate.
 */
function findEffect_(self, f) {
  return T.suspend(() => {
    const iterator = self.arrayLikeIterator();
    let next;

    const loop = (iterator, array, i, length) => {
      if (i < length) {
        const a = array[i];
        return T.chain_(f(a), r => r ? T.succeed(O.some(a)) : loop(iterator, array, i + 1, length));
      } else if (!(next = iterator.next()).done) {
        return loop(iterator, next.value, 0, next.value.length);
      } else {
        return T.succeed(O.none);
      }
    };

    next = iterator.next();

    if (!next.done) {
      return loop(iterator, next.value, 0, next.value.length);
    } else {
      return T.succeed(O.none);
    }
  });
}
/**
 * Returns the first element that satisfies the effectful predicate.
 *
 * @ets_data_first findEffect_
 */


function findEffect(f) {
  return self => findEffect_(self, f);
}
//# sourceMappingURL=findEffect.js.map