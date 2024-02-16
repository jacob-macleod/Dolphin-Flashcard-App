// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * A sink that executes the provided effectful function for every element fed to it
 * until `f` evaluates to `false`.
 */

export function forEachWhile(f) {
  const go = (chunk, idx, len, cont) => {
    if (idx === len) {
      return cont;
    } else {
      return CH.catchAll_(CH.chain_(CH.fromEffect(f(CK.unsafeGet_(chunk, idx))), b => {
        if (b) {
          return go(chunk, idx + 1, len, cont);
        } else {
          return CH.write(CK.drop_(chunk, idx));
        }
      }), e => CH.zipRight_(CH.write(CK.drop_(chunk, idx)), CH.fail(e)));
    }
  };

  const process = CH.readWithCause(_in => go(_in, 0, CK.size(_in), process), halt => CH.failCause(halt), _ => CH.end(undefined));
  return new C.Sink(process);
}
//# sourceMappingURL=forEachWhile.mjs.map