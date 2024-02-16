import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Like `unfoldChunkEff`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */

export function paginateChunkEffect(s, f) {
  const loop = s => CH.unwrap(T.map_(f(s), ({
    tuple: [as, o]
  }) => O.fold_(o, () => CH.zipRight_(CH.write(as), CH.end(undefined)), s => CH.zipRight_(CH.write(as), loop(s)))));

  return new C.Stream(loop(s));
}
//# sourceMappingURL=paginateChunkEffect.mjs.map