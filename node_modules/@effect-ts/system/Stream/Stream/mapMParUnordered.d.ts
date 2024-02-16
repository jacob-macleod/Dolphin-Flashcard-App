import type * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. The element order
 * is not enforced by this combinator, and elements may be reordered.
 */
export declare function mapMParUnordered(n: number): <O, R1, E1, O2>(f: (o: O) => T.Effect<R1, E1, O2>) => <R, E>(self: Stream<R, E, O>) => Stream<R & R1, E1 | E, O2>;
//# sourceMappingURL=mapMParUnordered.d.ts.map