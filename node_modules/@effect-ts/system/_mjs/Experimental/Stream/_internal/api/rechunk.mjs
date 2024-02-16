// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as L from "../../../../Collections/Immutable/List/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
import * as Unwrap from "./unwrap.mjs";

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


export function rechunk_(self, n) {
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

export function rechunk(n) {
  return self => rechunk_(self, n);
}
//# sourceMappingURL=rechunk.mjs.map