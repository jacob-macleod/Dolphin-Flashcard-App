import * as E from "../../Either/index.js";
import * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Fails with the error `None` if value is `Left`.
 */
export declare function right<R, E, O1, O2>(self: Stream<R, E, E.Either<O1, O2>>): Stream<R, O.None | O.Some<never> | O.Some<E>, O2>;
//# sourceMappingURL=right.d.ts.map