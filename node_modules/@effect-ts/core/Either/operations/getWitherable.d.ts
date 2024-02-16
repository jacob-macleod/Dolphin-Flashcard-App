import type { Identity } from "../../Identity/index.js";
import * as P from "../../Prelude/index.js";
/**
 * Get `Witherable` instance given `Identity<E>`
 */
export declare function getWitherable<E>(M: Identity<E>): P.Witherable<[P.URI<"Either", {}>], P.Fix<"E", E>>;
//# sourceMappingURL=getWitherable.d.ts.map