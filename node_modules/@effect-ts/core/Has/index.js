"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  deriveFunctions: true
};
exports.deriveFunctions = deriveFunctions;

require("../Operator/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Effect"));

var _Has = /*#__PURE__*/require("@effect-ts/system/Has");

Object.keys(_Has).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Has[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Has[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function deriveFunctions(self, ...keys) {
  const res = {};

  for (const k of keys) {
    // @ts-expect-error
    res[k] = (...args) => T.accessServiceM(self)(_ => _[k](...args));
  } // @ts-expect-error


  return res;
}
//# sourceMappingURL=index.js.map