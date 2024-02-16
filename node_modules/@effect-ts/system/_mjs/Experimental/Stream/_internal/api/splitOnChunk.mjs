// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Performs a filter and map in a single step.
 */

export function splitOnChunk_(self, delimiter) {
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

export function splitOnChunk(delimiter) {
  return self => splitOnChunk_(self, delimiter);
}
//# sourceMappingURL=splitOnChunk.mjs.map