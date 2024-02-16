import type * as HS from "../../../../Has/index.js";
import type * as C from "../core.js";
/**
 * Accesses the specified service in the environment of the stream in the
 * context of a stream.
 */
export declare function serviceWithStream<T>(s: HS.Tag<T>): <R, E, A>(f: (t: T) => C.Stream<R, E, A>) => C.Stream<HS.Has<T> & R, E, A>;
//# sourceMappingURL=serviceWithStream.d.ts.map