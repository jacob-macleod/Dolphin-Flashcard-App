"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unfold = unfold;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var _core = /*#__PURE__*/require("../core.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Constructs a `Chunk` by repeatedly applying the function `f` as long as it
 * returns `Some`.
 */
function unfold(s, f) {
  let builder = (0, _core.empty)();
  let cont = true;
  let s1 = s;

  while (cont) {
    const x = f(s1);

    if (O.isSome(x)) {
      s1 = x[1];
      builder = (0, _core.append_)(builder, x[0]);
    } else {
      cont = false;
    }
  }

  return builder;
}
//# sourceMappingURL=unfold.js.map