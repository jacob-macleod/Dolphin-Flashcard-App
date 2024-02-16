import * as core from "../core.js";
/**
 * Groups elements in chunks of up to n elements
 */
export declare function grouped_<A>(self: core.Chunk<A>, n: number): core.Chunk<core.Chunk<A>>;
/**
 * Groups elements in chunks of up to n elements
 *
 * @ets_data_first grouped_
 */
export declare function grouped(n: number): <A>(self: core.Chunk<A>) => core.Chunk<core.Chunk<A>>;
//# sourceMappingURL=grouped.d.ts.map