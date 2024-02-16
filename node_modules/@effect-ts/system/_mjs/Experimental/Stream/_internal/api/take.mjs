// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
import * as Die from "./die.mjs";
import * as Empty from "./empty.mjs";

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


export function take_(self, n) {
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

export function take(n) {
  return self => take_(self, n);
}
//# sourceMappingURL=take.mjs.map