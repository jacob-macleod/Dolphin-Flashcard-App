"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectWhile = collectWhile;
exports.collectWhile_ = collectWhile_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 */
function collectWhile_(self, pf) {
  const loop = CH.readWith(_in => {
    const mapped = CK.collectWhile_(_in, pf);

    if (CK.size(mapped) === CK.size(_in)) {
      return CH.zipRight_(CH.write(mapped), loop);
    } else {
      return CH.write(mapped);
    }
  }, CH.fail, CH.succeed);
  return new C.Stream(self.channel[">>>"](loop));
}
/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 *
 * @ets_data_first collectWhile_
 */


function collectWhile(pf) {
  return self => collectWhile_(self, pf);
}
//# sourceMappingURL=collectWhile.js.map