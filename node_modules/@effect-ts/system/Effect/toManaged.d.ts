import type { Managed } from "../Managed/managed.js";
import type { Effect } from "./effect.js";
/**
 * Converts this Effect to a Managed. This Effect and the provided release action
 * will be performed uninterruptibly.
 */
export declare function toManaged<A, R1, E1>(self: Effect<R1, E1, A>): Managed<R1, E1, A>;
/**
 * Converts this Effect to a Managed. This Effect and the provided release action
 * will be performed uninterruptibly.
 */
export declare function toManagedRelease_<A, R1, E1, R>(self: Effect<R1, E1, A>, release: (a: A) => Effect<R, never, any>): Managed<R1 & R, E1, A>;
/**
 * Converts this Effect to a Managed. This Effect and the provided release action
 * will be performed uninterruptibly.
 *
 * @ets_data_first toManagedRelease_
 */
export declare function toManagedRelease<R, A>(release: (a: A) => Effect<R, never, any>): <R1, E1>(self: Effect<R1, E1, A>) => Managed<R1 & R, E1, A>;
//# sourceMappingURL=toManaged.d.ts.map