import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type { RIO } from "../managed.js";
/**
 * Returns an effectful function that merely swaps the elements in a `Tuple`.
 */
export declare function swap<A, B>(__trace?: string): RIO<Tp.Tuple<[A, B]>, Tp.Tuple<[B, A]>>;
//# sourceMappingURL=swap.d.ts.map