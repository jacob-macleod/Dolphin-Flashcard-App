"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intersperse = intersperse;
exports.intersperse_ = intersperse_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Intersperse stream with provided element.
 */
function intersperse_(self, middle) {
  const writer = isFirst => CH.readWith(chunk => {
    const builder = CK.builder();
    let flagResult = isFirst;
    CK.forEach_(chunk, o => {
      if (flagResult) {
        flagResult = false;
        builder.append(o);
      } else {
        builder.append(middle);
        builder.append(o);
      }
    });
    return CH.zipRight_(CH.write(builder.build()), writer(flagResult));
  }, err => CH.fail(err), _ => CH.unit);

  return new C.Stream(self.channel[">>>"](writer(true)));
}
/**
 * Intersperse stream with provided element.
 *
 * @ets_data_first intersperse_
 */


function intersperse(middle) {
  return self => intersperse_(self, middle);
}
//# sourceMappingURL=intersperse.js.map