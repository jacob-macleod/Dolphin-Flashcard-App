import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Takes all elements of the stream until the specified effectual predicate
 * evaluates to `true`.
 */
export declare function takeUntilM_<R, R1, E, E1, O>(self: Stream<R, E, O>, pred: (o: O) => T.Effect<R1, E1, boolean>): Stream<R1 & R, E | E1, O>;
/**
 * Takes all elements of the stream until the specified effectual predicate
 * evaluates to `true`.
 */
export declare function takeUntilM<R1, E1, O>(pred: (o: O) => T.Effect<R1, E1, boolean>): <R, E>(self: Stream<R, E, O>) => Stream<R1 & R, E1 | E, O>;
//# sourceMappingURL=takeUntilM.d.ts.map