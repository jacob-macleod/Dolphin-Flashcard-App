"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapAccumEffect = mapAccumEffect;
exports.mapAccumEffect_ = mapAccumEffect_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index4 = /*#__PURE__*/require("../../../../Function/index.js");

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Statefully and effectfully maps over the elements of this stream to produce
 * new elements.
 */
function mapAccumEffect_(self, s, f) {
  const accumulator = s => CH.readWith(in_ => CH.unwrap(T.suspend(() => {
    const outputChunk = CK.builder();

    const emit = a => T.asUnit(T.succeedWith(() => {
      outputChunk.append(a);
    }));

    return T.fold_(T.reduce_(in_, s, (s1, a) => T.chain_(f(s1, a), sa => T.as_(emit(Tp.get_(sa, 1)), Tp.get_(sa, 0)))), failure => {
      const partialResult = outputChunk.build();

      if (!CK.isEmpty(partialResult)) {
        return CH.zipRight_(CH.write(partialResult), CH.fail(failure));
      } else {
        return CH.fail(failure);
      }
    }, _ => CH.zipRight_(CH.write(outputChunk.build()), accumulator(_)));
  })), _ => CH.fail(_), _ => CH.unit);

  return new C.Stream(self.channel[">>>"](accumulator(s)));
}
/**
 * Statefully and effectfully maps over the elements of this stream to produce
 * new elements.
 *
 * @ets_data_first mapAccumEffect_
 */


function mapAccumEffect(s, f) {
  return self => mapAccumEffect_(self, s, f);
}
//# sourceMappingURL=mapAccumEffect.js.map