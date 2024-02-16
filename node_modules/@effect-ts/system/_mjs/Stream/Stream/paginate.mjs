import * as T from "../_internal/effect.mjs";
import { paginateM } from "./paginateM.mjs";
/**
 * Like `unfoldM`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */

export function paginate(s, f) {
  return paginateM(s)(s => T.succeed(f(s)));
}
//# sourceMappingURL=paginate.mjs.map