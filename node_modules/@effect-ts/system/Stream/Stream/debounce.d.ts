import * as CL from "../../Clock/index.js";
import { Stream } from "./definitions.js";
export declare function debounce_<R, E, O>(self: Stream<R, E, O>, d: number): Stream<R & CL.HasClock, E, O>;
export declare function debounce(d: number): <R, E, O>(self: Stream<R, E, O>) => Stream<R & CL.HasClock, E, O>;
//# sourceMappingURL=debounce.d.ts.map