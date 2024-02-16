import * as E from "../../../../Either/index.js";
import type * as C from "../core.js";
/**
 * Fails with given error 'e' if value is `Left`.
 */
export declare function rightOrFail_<R, E, E1, A1, A2>(self: C.Stream<R, E, E.Either<A1, A2>>, e: () => E1): C.Stream<R, E | E1, A2>;
/**
 * Fails with given error 'e' if value is `Left`.
 *
 * @ets_data_first rightOrFail_
 */
export declare function rightOrFail<E1>(e: () => E1): <R, E, A1, A2>(self: C.Stream<R, E, E.Either<A1, A2>>) => C.Stream<R, E1 | E, A2>;
//# sourceMappingURL=rightOrFail.d.ts.map