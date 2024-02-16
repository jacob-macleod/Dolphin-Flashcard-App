import * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Executes an effectful fold over the stream of values.
 */
export declare function foldM<S>(s: S): <O, R1, E1>(f: (s: S, o: O) => T.Effect<R1, E1, S>) => <R, E>(self: Stream<R, E, O>) => T.Effect<R & R1, E1 | E, S>;
//# sourceMappingURL=foldM.d.ts.map