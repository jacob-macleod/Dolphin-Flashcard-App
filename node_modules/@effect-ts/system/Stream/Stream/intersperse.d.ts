import { Stream } from "./definitions.js";
/**
 * Intersperse stream with provided element similar to <code>List.mkString</code>.
 */
export declare function intersperse_<R, E, O, O1>(self: Stream<R, E, O>, middle: O1): Stream<R, E, O | O1>;
/**
 * Intersperse stream with provided element similar to <code>List.mkString</code>.
 */
export declare function intersperse<O1>(middle: O1): <R, E, O>(self: Stream<R, E, O>) => Stream<R, E, O1 | O>;
//# sourceMappingURL=intersperse.d.ts.map