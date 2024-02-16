// ets_tracing: off
import * as E from "../../Either/index.mjs";
import { chain_ } from "./chain.mjs";
import { fail } from "./fail.mjs";
import { succeed } from "./succeed.mjs";
/**
 * Submerges the error case of an `Either` into the `Stream`.
 */

export function absolve(xs) {
  return chain_(xs, E.fold(fail, succeed));
}
//# sourceMappingURL=absolve.mjs.map