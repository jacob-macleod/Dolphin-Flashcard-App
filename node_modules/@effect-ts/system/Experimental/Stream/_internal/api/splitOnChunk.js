"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitOnChunk = splitOnChunk;
exports.splitOnChunk_ = splitOnChunk_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Performs a filter and map in a single step.
 */
function splitOnChunk_(self, delimiter) {
  const next = (leftover, delimiterIndex) => CH.readWithCause(inputChunk => {
    const buffer = CK.builder();
    const {
      tuple: [carry, delimiterCursor]
    } = CK.reduce_(inputChunk, Tp.tuple(O.getOrElse_(leftover, () => CK.empty()), delimiterIndex), ({
      tuple: [carry, delimiterCursor]
    }, a) => {
      const concatenated = CK.append_(carry, a);

      if (delimiterCursor < CK.size(delimiter) && a === CK.unsafeGet_(delimiter, delimiterCursor)) {
        if (delimiterCursor + 1 === CK.size(delimiter)) {
          buffer.append(CK.take_(concatenated, CK.size(concatenated) - CK.size(delimiter)));
          return Tp.tuple(CK.empty(), 0);
        } else {
          return Tp.tuple(concatenated, delimiterCursor + 1);
        }
      } else {
        return Tp.tuple(concatenated, a === CK.unsafeGet_(delimiter, 0) ? 1 : 0);
      }
    });
    return CH.zipRight_(CH.write(buffer.build()), next(!CK.isEmpty(carry) ? O.some(carry) : O.none, delimiterCursor));
  }, halt => O.fold_(leftover, () => CH.failCause(halt), chunk => CH.zipRight_(CH.write(CK.single(chunk)), CH.failCause(halt))), done => O.fold_(leftover, () => CH.succeed(done), chunk => CH.zipRight_(CH.write(CK.single(chunk)), CH.succeed(done))));

  return new C.Stream(self.channel[">>>"](next(O.none, 0)));
}
/**
 * Performs a filter and map in a single step.
 *
 * @ets_data_first splitOnChunk_
 */


function splitOnChunk(delimiter) {
  return self => splitOnChunk_(self, delimiter);
}
//# sourceMappingURL=splitOnChunk.js.map