import * as E from "../../Either/index.js";
import type { Stream } from "./definitions.js";
/**
 * Fails with given error 'e' if value is `Left`.
 */
export declare function rightOrFail_<R, E, E1, O1, O2>(self: Stream<R, E, E.Either<O1, O2>>, e: E1): Stream<R, E | E1, O2>;
/**
 * Fails with given error 'e' if value is `Left`.
 */
export declare function rightOrFail<E1>(e: E1): <R, E, O1, O2>(self: Stream<R, E, E.Either<O1, O2>>) => Stream<R, E1 | E, O2>;
//# sourceMappingURL=rightOrFail.d.ts.map