"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectWhile = collectWhile;
exports.collectWhile_ = collectWhile_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var ChunkDef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../definition.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Transforms all elements of the chunk for as long as the specified partial function is defined.
 */
function collectWhile_(self, f) {
  ;

  switch (self._typeId) {
    case ChunkDef.SingletonTypeId:
      {
        return O.fold_(f(self.a), () => Chunk.empty(), Chunk.single);
      }

    case ChunkDef.ArrTypeId:
      {
        const array = self.arrayLike();
        let dest = Chunk.empty();

        for (let i = 0; i < array.length; i++) {
          const rhs = f(array[i]);

          if (O.isSome(rhs)) {
            dest = Chunk.append_(dest, rhs.value);
          } else {
            return dest;
          }
        }

        return dest;
      }

    default:
      {
        return collectWhile_(self.materialize(), f);
      }
  }
}
/**
 * Transforms all elements of the chunk for as long as the specified partial function is defined.
 *
 * @ets_data_first collectWhile_
 */


function collectWhile(f) {
  return self => collectWhile_(self, f);
}
//# sourceMappingURL=collectWhile.js.map