import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Maps over elements of the stream with the specified effectful function.
 */
export declare function mapM_<O, R, R1, E, E1, O1>(self: Stream<R, E, O>, f: (o: O) => T.Effect<R1, E1, O1>): Stream<R & R1, E | E1, O1>;
/**
 * Maps over elements of the stream with the specified effectful function.
 */
export declare function mapM<O, R1, E1, O1>(f: (o: O) => T.Effect<R1, E1, O1>): <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O1>;
//# sourceMappingURL=mapM.d.ts.map