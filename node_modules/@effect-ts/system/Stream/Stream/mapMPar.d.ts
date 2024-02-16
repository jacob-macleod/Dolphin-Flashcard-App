import * as T from "../_internal/effect.js";
import { Stream } from "./definitions.js";
/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. Transformed elements
 * will be emitted in the original order.
 */
export declare function mapMPar(n: number): <O, R1, E1, O1>(f: (o: O) => T.Effect<R1, E1, O1>) => <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O1>;
//# sourceMappingURL=mapMPar.d.ts.map