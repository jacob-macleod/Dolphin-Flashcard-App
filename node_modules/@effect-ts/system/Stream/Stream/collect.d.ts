import * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Performs a filter and map in a single step.
 */
export declare function collect_<R, E, O, O1>(self: Stream<R, E, O>, f: (o: O) => O.Option<O1>): Stream<R, E, O1>;
/**
 * Performs a filter and map in a single step.
 */
export declare function collect<O, O1>(f: (o: O) => O.Option<O1>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O1>;
//# sourceMappingURL=collect.d.ts.map