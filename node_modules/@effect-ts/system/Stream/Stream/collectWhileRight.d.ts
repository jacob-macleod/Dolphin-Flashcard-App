import * as E from "../../Either/index.js";
import type { Stream } from "./definitions.js";
/**
 * Terminates the stream when encountering the first `Left`.
 */
export declare function collectWhileRight<R, E, O1, L1>(self: Stream<R, E, E.Either<L1, O1>>): Stream<R, E, O1>;
//# sourceMappingURL=collectWhileRight.d.ts.map