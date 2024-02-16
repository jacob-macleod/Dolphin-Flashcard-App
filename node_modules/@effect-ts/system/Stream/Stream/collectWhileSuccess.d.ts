import * as Ex from "../../Exit/index.js";
import type { Stream } from "./definitions.js";
/**
 * Terminates the stream when encountering the first `Exit.Failure`.
 */
export declare function collectWhileSuccess<R, E, O1, L1>(self: Stream<R, E, Ex.Exit<L1, O1>>): Stream<R, E, O1>;
//# sourceMappingURL=collectWhileSuccess.d.ts.map