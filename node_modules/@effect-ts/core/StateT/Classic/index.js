"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monad = monad;

var _index = /*#__PURE__*/require("../../Function/index.js");

var _index2 = /*#__PURE__*/require("../../Prelude/DSL/index.js");

var HKT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Prelude/HKT/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function monad(M) {
  return {
    any: () => s => M.map(m => (0, _index.tuple)(m, s))(M.any()),
    flatten: ffa => x => (0, _index2.chainF)(M)(([f, us]) => f(us))(ffa(x)),
    map: f => fa => x => M.map(([a, s]) => (0, _index.tuple)(f(a), s))(fa(x))
  };
}
//# sourceMappingURL=index.js.map