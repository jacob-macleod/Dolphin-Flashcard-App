import type * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Filters any 'None' values.
 */
export declare function collectSome<R, E, O1>(self: Stream<R, E, O.Option<O1>>): Stream<R, E, O1>;
//# sourceMappingURL=collectSome.d.ts.map