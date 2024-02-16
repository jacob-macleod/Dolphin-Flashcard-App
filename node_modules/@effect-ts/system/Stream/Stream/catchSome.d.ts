import * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some typed error.
 */
export declare function catchSome_<R, R1, E, E1, O, O1>(self: Stream<R, E, O>, f: (e: E) => O.Option<Stream<R1, E1, O1>>): Stream<R & R1, E | E1, O | O1>;
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails with some typed error.
 */
export declare function catchSome<R, R1, E, E1, O, O1>(f: (e: E) => O.Option<Stream<R1, E1, O1>>): <R_1>(self: Stream<R_1, E, O>) => Stream<R_1 & R1, E | E1, O | O1>;
//# sourceMappingURL=catchSome.d.ts.map