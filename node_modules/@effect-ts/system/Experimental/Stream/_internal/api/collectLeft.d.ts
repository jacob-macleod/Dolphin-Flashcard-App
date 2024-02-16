import * as E from "../../../../Either/index.js";
import type * as C from "../core.js";
/**
 * Filters any `Right` values.
 */
export declare function collectLeft<R, E, L1, A>(self: C.Stream<R, E, E.Either<L1, A>>): C.Stream<R, E, L1>;
//# sourceMappingURL=collectLeft.d.ts.map