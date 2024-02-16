import type { Stream } from "./definitions.js";
/**
 * Converts this stream to a stream that executes its effects but emits no
 * elements. Useful for sequencing effects using streams:
 */
export declare function drain<R, E, O>(self: Stream<R, E, O>): Stream<R, E, never>;
//# sourceMappingURL=drain.d.ts.map