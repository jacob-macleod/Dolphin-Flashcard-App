"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unfoldEffect = unfoldEffect;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/core.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var _core2 = /*#__PURE__*/require("../core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function loop(s, f, builder) {
  return core.chain_(f(s), o => {
    if (O.isSome(o)) {
      return loop(o.value.get(1), f, (0, _core2.append_)(builder, o.value.get(0)));
    } else {
      return core.succeed(builder);
    }
  });
}
/**
 * Constructs a `Chunk` by repeatedly applying the effectual function `f` as
 * long as it returns `Some`.
 */


function unfoldEffect(s, f) {
  return loop(s, f, (0, _core2.empty)());
}
//# sourceMappingURL=unfoldEffect.js.map