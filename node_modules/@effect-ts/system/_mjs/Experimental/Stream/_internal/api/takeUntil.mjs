// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Takes all elements of the stream until the specified predicate evaluates
 * to `true`.
 */

export function takeUntil_(self, f) {
  const loop = CH.readWith(chunk => {
    const taken = CK.takeWhile_(chunk, _ => !f(_));
    const last = CK.take_(CK.drop_(chunk, CK.size(taken)), 1);

    if (CK.isEmpty(last)) {
      return CH.zipRight_(CH.write(taken), loop);
    } else {
      return CH.write(CK.concat_(taken, last));
    }
  }, _ => CH.fail(_), _ => CH.succeed(_));
  return new C.Stream(self.channel[">>>"](loop));
}
/**
 * Takes all elements of the stream until the specified predicate evaluates
 * to `true`.
 *
 * @ets_data_first takeUntil_
 */

export function takeUntil(f) {
  return self => takeUntil_(self, f);
}
//# sourceMappingURL=takeUntil.mjs.map