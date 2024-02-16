"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drop = drop;
exports.drop_ = drop_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Drops the specified number of elements from this stream.
 */
function drop_(self, n) {
  const loop = r => CH.readWith(_in => {
    const dropped = CK.drop_(_in, r);
    const leftover = Math.max(r - CK.size(_in), 0);
    const more = CK.isEmpty(_in) || leftover > 0;

    if (more) {
      return loop(leftover);
    } else {
      return CH.zipRight_(CH.write(dropped), CH.identity());
    }
  }, e => CH.fail(e), _ => CH.unit);

  return new C.Stream(self.channel[">>>"](loop(n)));
}
/**
 * Drops the specified number of elements from this stream.
 *
 * @ets_data_first drop_
 */


function drop(n) {
  return self => drop_(self, n);
}
//# sourceMappingURL=drop.js.map