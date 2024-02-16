import type { Exit } from "../Exit/index.js";
import type { Scope } from "../Scope/index.js";
import type { Effect } from "./effect.js";
/**
 * Passes the fiber's scope to the specified function, which creates an effect
 * that will be returned from this method.
 */
export declare function scopeWith<R, E, A>(f: (scope: Scope<Exit<any, any>>) => Effect<R, E, A>, __trace?: string): Effect<R, E, A>;
//# sourceMappingURL=scopeWith.d.ts.map