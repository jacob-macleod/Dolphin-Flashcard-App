import type * as CL from "../../../../Clock/index.js";
import * as T from "../../../../Effect/index.js";
import * as SC from "../../../../Schedule/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream from an effect producing a value of type `A`, which is repeated using the
 * specified schedule.
 */
export declare function repeatEffectWith<R, E, A>(effect: T.Effect<R, E, A>, schedule: SC.Schedule<R, A, any>): C.Stream<R & CL.HasClock, E, A>;
//# sourceMappingURL=repeatEffectWith.d.ts.map