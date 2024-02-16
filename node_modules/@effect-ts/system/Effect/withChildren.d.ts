import * as SS from "../Collections/Immutable/SortedSet/index.js";
import type { Runtime } from "../Fiber/index.js";
import type { Effect, UIO } from "./effect.js";
/**
 * Locally installs a supervisor and an effect that succeeds with all the
 * children that have been forked in the returned effect.
 */
export declare function withChildren<R, E, A>(get: (_: UIO<SS.SortedSet<Runtime<any, any>>>) => Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=withChildren.d.ts.map