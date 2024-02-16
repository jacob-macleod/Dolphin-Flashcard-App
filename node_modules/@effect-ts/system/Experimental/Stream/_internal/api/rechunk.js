"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rechunk = rechunk;
exports.rechunk_ = rechunk_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/List/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var Unwrap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./unwrap.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class Rechunker {
  constructor(n) {
    this.n = n;
    this.builder = CK.builder();
    this.pos = 0;
  }

  write(elem) {
    this.builder.append(elem);
    this.pos += 1;

    if (this.pos === this.n) {
      const result = this.builder.build();
      this.builder = CK.builder();
      this.pos = 0;
      return result;
    }

    return null;
  }

  emitOfNotEmpty() {
    if (this.pos !== 0) {
      return CH.write(this.builder.build());
    } else {
      return CH.unit;
    }
  }

}
/**
 * Re-chunks the elements of the stream into chunks of
 * `n` elements each.
 * The last chunk might contain less than `n` elements
 */


function rechunk_(self, n) {
  return Unwrap.unwrap(T.succeedWith(() => {
    const rechunker = new Rechunker(n);
    const process = CH.readWithCause(chunk => {
      const chunkSize = CK.size(chunk);

      if (chunkSize > 0) {
        let chunks = L.empty();
        let result = null;
        let i = 0;

        while (i < chunkSize) {
          while (i < chunkSize && result === null) {
            result = rechunker.write(CK.unsafeGet_(chunk, i));
            i += 1;
          }

          if (result !== null) {
            chunks = L.prepend_(chunks, result);
            result = null;
          }
        }

        return CH.zipRight_(CH.writeAll(...L.toArray(L.reverse(chunks))), process);
      }

      return process;
    }, cause => CH.zipRight_(rechunker.emitOfNotEmpty(), CH.failCause(cause)), _ => rechunker.emitOfNotEmpty());
    return new C.Stream(self.channel[">>>"](process));
  }));
}
/**
 * Re-chunks the elements of the stream into chunks of
 * `n` elements each.
 * The last chunk might contain less than `n` elements
 *
 * @ets_data_first rechunk_
 */


function rechunk(n) {
  return self => rechunk_(self, n);
}
//# sourceMappingURL=rechunk.js.map