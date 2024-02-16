import * as C from "../core.js";
/**
 * Converts this stream to a stream that executes its effects but emits no
 * elements. Useful for sequencing effects using streams:
 */
export declare function drain<R, E, A>(self: C.Stream<R, E, A>): C.Stream<R, E, never>;
//# sourceMappingURL=drain.d.ts.map