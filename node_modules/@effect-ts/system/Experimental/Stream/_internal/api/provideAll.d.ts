import * as C from "../core.js";
/**
 * Provides the stream with its required environment, which eliminates
 * its dependency on `R`.
 */
export declare function provideAll_<R, E, A>(self: C.Stream<R, E, A>, r: R): C.IO<E, A>;
/**
 * Provides the stream with its required environment, which eliminates
 * its dependency on `R`.
 *
 * @ets_data_first provideAll_
 */
export declare function provideAll<R>(r: R): <E, A>(self: C.Stream<R, E, A>) => C.IO<E, A>;
//# sourceMappingURL=provideAll.d.ts.map