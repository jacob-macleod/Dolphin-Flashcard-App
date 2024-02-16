"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  forEachF: true
};
exports.forEachF = void 0;

var _Function = /*#__PURE__*/require("@effect-ts/system/Function");

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Iterable"));

Object.keys(I).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === I[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return I[key];
    }
  });
});

var _index = /*#__PURE__*/require("../Prelude/DSL/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Prelude/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * `ForEach`'s `forEachF` function
 */
const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => f => I.reduce((0, _index.succeedF)(G)(I.never), (b, a) => G.map(({
  tuple: [x, y]
}) => I.concat(x, I.of(y)))(G.both(f(a))(b))));
exports.forEachF = forEachF;
//# sourceMappingURL=operations.js.map