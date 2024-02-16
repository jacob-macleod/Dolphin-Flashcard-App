import * as C from "../core.js";
/**
 * Intersperse stream with provided element.
 */
export declare function intersperse_<R, E, A, A1>(self: C.Stream<R, E, A>, middle: A1): C.Stream<R, E, A | A1>;
/**
 * Intersperse stream with provided element.
 *
 * @ets_data_first intersperse_
 */
export declare function intersperse<A1>(middle: A1): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A1 | A>;
//# sourceMappingURL=intersperse.d.ts.map