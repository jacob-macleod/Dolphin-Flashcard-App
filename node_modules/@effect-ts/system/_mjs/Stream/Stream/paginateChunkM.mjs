import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Like `unfoldChunkM`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */

export function paginateChunkM(s, f) {
  return new Stream(M.map_(M.bind_(M.do, "ref", () => T.toManaged(Ref.makeRef(O.some(s)))), ({
    ref
  }) => T.chain_(ref.get, O.fold(() => Pull.end, s => T.foldM_(f(s), Pull.fail, ({
    tuple: [as, s]
  }) => T.as_(ref.set(s), as))))));
}
//# sourceMappingURL=paginateChunkM.mjs.map