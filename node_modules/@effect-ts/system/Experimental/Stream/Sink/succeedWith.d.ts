import * as C from "./core.js";
/**
 * Returns a sink that executes a total effect and ends with its result.
 */
export declare function succeedWith<A>(effect: () => A): C.Sink<unknown, unknown, unknown, never, unknown, A>;
//# sourceMappingURL=succeedWith.d.ts.map