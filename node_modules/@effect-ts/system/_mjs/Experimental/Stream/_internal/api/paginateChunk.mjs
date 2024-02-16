import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Like `unfoldChunk`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */

export function paginateChunk(s, f) {
  const loop = s => {
    const {
      tuple: [as, o]
    } = f(s);
    return O.fold_(o, () => CH.zipRight_(CH.write(as), CH.end(undefined)), s => CH.zipRight_(CH.write(as), loop(s)));
  };

  return new C.Stream(loop(s));
}
//# sourceMappingURL=paginateChunk.mjs.map