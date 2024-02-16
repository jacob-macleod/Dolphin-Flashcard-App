import * as E from "../../../../Either/index.js";
import * as O from "../../../../Option/index.js";
import type * as C from "../core.js";
/**
 * Fails with the error `None` if value is `Left`.
 */
export declare function right<R, E, A1, A2>(self: C.Stream<R, E, E.Either<A1, A2>>): C.Stream<R, O.Option<E>, A2>;
//# sourceMappingURL=right.d.ts.map