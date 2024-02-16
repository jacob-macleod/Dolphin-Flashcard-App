import type * as T from "../../Effect/index.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */
export declare function bracket_<R, E, A, X>(acquire: T.Effect<R, E, A>, release: (a: A) => T.Effect<R, never, X>): Stream<R, E, A>;
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */
export declare function bracket<R, A, X>(release: (a: A) => T.Effect<R, never, X>): <E>(acquire: T.Effect<R, E, A>) => Stream<R, E, A>;
//# sourceMappingURL=bracket.d.ts.map