"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropRight = dropRight;
exports.dropRight_ = dropRight_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var RB = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Support/RingBufferNew/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var Chain = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chain.js"));

var SucceedWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./succeedWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Drops the last specified number of elements from this stream.
 *
 * @note This combinator keeps `n` elements in memory. Be careful with big numbers.
 */
function dropRight_(self, n) {
  if (n <= 0) {
    return new C.Stream(self.channel);
  }

  return Chain.chain_(SucceedWith.succeedWith(() => new RB.RingBufferNew(n)), queue => {
    const reader = CH.readWith(in_ => {
      const outs = CK.collect_(in_, elem => {
        const head = queue.head();
        queue.put(elem);
        return head;
      });
      return CH.zipRight_(CH.write(outs), reader);
    }, _ => CH.fail(_), _ => CH.unit);
    return new C.Stream(self.channel[">>>"](reader));
  });
}
/**
 * Drops the last specified number of elements from this stream.
 *
 * @note This combinator keeps `n` elements in memory. Be careful with big numbers.
 *
 * @ets_data_first dropRight_
 */


function dropRight(n) {
  return self => dropRight_(self, n);
}
//# sourceMappingURL=dropRight.js.map