import * as O from "@effect-ts/system/Option";
import type { Ord } from "../../Ord/index.js";
/**
 * The `Ord` instance allows `Option` values to be compared with
 * `compare`, whenever there is an `Ord` instance for
 * the type the `Option` contains.
 *
 * `None` is considered to be less than any `Some` value.
 */
export declare function getOrd<A>(_: Ord<A>): Ord<O.Option<A>>;
//# sourceMappingURL=getOrd.d.ts.map