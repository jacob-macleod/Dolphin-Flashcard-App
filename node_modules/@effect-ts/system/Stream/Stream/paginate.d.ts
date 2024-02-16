import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type * as O from "../../Option/index.js";
import type { Stream } from "./definitions.js";
/**
 * Like `unfoldM`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */
export declare function paginate<S, A>(s: S, f: (s: S) => Tp.Tuple<[A, O.Option<S>]>): Stream<unknown, never, A>;
//# sourceMappingURL=paginate.d.ts.map