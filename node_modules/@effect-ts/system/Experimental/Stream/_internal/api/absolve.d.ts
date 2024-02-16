import * as E from "../../../../Either/index.js";
import type * as C from "../core.js";
/**
 * Submerges the error case of an `Either` into the `Stream`.
 */
export declare function absolve<R, E, E2, A>(xs: C.Stream<R, E, E.Either<E2, A>>): C.Stream<R, E | E2, A>;
//# sourceMappingURL=absolve.d.ts.map