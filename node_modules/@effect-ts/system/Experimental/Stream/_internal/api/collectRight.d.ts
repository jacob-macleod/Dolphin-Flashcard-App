import * as E from "../../../../Either/index.js";
import type * as C from "../core.js";
/**
 * Filters any `Left` values.
 */
export declare function collectRight<R, E, A, R1>(self: C.Stream<R, E, E.Either<A, R1>>): C.Stream<R, E, R1>;
//# sourceMappingURL=collectRight.d.ts.map