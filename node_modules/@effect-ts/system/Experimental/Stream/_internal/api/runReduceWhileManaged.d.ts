import type { Predicate } from "../../../../Function/index.js";
import type * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 * Stops the fold early when the condition is not fulfilled.
 */
export declare function runReduceWhileManaged_<S, R, E, A>(self: C.Stream<R, E, A>, s: S, cont: Predicate<S>, f: (s: S, a: A) => S): M.Managed<R, E, S>;
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @ets_data_first runFoldWhileManaged_
 */
export declare function runReduceWhileManaged<S, A>(s: S, cont: Predicate<S>, f: (s: S, a: A) => S): <R, E>(self: C.Stream<R, E, A>) => M.Managed<R, E, S>;
//# sourceMappingURL=runReduceWhileManaged.d.ts.map