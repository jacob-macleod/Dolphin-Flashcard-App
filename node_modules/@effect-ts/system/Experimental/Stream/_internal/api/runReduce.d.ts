import * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Executes a pure fold over the stream of values - reduces all elements in the stream to a value of type `S`.
 */
export declare function runReduce_<R, E, A, S>(self: C.Stream<R, E, A>, s: S, f: (s: S, a: A) => S): T.Effect<R, E, S>;
/**
 * Executes a pure fold over the stream of values - reduces all elements in the stream to a value of type `S`.
 *
 * @ets_data_first runReduce_
 */
export declare function runReduce<A, S>(s: S, f: (s: S, a: A) => S): <R, E>(self: C.Stream<R, E, A>) => T.Effect<R, E, S>;
//# sourceMappingURL=runReduce.d.ts.map