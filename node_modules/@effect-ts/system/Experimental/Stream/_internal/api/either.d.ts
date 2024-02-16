import * as E from "../../../../Either/index.js";
import type * as C from "../core.js";
/**
 * Returns a stream whose failures and successes have been lifted into an
 * `Either`. The resulting stream cannot fail, because the failures have
 * been exposed as part of the `Either` success case.
 *
 * @note the stream will end as soon as the first error occurs.
 */
export declare function either<R, E, A>(self: C.Stream<R, E, A>): C.RIO<R, E.Either<E, A>>;
//# sourceMappingURL=either.d.ts.map