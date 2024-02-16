import type * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 */
export declare function runReduceManaged_<R, E, A, S>(self: C.Stream<R, E, A>, s: S, f: (s: S, a: A) => S): M.Managed<R, E, S>;
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 *
 * @ets_data_first runReduceManaged_
 */
export declare function runReduceManaged<A, S>(s: S, f: (s: S, a: A) => S): <R, E>(self: C.Stream<R, E, A>) => M.Managed<R, E, S>;
//# sourceMappingURL=runReduceManaged.d.ts.map