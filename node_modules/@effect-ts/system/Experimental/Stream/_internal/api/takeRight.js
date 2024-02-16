"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeRight = takeRight;
exports.takeRight_ = takeRight_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var RB = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Support/RingBufferNew/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var Empty = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./empty.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Takes the last specified number of elements from this stream.
 */
function takeRight_(self, n) {
  if (n <= 0) {
    return Empty.empty;
  }

  return new C.Stream(CH.unwrap(T.map_(T.bind_(T.do, "queue", () => T.succeedWith(() => new RB.RingBufferNew(n))), ({
    queue
  }) => {
    const reader = CH.readWith(in_ => {
      CK.forEach_(in_, _ => queue.put(_));
      return reader;
    }, _ => CH.fail(_), _ => CH.zipRight_(CH.write(queue.toChunk()), CH.unit));
    return self.channel[">>>"](reader);
  })));
}
/**
 * Takes the last specified number of elements from this stream.
 *
 * @ets_data_first takeRight_
 */


function takeRight(n) {
  return self => takeRight_(self, n);
}
//# sourceMappingURL=takeRight.js.map