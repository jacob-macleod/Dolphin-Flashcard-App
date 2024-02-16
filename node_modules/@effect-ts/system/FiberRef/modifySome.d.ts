import * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { Option } from "../Option/index.js";
/**
 * Atomically modifies the `FiberRef` with the specified partial function, which computes
 * a return value for the modification if the function is defined in the current value
 * otherwise it returns a default value.
 * This is a more powerful version of `updateSome`.
 */
export declare function modifySome<B>(defaultValue: () => B): <A>(f: (a: A) => Option<Tp.Tuple<[B, A]>>) => <EA, EB>(fiberRef: import("./fiberRef.js").XFiberRef<EA, EB, A, A>) => import("./excl-effect.js").IO<EA | EB, B>;
//# sourceMappingURL=modifySome.d.ts.map