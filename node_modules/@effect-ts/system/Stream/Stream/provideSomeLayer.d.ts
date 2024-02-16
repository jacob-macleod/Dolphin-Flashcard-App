import * as L from "../../Layer/index.js";
import type { Stream } from "./definitions.js";
/**
 * Provides a layer to the given effect
 */
export declare function provideSomeLayer<R, E, A>(layer: L.Layer<R, E, A>): <R1, E1, A1>(self: Stream<R1 & A, E1, A1>) => Stream<R & R1, E | E1, A1>;
/**
 * Provides a layer to the given effect
 */
export declare function provideLayer_<R, E, A, E1, A1>(self: Stream<A, E1, A1>, layer: L.Layer<R, E, A>): Stream<R, E | E1, A1>;
/**
 * Provides a layer to the given effect
 */
export declare function provideLayer<R, E, A>(layer: L.Layer<R, E, A>): <E1, A1>(self: Stream<A, E1, A1>) => Stream<R, E | E1, A1>;
//# sourceMappingURL=provideSomeLayer.d.ts.map