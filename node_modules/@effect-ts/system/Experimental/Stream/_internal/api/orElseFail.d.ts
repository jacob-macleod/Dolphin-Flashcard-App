import type * as C from "../core.js";
/**
 * Fails with given error in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */
export declare function orElseFail_<R, E, E1, A>(self: C.Stream<R, E, A>, e1: () => E1): C.Stream<R, E | E1, A>;
/**
 * Fails with given error in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 *
 * @ets_data_first orElseFail_
 */
export declare function orElseFail<E1>(e1: () => E1): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E1 | E, A>;
//# sourceMappingURL=orElseFail.d.ts.map