// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Returns a new stream that only emits elements that are not equal to the
 * previous element emitted, using the specified function to determine
 * whether two elements are equal.
 */

export function changesWith_(self, equal) {
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

export function changesWith(equal) {
  return self => changesWith_(self, equal);
}
//# sourceMappingURL=changesWith.mjs.map