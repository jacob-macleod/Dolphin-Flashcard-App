import type { Stream } from "./definitions.js";
/**
 * Statefully maps over the elements of this stream to produce all intermediate results
 * of type `S` given an initial S.
 */
export declare function scan<S>(s: S): <O>(f: (s: S, o: O) => S) => <R, E>(self: Stream<R, E, O>) => Stream<R, E, S>;
//# sourceMappingURL=scan.d.ts.map