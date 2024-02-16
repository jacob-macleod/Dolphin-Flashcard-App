import type * as C from "../core.js";
/**
 * Splits strings on a delimiter.
 */
export declare function splitOn_<R, E>(self: C.Stream<R, E, string>, delimiter: string): C.Stream<R, E, string>;
/**
 * Splits strings on a delimiter.
 *
 * @ets_data_first splitOn_
 */
export declare function splitOn(delimiter: string): <R, E>(self: C.Stream<R, E, string>) => C.Stream<R, E, string>;
//# sourceMappingURL=splitOn.d.ts.map