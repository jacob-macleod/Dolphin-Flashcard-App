import type * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Creates a stream produced from a managed
 */
export declare function unwrapManaged<R0, E0, R, E, A>(self: M.Managed<R0, E0, C.Stream<R, E, A>>): C.Stream<R0 & R, E0 | E, A>;
//# sourceMappingURL=unwrapManaged.d.ts.map