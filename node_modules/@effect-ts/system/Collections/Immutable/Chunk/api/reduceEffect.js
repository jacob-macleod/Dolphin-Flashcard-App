"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceEffect = reduceEffect;
exports.reduceEffect_ = reduceEffect_;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

var _reduce = /*#__PURE__*/require("./reduce.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Folds over the elements in this chunk from the left.
 */
function reduceEffect_(self, s, f) {
  ;

  if (self._typeId === _definition.SingletonTypeId) {
    return f(s, self.a);
  }

  return (0, _reduce.reduce_)(self, core.succeed(s), (s, a) => core.chain_(s, s1 => f(s1, a)));
}
/**
 * Folds over the elements in this chunk from the left.
 *
 * @ets_data_first reduceEffect_
 */


function reduceEffect(s, f) {
  return self => reduceEffect_(self, s, f);
}
//# sourceMappingURL=reduceEffect.js.map