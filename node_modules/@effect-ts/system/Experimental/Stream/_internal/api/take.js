"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.take = take;
exports.take_ = take_;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var Die = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./die.js"));

var Empty = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./empty.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function takeLoop(n) {
  return CH.readWith(i => {
    const taken = CK.take_(i, n);
    const left = Math.max(n - CK.size(taken), 0);

    if (left > 0) {
      return CH.chain_(CH.write(taken), () => takeLoop(left));
    } else {
      return CH.write(taken);
    }
  }, CH.fail, CH.end);
}
/**
 * Takes the specified number of elements from this stream.
 */


function take_(self, n) {
  if (n <= 0) {
    return Empty.empty;
  }

  if (!Number.isInteger(n)) {
    return Die.die(new CS.IllegalArgumentException(`${n} should be an integer`));
  }

  return new C.Stream(self.channel[">>>"](takeLoop(n)));
}
/**
 * Takes the specified number of elements from this stream.
 *
 * @ets_data_first take_
 */


function take(n) {
  return self => take_(self, n);
}
//# sourceMappingURL=take.js.map