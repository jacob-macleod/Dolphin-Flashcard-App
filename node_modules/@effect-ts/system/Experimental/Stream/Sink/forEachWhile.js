"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEachWhile = forEachWhile;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../../Function/index.js");

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * A sink that executes the provided effectful function for every element fed to it
 * until `f` evaluates to `false`.
 */
function forEachWhile(f) {
  const go = (chunk, idx, len, cont) => {
    if (idx === len) {
      return cont;
    } else {
      return CH.catchAll_(CH.chain_(CH.fromEffect(f(CK.unsafeGet_(chunk, idx))), b => {
        if (b) {
          return go(chunk, idx + 1, len, cont);
        } else {
          return CH.write(CK.drop_(chunk, idx));
        }
      }), e => CH.zipRight_(CH.write(CK.drop_(chunk, idx)), CH.fail(e)));
    }
  };

  const process = CH.readWithCause(_in => go(_in, 0, CK.size(_in), process), halt => CH.failCause(halt), _ => CH.end(undefined));
  return new C.Sink(process);
}
//# sourceMappingURL=forEachWhile.js.map