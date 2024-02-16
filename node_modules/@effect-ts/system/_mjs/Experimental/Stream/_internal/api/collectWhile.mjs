// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 */

export function collectWhile_(self, pf) {
  const loop = CH.readWith(_in => {
    const mapped = CK.collectWhile_(_in, pf);

    if (CK.size(mapped) === CK.size(_in)) {
      return CH.zipRight_(CH.write(mapped), loop);
    } else {
      return CH.write(mapped);
    }
  }, CH.fail, CH.succeed);
  return new C.Stream(self.channel[">>>"](loop));
}
/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 *
 * @ets_data_first collectWhile_
 */

export function collectWhile(pf) {
  return self => collectWhile_(self, pf);
}
//# sourceMappingURL=collectWhile.mjs.map