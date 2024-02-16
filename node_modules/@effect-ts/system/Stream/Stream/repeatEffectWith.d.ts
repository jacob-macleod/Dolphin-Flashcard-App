import type * as CL from "../../Clock/index.js";
import * as SC from "../../Schedule/index.js";
import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from an effect producing a value of type `A`, which is repeated using the
 * specified schedule.
 */
export declare function repeatEffectWith<R, R1, E, A extends A1, A1, X>(effect: T.Effect<R, E, A>, schedule: SC.Schedule<R1, A1, X>): Stream<R & R1 & CL.HasClock, E, A>;
//# sourceMappingURL=repeatEffectWith.d.ts.map