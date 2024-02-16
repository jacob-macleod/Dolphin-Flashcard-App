import type { _A, _E, _R } from "../../Utils/index.js";
import type { Stream } from "./definitions.js";
/**
 * Zips the specified streams together with the specified function.
 */
export declare function zipN<SN extends readonly Stream<any, any, any>[]>(...[s1, s2, ...streams]: SN & {
    readonly 0: Stream<any, any, any>;
    readonly 1: Stream<any, any, any>;
}): <O>(f: (...os: { [K in keyof SN]: _A<SN[K]>; }) => O) => Stream<_R<SN[number]>, _E<SN[number]>, O>;
//# sourceMappingURL=zipN.d.ts.map