import * as E from "../../Either/index.js";
import type { Stream } from "./definitions.js";
/**
 * Returns a stream whose failures and successes have been lifted into an
 * `Either`. The resulting stream cannot fail, because the failures have
 * been exposed as part of the `Either` success case.
 *
 * @note the stream will end as soon as the first error occurs.
 */
export declare function either<R, E, O>(self: Stream<R, E, O>): Stream<R, never, E.Either<E, O>>;
//# sourceMappingURL=either.d.ts.map