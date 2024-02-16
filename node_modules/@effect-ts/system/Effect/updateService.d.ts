import type { Has, Tag } from "../Has/index.js";
import type { Effect } from "./effect.js";
/**
 * Updates a service in the environment of this effect.
 */
export declare function updateService_<T, R, E, A>(self: Effect<R, E, A>, tag: Tag<T>, f: (_: T) => T, __trace?: string): Effect<R & Has<T>, E, A>;
/**
 * Updates a service in the environment of this effect.
 *
 * @ets_data_first updateService_
 */
export declare function updateService<T>(tag: Tag<T>, f: (_: T) => T, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R & Has<T>, E, A>;
//# sourceMappingURL=updateService.d.ts.map