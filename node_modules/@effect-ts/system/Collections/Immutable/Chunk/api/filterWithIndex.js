"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterWithIndex = filterWithIndex;
exports.filterWithIndex_ = filterWithIndex_;

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function filterWithIndex_(self, f) {
  ;

  switch (self._typeId) {
    case _definition.ArrTypeId:
      {
        const arr = self.arrayLike();
        const len = arr.length;
        let i = 0;
        let builder = Chunk.empty();

        while (i < len) {
          const elem = arr[i];

          if (f(i, elem)) {
            builder = Chunk.append_(builder, elem);
          }

          i++;
        }

        return builder;
      }

    default:
      {
        const iterator = self.arrayLikeIterator();
        let next;
        let builder = Chunk.empty();
        let index = 0;

        while ((next = iterator.next()) && !next.done) {
          const array = next.value;
          const len = array.length;
          let i = 0;

          while (i < len) {
            const a = array[i];

            if (f(index, a)) {
              builder = Chunk.append_(builder, a);
            }

            i++;
            index++;
          }
        }

        return builder;
      }
  }
}

function filterWithIndex(f) {
  return self => filterWithIndex_(self, f);
}
//# sourceMappingURL=filterWithIndex.js.map