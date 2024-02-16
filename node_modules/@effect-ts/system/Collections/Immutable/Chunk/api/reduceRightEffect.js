"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceRightEffect = reduceRightEffect;
exports.reduceRightEffect_ = reduceRightEffect_;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

var _reduceRight = /*#__PURE__*/require("./reduceRight.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Folds over the elements in this chunk from the right.
 */
function reduceRightEffect_(self, s, f) {
  ;

  if (self._typeId === _definition.SingletonTypeId) {
    return f(self.a, s);
  }

  return (0, _reduceRight.reduceRight_)(self, core.succeed(s), (a, s) => core.chain_(s, s1 => f(a, s1)));
}
/**
 * Folds over the elements in this chunk from the right.
 *
 * @ets_data_first reduceRightEffect_
 */


function reduceRightEffect(s, f) {
  return self => reduceRightEffect_(self, s, f);
}
//# sourceMappingURL=reduceRightEffect.js.map