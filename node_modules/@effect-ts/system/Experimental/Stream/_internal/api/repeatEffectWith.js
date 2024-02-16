"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatEffectWith = repeatEffectWith;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Schedule/index.js"));

var Chain = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chain.js"));

var Concat = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./concat.js"));

var FromEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromEffect.js"));

var Succeed = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./succeed.js"));

var UnfoldEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./unfoldEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Creates a stream from an effect producing a value of type `A`, which is repeated using the
 * specified schedule.
 */
function repeatEffectWith(effect, schedule) {
  return Chain.chain_(FromEffect.fromEffect(T.zip_(effect, SC.driver(schedule))), ({
    tuple: [a, driver]
  }) => Concat.concat_(Succeed.succeed(a), UnfoldEffect.unfoldEffect(a, _ => T.foldM_(driver.next(_), _ => T.succeed(_), _ => T.map_(effect, nextA => O.some(Tp.tuple(nextA, nextA)))))));
}
//# sourceMappingURL=repeatEffectWith.js.map