import type * as C from "../core.js";
/**
 * Returns this stream if the specified condition is satisfied, otherwise returns an empty stream.
 */
export declare function when_<R, E, A>(stream: C.Stream<R, E, A>, b: () => boolean): C.Stream<R, E, A>;
/**
 * Returns this stream if the specified condition is satisfied, otherwise returns an empty stream.
 *
 * @ets_data_first when_
 */
export declare function when(b: () => boolean): <R, E, A>(stream: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=when.d.ts.map