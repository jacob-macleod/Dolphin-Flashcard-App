"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collect = collect;
exports.collect_ = collect_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var ChunkDef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../definition.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 */
function collect_(self, f) {
  ;

  switch (self._typeId) {
    case ChunkDef.ArrTypeId:
      {
        const array = self.arrayLike();
        let dest = Chunk.empty();

        for (let i = 0; i < array.length; i++) {
          const rhs = f(array[i]);

          if (O.isSome(rhs)) {
            dest = Chunk.append_(dest, rhs.value);
          }
        }

        return dest;
      }

    default:
      {
        return collect_(self.materialize(), f);
      }
  }
}
/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 *
 * @ets_data_first collect_
 */


function collect(f) {
  return self => collect_(self, f);
}
//# sourceMappingURL=collect.js.map