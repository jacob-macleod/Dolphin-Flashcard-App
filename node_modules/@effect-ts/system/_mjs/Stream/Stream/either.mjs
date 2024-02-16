// ets_tracing: off
import * as E from "../../Either/index.mjs";
import { catchAll_ } from "./catchAll.mjs";
import { map_ } from "./map.mjs";
import { succeed } from "./succeed.mjs";
/**
 * Returns a stream whose failures and successes have been lifted into an
 * `Either`. The resulting stream cannot fail, because the failures have
 * been exposed as part of the `Either` success case.
 *
 * @note the stream will end as soon as the first error occurs.
 */

export function either(self) {
  return catchAll_(map_(self, o => E.right(o)), e => succeed(E.left(e)));
}
//# sourceMappingURL=either.mjs.map