// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import { Stream } from "./definitions.mjs";
/**
 * The infinite stream of iterative function application: a, f(a), f(f(a)), f(f(f(a))), ...
 */

export function iterate(a, f) {
  return new Stream(M.map_(T.toManaged(Ref.makeRef(a)), x => T.map_(Ref.getAndUpdate_(x, f), A.single)));
}
//# sourceMappingURL=iterate.mjs.map