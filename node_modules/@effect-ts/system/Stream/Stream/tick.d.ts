import type * as CL from "../../Clock/index.js";
import type { Stream } from "./definitions.js";
/**
 * A stream that emits Unit values spaced by the specified duration.
 */
export declare function tick(interval: number): Stream<CL.HasClock, never, void>;
//# sourceMappingURL=tick.d.ts.map