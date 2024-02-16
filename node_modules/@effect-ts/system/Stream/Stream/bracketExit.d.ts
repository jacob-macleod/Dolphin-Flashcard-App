import type * as Ex from "../../Exit/index.js";
import type * as T from "../_internal/effect.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */
export declare function bracketExit_<R, E, A, X>(acquire: T.Effect<R, E, A>, release: (a: A, exit: Ex.Exit<any, any>) => T.Effect<R, never, X>): Stream<R, E, A>;
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */
export declare function bracketExit<R, A, X>(release: (a: A, exit: Ex.Exit<any, any>) => T.Effect<R, never, X>): <E>(acquire: T.Effect<R, E, A>) => Stream<R, E, A>;
//# sourceMappingURL=bracketExit.d.ts.map