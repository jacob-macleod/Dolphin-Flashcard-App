"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceWhileEffect = reduceWhileEffect;
exports.reduceWhileEffect_ = reduceWhileEffect_;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function loop(s, iterator, array, i, length, pred, f) {
  if (i < length) {
    if (pred(s)) {
      return core.chain_(f(s, array[i]), s1 => loop(s1, iterator, array, i + 1, length, pred, f));
    } else {
      return core.succeed(s);
    }
  } else {
    const next = iterator.next();

    if (next.done) {
      return core.succeed(s);
    } else {
      const arr = next.value;
      return core.suspend(() => loop(s, iterator, arr, 0, arr.length, pred, f));
    }
  }
}
/**
 * Folds over the elements in this chunk from the left.
 * Stops the fold early when the condition is not fulfilled.
 */


function reduceWhileEffect_(self, s, pred, f) {
  const iterator = self.arrayLikeIterator();
  const next = iterator.next();

  if (next.done) {
    return core.succeed(s);
  } else {
    const array = next.value;
    const length = array.length;
    return loop(s, iterator, array, 0, length, pred, f);
  }
}
/**
 * Folds over the elements in this chunk from the left.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @ets_data_first reduceWhileEffect_
 */


function reduceWhileEffect(s, pred, f) {
  return self => reduceWhileEffect_(self, s, pred, f);
}
//# sourceMappingURL=reduceWhileEffect.js.map