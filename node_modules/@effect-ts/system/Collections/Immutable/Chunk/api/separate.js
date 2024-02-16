"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.separate = separate;

var _index = /*#__PURE__*/require("../../../../Function/index.js");

var _partitionMap = /*#__PURE__*/require("./partitionMap.js");

/**
 * Partitions the elements of this chunk into two chunks
 */
function separate(self) {
  return (0, _partitionMap.partitionMap_)(self, _index.identity);
}
//# sourceMappingURL=separate.js.map