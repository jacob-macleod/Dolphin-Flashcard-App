import * as T from "../_internal/effect.js";
import * as M from "../_internal/managed.js";
import type { Stream } from "./definitions.js";
/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @param cont function which defines the early termination condition
 */
export declare function foldWhileManagedM<S>(s: S): (cont: (s: S) => boolean) => <O, R1, E1>(f: (s: S, o: O) => T.Effect<R1, E1, S>) => <R, E>(self: Stream<R, E, O>) => M.Managed<R & R1, E1 | E, S>;
//# sourceMappingURL=foldWhileManagedM.d.ts.map