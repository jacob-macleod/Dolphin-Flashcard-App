import * as Ex from "../../../../Exit/index.js";
import type * as C from "../core.js";
/**
 * Terminates the stream when encountering the first `Exit.Failure`.
 */
export declare function collectWhileSuccess<R, E, A1, L1>(self: C.Stream<R, E, Ex.Exit<L1, A1>>): C.Stream<R, E, A1>;
//# sourceMappingURL=collectWhileSuccess.d.ts.map