import type { _A, _E, _R } from "../../Utils/index.js";
import type { Stream } from "./definitions.js";
/**
 * Composes the specified streams to create a cartesian product of elements
 * with a specified function. Subsequent streams would be run multiple times,
 * for every combination of elements in the prior streams.
 *
 * See also `Stream#zipN` for the more common point-wise variant.
 */
export declare function crossN<SN extends readonly Stream<any, any, any>[]>(...[s1, s2, ...streams]: SN & {
    readonly 0: Stream<any, any, any>;
    readonly 1: Stream<any, any, any>;
}): <O>(f: (...os: { [k in keyof SN]: _A<SN[k]>; }) => O) => Stream<_R<SN[number]>, _E<SN[number]>, O>;
//# sourceMappingURL=crossN.d.ts.map