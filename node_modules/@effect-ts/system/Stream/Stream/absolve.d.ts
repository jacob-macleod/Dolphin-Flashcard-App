import * as E from "../../Either/index.js";
import type { Stream } from "./definitions.js";
/**
 * Submerges the error case of an `Either` into the `Stream`.
 */
export declare function absolve<R, E, E2, O>(xs: Stream<R, E, E.Either<E2, O>>): Stream<R, E | E2, O>;
//# sourceMappingURL=absolve.d.ts.map