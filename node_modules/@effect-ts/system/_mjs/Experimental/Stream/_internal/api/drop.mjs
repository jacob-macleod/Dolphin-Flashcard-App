// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Drops the specified number of elements from this stream.
 */

export function drop_(self, n) {
  const loop = r => CH.readWith(_in => {
    const dropped = CK.drop_(_in, r);
    const leftover = Math.max(r - CK.size(_in), 0);
    const more = CK.isEmpty(_in) || leftover > 0;

    if (more) {
      return loop(leftover);
    } else {
      return CH.zipRight_(CH.write(dropped), CH.identity());
    }
  }, e => CH.fail(e), _ => CH.unit);

  return new C.Stream(self.channel[">>>"](loop(n)));
}
/**
 * Drops the specified number of elements from this stream.
 *
 * @ets_data_first drop_
 */

export function drop(n) {
  return self => drop_(self, n);
}
//# sourceMappingURL=drop.mjs.map