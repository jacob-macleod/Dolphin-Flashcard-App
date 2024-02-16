import type { Managed } from "../managed.js";
/**
 * Lifts a synchronous effect that does not throw exceptions into a
 * `Managed<unknown, never, A>` with a release action. The acquire and
 * release actions will be performed uninterruptibly.
 */
export declare function makeSucceedWith<A, B>(acquire: () => A, release: (a: A) => B, __trace?: string): Managed<unknown, never, A>;
//# sourceMappingURL=makeSucceedWith.d.ts.map