// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Takes all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */

export function takeWhile_(self, f) {
  const loop = CH.readWith(chunk => {
    const taken = CK.takeWhile_(chunk, f);
    const more = CK.size(taken) === CK.size(chunk);

    if (more) {
      return CH.zipRight_(CH.write(taken), loop);
    } else {
      return CH.write(taken);
    }
  }, _ => CH.fail(_), _ => CH.succeed(_));
  return new C.Stream(self.channel[">>>"](loop));
}
/**
 * Takes all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 *
 * @ets_data_first takeWhile_
 */

export function takeWhile(f) {
  return self => takeWhile_(self, f);
}
//# sourceMappingURL=takeWhile.mjs.map