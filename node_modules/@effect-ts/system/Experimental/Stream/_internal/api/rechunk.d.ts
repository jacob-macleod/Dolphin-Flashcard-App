import * as C from "../core.js";
/**
 * Re-chunks the elements of the stream into chunks of
 * `n` elements each.
 * The last chunk might contain less than `n` elements
 */
export declare function rechunk_<R, E, A>(self: C.Stream<R, E, A>, n: number): C.Stream<R, E, A>;
/**
 * Re-chunks the elements of the stream into chunks of
 * `n` elements each.
 * The last chunk might contain less than `n` elements
 *
 * @ets_data_first rechunk_
 */
export declare function rechunk(n: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, A>;
//# sourceMappingURL=rechunk.d.ts.map