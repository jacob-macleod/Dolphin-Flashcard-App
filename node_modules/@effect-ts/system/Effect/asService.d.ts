import type { Tag } from "../Has/index.js";
import type { Effect } from "./effect.js";
/**
 * Maps the success value of this effect to a service.
 *
 * @datFirst asService_
 */
export declare function asService<A>(has: Tag<A>, __trace?: string): <R, E>(fa: Effect<R, E, A>) => Effect<R, E, import("../Has/index.js").Has<A>>;
/**
 * Maps the success value of this effect to a service.
 */
export declare function asService_<R, E, A>(fa: Effect<R, E, A>, tag: Tag<A>, __trace?: string): Effect<R, E, import("../Has/index.js").Has<A>>;
//# sourceMappingURL=asService.d.ts.map