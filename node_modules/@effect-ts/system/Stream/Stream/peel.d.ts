import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as M from "../_internal/managed.js";
import * as SK from "../Sink/index.js";
import type { Stream } from "./definitions.js";
/**
 * Peels off enough material from the stream to construct a `Z` using the
 * provided `Sink` and then returns both the `Z` and the rest of the
 * `Stream` in a managed resource. Like all `Managed` values, the provided
 * stream is valid only within the scope of `Managed`.
 */
export declare function peel_<R, R1, E, E1, O, Z>(self: Stream<R, E, O>, sink: SK.Sink<R1, E1, O, O, Z>): M.Managed<R & R1, E | E1, Tp.Tuple<[Z, Stream<R, E, O>]>>;
/**
 * Peels off enough material from the stream to construct a `Z` using the
 * provided `Sink` and then returns both the `Z` and the rest of the
 * `Stream` in a managed resource. Like all `Managed` values, the provided
 * stream is valid only within the scope of `Managed`.
 */
export declare function peel<R1, E1, O, Z>(sink: SK.Sink<R1, E1, O, O, Z>): <R, E>(self: Stream<R, E, O>) => M.Managed<R & R1, E1 | E, Tp.Tuple<[Z, Stream<R, E, O>]>>;
//# sourceMappingURL=peel.d.ts.map