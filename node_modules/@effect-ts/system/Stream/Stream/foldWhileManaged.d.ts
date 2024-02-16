import type * as M from "../_internal/managed.js";
import type { Stream } from "./definitions.js";
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 * Stops the fold early when the condition is not fulfilled.
 */
export declare function foldWhileManaged<S>(s: S): (cont: (s: S) => boolean) => <O>(f: (s: S, o: O) => S) => <R, E>(self: Stream<R, E, O>) => M.Managed<R, E, S>;
//# sourceMappingURL=foldWhileManaged.d.ts.map