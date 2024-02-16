import type { Has, Tag } from "../Has/index.js";
import type { Managed } from "../Managed/managed.js";
import type { Effect } from "./effect.js";
/**
 * Provides a managed to the given effect
 */
export declare function provideSomeManaged<R, E, A>(managed: Managed<R, E, A>): <R1, E1, A1>(self: Effect<R1 & A, E1, A1>) => Effect<R & R1, E | E1, A1>;
/**
 * Provides a managed to the given effect
 */
export declare function provideServiceManaged<A>(tag: Tag<A>): <R, E>(managed: Managed<R, E, A>) => <R1, E1, A1>(self: Effect<R1 & Has<A>, E1, A1>) => Effect<R & R1, E | E1, A1>;
//# sourceMappingURL=provideManaged.d.ts.map