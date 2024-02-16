import * as E from "../../Either/index.js";
import type { Stream } from "./definitions.js";
/**
 * Filters any `Right` values.
 */
export declare function collectRight<R, E, O, O1, L1>(self: Stream<R, E, E.Either<L1, O1>>): Stream<R, E, O1>;
//# sourceMappingURL=collectRight.d.ts.map