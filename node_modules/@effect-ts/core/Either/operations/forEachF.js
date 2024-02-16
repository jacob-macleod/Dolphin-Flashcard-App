"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEachF = void 0;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Either"));

var _index = /*#__PURE__*/require("../../Function/index.js");

var DSL = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Prelude/DSL/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Prelude/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * `ForEach`'s `forEachF` function
 */
const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => f => fa => E.isLeft(fa) ? DSL.succeedF(G)(fa) : G.map(E.right)(f(fa.right)));
exports.forEachF = forEachF;
//# sourceMappingURL=forEachF.js.map