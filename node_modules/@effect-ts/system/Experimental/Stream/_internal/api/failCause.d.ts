import type * as CS from "../../../../Cause/index.js";
import type * as C from "../core.js";
/**
 * The stream that always fails with `cause`.
 */
export declare function failCause<E>(cause: CS.Cause<E>): C.IO<E, never>;
//# sourceMappingURL=failCause.d.ts.map