// ets_tracing: off
import * as E from "../../../../Either/index.mjs";
import * as CatchAll from "./catchAll.mjs";
import * as Map from "./map.mjs";
import * as Succeed from "./succeed.mjs";
/**
 * Returns a stream whose failures and successes have been lifted into an
 * `Either`. The resulting stream cannot fail, because the failures have
 * been exposed as part of the `Either` success case.
 *
 * @note the stream will end as soon as the first error occurs.
 */

export function either(self) {
  return CatchAll.catchAll_(Map.map_(self, E.right), e => Succeed.succeed(E.left(e)));
}
//# sourceMappingURL=either.mjs.map