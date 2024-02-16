"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changesWith = changesWith;
exports.changesWith_ = changesWith_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a new stream that only emits elements that are not equal to the
 * previous element emitted, using the specified function to determine
 * whether two elements are equal.
 */
function changesWith_(self, equal) {
  const writer = last => CH.readWithCause(chunk => {
    const {
      tuple: [newLast, newChunk]
    } = CK.reduce_(chunk, Tp.tuple(last, CK.empty()), ({
      tuple: [op, os]
    }, o1) => {
      if (O.isSome(op)) {
        if (equal.equals(op.value, o1)) {
          return Tp.tuple(O.some(o1), os);
        }
      }

      return Tp.tuple(O.some(o1), CK.append_(os, o1));
    });
    return CH.zipRight_(CH.write(newChunk), writer(newLast));
  }, cause => CH.failCause(cause), _ => CH.unit);

  return new C.Stream(self.channel[">>>"](writer(O.none)));
}
/**
 * Returns a new stream that only emits elements that are not equal to the
 * previous element emitted, using the specified function to determine
 * whether two elements are equal.
 *
 * @ets_data_first changesWith_
 */


function changesWith(equal) {
  return self => changesWith_(self, equal);
}
//# sourceMappingURL=changesWith.js.map