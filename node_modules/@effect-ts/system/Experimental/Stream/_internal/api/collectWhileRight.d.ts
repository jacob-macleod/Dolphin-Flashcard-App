import * as E from "../../../../Either/index.js";
import type * as C from "../core.js";
/**
 * Terminates the stream when encountering the first `Left`.
 */
export declare function collectWhileRight<R, E, A1, L1>(self: C.Stream<R, E, E.Either<L1, A1>>): C.Stream<R, E, A1>;
//# sourceMappingURL=collectWhileRight.d.ts.map