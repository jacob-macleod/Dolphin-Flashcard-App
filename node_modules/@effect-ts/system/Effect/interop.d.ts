import * as Async from "../Async/index.js";
import * as IO from "../IO/index.js";
import type { Effect } from "./effect.js";
/**
 * Lift Async into Effect
 */
export declare function fromAsync<R, E, A>(async: Async.Async<R, E, A>, __trace?: string): Effect<R, E, A>;
/**
 * Lift IO into Effect
 */
export declare function fromIO<A>(io: IO.IO<A>, __trace?: string): Effect<unknown, never, A>;
//# sourceMappingURL=interop.d.ts.map