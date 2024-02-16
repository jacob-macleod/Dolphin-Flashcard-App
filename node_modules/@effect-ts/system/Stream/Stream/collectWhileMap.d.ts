import type { Predicate, Refinement } from "../../Function/index.js";
import * as O from "../../Option/index.js";
import { Stream } from "./definitions.js";
/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 */
export declare function collectWhileMap_<R, E, O, O2>(self: Stream<R, E, O>, f: (o: O) => O.Option<O2>): Stream<R, E, O2>;
/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 */
export declare function collectWhileMap<O, O2>(f: (o: O) => O.Option<O2>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O2>;
/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 */
export declare function collectWhile_<R, E, O, O1 extends O>(self: Stream<R, E, O>, f: Refinement<O, O1>): Stream<R, E, O1>;
export declare function collectWhile_<R, E, O>(self: Stream<R, E, O>, f: Predicate<O>): Stream<R, E, O>;
/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 *
 * @ets_data_first collectWhile_
 */
export declare function collectWhile<O, O1 extends O>(f: Refinement<O, O1>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O1>;
export declare function collectWhile<O>(f: Predicate<O>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O>;
//# sourceMappingURL=collectWhileMap.d.ts.map