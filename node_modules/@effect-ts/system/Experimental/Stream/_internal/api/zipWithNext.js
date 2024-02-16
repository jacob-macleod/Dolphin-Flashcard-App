"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWithNext = zipWithNext;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Zips each element with the next element if present.
 */
function zipWithNext(self) {
  const process = last => CH.readWith(in_ => {
    const {
      tuple: [newlast, chunk]
    } = CK.mapAccum_(in_, last, (prev, curr) => Tp.tuple(O.some(curr), O.map_(prev, _ => Tp.tuple(_, curr))));
    const out = CK.collect_(chunk, O.fold(() => O.none, ({
      tuple: [prev, curr]
    }) => O.some(Tp.tuple(prev, O.some(curr)))));
    return CH.zipRight_(CH.write(out), process(newlast));
  }, err => CH.fail(err), _ => O.fold_(last, () => CH.unit, value => CH.zipRight_(CH.write(CK.single(Tp.tuple(value, O.none))), CH.unit)));

  return new C.Stream(self.channel[">>>"](process(O.none)));
}
//# sourceMappingURL=zipWithNext.js.map