import type * as M from "../_internal/managed.js";
import type { Stream } from "./definitions.js";
/**
 * Creates a stream produced from a [[ZManaged]]
 */
export declare function unwrapManaged<R, E, A>(fa: M.Managed<R, E, Stream<R, E, A>>): Stream<R, E, A>;
//# sourceMappingURL=unwrapManaged.d.ts.map