import * as E from "../../../../Either/index.js";
import type * as C from "../core.js";
/**
 * Terminates the stream when encountering the first `Right`.
 */
export declare function collectWhileLeft<R, E, A1, L1>(self: C.Stream<R, E, E.Either<L1, A1>>): C.Stream<R, E, L1>;
//# sourceMappingURL=collectWhileLeft.d.ts.map