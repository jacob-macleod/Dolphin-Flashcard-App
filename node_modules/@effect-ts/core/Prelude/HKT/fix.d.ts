import type { Auto } from "./base.js";
import type { V } from "./variance.js";
export declare type Param = "K" | "Q" | "W" | "I" | "X" | "S" | "R" | "E";
export interface Fix<P extends Param, F> {
    Fix: {
        [p in P]: {
            F: () => F;
        };
    };
}
export declare type OrFix<P extends Param, A, B> = A extends Fix<P, infer X> ? X : B;
export declare type CleanParam<C, P extends Param> = C extends (Auto | V<P, "_"> | V<P, "+"> | Fix<P, any>) & infer X ? X : C;
//# sourceMappingURL=fix.d.ts.map