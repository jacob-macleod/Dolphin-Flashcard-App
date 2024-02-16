import type { Managed } from "../managed.js";
/**
 * Suspends the creation of this effect
 */
export declare function suspend<R, E, A>(f: () => Managed<R, E, A>, __trace?: string): Managed<R, E, A>;
//# sourceMappingURL=suspend.d.ts.map