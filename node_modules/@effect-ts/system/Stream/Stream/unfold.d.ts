import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type * as O from "../../Option/index.js";
/**
 * Creates a stream by peeling off the "layers" of a value of type `S`
 */
export declare function unfold<S, A>(s: S, f: (s: S) => O.Option<Tp.Tuple<[A, S]>>): import("./definitions.js").Stream<unknown, never, A>;
//# sourceMappingURL=unfold.d.ts.map