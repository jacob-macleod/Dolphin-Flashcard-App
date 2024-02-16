import type { Has, Tag } from "../Has/index.js";
import * as L from "../Layer/core.js";
import type { Effect } from "./effect.js";
/**
 * Constructs a layer from this effect.
 */
export declare function toLayerRaw<R, E, A>(effect: Effect<R, E, A>): L.Layer<R, E, A>;
/**
 * Constructs a layer from this effect.
 */
export declare function toLayer<A>(tag: Tag<A>): <R, E>(effect: Effect<R, E, A>) => L.Layer<R, E, Has<A>>;
//# sourceMappingURL=toLayer.d.ts.map