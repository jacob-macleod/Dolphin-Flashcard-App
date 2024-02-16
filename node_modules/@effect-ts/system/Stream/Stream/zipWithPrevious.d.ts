import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Zips each element with the previous element. Initially accompanied by `None`.
 */
export declare function zipWithPrevious<R, E, O>(self: Stream<R, E, O>): Stream<R, E, Tp.Tuple<[O.Option<O>, O]>>;
//# sourceMappingURL=zipWithPrevious.d.ts.map