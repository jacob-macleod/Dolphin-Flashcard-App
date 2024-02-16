"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = filter;
exports.filter_ = filter_;

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var _definition = /*#__PURE__*/require("../definition.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function filter_(self, f) {
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

          if (f(elem)) {
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

        while ((next = iterator.next()) && !next.done) {
          const array = next.value;
          const len = array.length;
          let i = 0;

          while (i < len) {
            const a = array[i];

            if (f(a)) {
              builder = Chunk.append_(builder, a);
            }

            i++;
          }
        }

        return builder;
      }
  }
}

function filter(f) {
  return self => filter_(self, f);
}
//# sourceMappingURL=filter.js.map