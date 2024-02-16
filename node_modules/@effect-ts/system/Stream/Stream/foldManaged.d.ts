import type * as M from "../_internal/managed.js";
import type { Stream } from "./definitions.js";
/**
 * Executes a pure fold over the stream of values.
 * Returns a Managed value that represents the scope of the stream.
 */
export declare function foldManaged<S>(s: S): <O>(f: (s: S, o: O) => S) => <R, E>(self: Stream<R, E, O>) => M.Managed<R, E, S>;
//# sourceMappingURL=foldManaged.d.ts.map