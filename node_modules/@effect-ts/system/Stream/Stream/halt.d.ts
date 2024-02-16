import type * as C from "../../Cause/index.js";
import type { IO } from "./definitions.js";
/**
 * The stream that always halts with `cause`.
 */
export declare const halt: <E>(cause: C.Cause<E>) => IO<E, never>;
//# sourceMappingURL=halt.d.ts.map