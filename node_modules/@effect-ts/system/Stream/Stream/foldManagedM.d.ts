import type * as T from "../_internal/effect.js";
import type * as M from "../_internal/managed.js";
import type { Stream } from "./definitions.js";
/**
 * Executes an effectful fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 */
export declare function foldManagedM<S>(s: S): <O, R1, E1>(f: (s: S, o: O) => T.Effect<R1, E1, S>) => <R, E>(self: Stream<R, E, O>) => M.Managed<R & R1, E1 | E, S>;
//# sourceMappingURL=foldManagedM.d.ts.map