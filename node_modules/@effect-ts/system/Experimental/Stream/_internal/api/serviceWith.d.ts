import * as T from "../../../../Effect/index.js";
import type * as HS from "../../../../Has/index.js";
/**
 * Accesses the specified service in the environment of the stream in the
 * context of an effect.
 */
export declare function serviceWith<T>(s: HS.Tag<T>): <R, E, A>(f: (t: T) => T.Effect<R, E, A>) => import("../core.js").Stream<R & HS.Has<T>, E, A>;
//# sourceMappingURL=serviceWith.d.ts.map