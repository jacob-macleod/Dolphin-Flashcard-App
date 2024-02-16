"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectEffect = collectEffect;
exports.collectEffect_ = collectEffect_;

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/core.js"));

var map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/map.js"));

var zipWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/zipWith.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var ChunkDef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../definition.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a filtered, mapped subset of the elements of this chunk based on a .
 */
function collectEffect_(self, f) {
  ;

  switch (self._typeId) {
    case ChunkDef.SingletonTypeId:
      {
        return O.fold_(f(self.a), () => core.succeed(Chunk.empty()), b => map.map_(b, Chunk.single));
      }

    case ChunkDef.ArrTypeId:
      {
        const array = self.arrayLike();
        let dest = core.succeed(Chunk.empty());

        for (let i = 0; i < array.length; i++) {
          const rhs = f(array[i]);

          if (O.isSome(rhs)) {
            dest = zipWith.zipWith_(dest, rhs.value, Chunk.append_);
          }
        }

        return dest;
      }

    default:
      {
        return collectEffect_(self.materialize(), f);
      }
  }
}
/**
 * Returns a filtered, mapped subset of the elements of this chunk based on a .
 *
 * @ets_data_first collectEffect_
 */


function collectEffect(f) {
  return self => collectEffect_(self, f);
}
//# sourceMappingURL=collectEffect.js.map