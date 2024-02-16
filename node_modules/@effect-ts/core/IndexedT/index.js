"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ix = void 0;
exports.indexedF = indexedF;
exports.makeIx = makeIx;

require("../Operator/index.js");

var _index2 = /*#__PURE__*/require("../Function/index.js");

var _index3 = /*#__PURE__*/require("../Prelude/DSL/index.js");

var HKT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/HKT/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class Ix {
  constructor(value) {
    this.value = value;
  }

}

exports.Ix = Ix;

function makeIx() {
  return a => new Ix(a);
}

function indexedF() {
  return F => indexed_(F);
}

function indexed_(F) {
  return {
    iof: () => a => makeIx()((0, _index3.succeedF)(F)(a)),
    ichain: f => fa => makeIx()((0, _index3.chainF)(F)(a => f(a).value)(fa.value)),
    lift: () => fa => makeIx()(fa),
    lower: () => fa => fa.value,
    chain: f => fa => makeIx()((0, _index3.chainF)(F)(a => f(a).value)(fa.value)),
    chainLower: f => fa => makeIx()((0, _index3.chainF)(F)(f)(fa.value))
  };
}
//# sourceMappingURL=index.js.map