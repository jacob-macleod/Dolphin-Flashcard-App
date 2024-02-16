"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupAdjacentBy = groupAdjacentBy;
exports.groupAdjacentBy_ = groupAdjacentBy_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a stream that groups on adjacent keys, calculated by function f.
 */
function groupAdjacentBy_(self, f) {
  const go = (in_, state) => CK.reduce_(in_, Tp.tuple(CK.empty(), state), ({
    tuple: [os, o]
  }, a) => O.fold_(o, () => Tp.tuple(os, O.some(Tp.tuple(f(a), CK.single(a)))), agg => {
    const k2 = f(a);
    const {
      tuple: [k, aggregated]
    } = agg;

    if (k === k2) {
      return Tp.tuple(os, O.some(Tp.tuple(k, CK.append_(aggregated, a))));
    } else {
      return Tp.tuple(CK.append_(os, agg), O.some(Tp.tuple(k2, CK.single(a))));
    }
  }));

  const chunkAdjacent = buffer => CH.readWithCause(chunk => {
    const {
      tuple: [outputs, newBuffer]
    } = go(chunk, buffer);
    return CH.zipRight_(CH.write(outputs), chunkAdjacent(newBuffer));
  }, _ => CH.failCause(_), _ => O.fold_(buffer, () => CH.unit, o => CH.write(CK.single(o))));

  return new C.Stream(self.channel[">>>"](chunkAdjacent(O.none)));
}
/**
 * Creates a stream that groups on adjacent keys, calculated by function f.
 *
 * @ets_data_first groupAdjacentBy_
 */


function groupAdjacentBy(f) {
  return self => groupAdjacentBy_(self, f);
}
//# sourceMappingURL=groupAdjacentBy.js.map