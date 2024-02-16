"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionMap = partitionMap;
exports.partitionMap_ = partitionMap_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Tuple/index.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var _forEach = /*#__PURE__*/require("./forEach.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Partitions the elements of this chunk into two chunks using the specified
 * function.
 */
function partitionMap_(self, f) {
  let bs = Chunk.empty();
  let cs = Chunk.empty();
  (0, _forEach.forEach_)(self, a => {
    const x = f(a);

    if (x._tag === "Left") {
      bs = Chunk.append_(bs, x.left);
    } else {
      cs = Chunk.append_(cs, x.right);
    }
  });
  return Tp.tuple(bs, cs);
}
/**
 * Partitions the elements of this chunk into two chunks using the specified
 * function.
 *
 * @ets_data_first partitionMap_
 */


function partitionMap(f) {
  return self => partitionMap_(self, f);
}
//# sourceMappingURL=partitionMap.js.map