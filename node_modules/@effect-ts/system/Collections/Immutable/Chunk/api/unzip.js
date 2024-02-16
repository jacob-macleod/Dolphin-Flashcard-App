"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unzip = unzip;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Tuple/index.js"));

var _core = /*#__PURE__*/require("../core.js");

var _forEach = /*#__PURE__*/require("./forEach.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
 */
function unzip(as) {
  let fa = (0, _core.empty)();
  let fb = (0, _core.empty)();
  (0, _forEach.forEach_)(as, ({
    tuple: [a, b]
  }) => {
    fa = (0, _core.append_)(fa, a);
    fb = (0, _core.append_)(fb, b);
  });
  return Tp.tuple(fa, fb);
}
//# sourceMappingURL=unzip.js.map