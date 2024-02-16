import type { Lazy } from "../../Function/index.js";
import * as ST from "../../Structural/index.js";
import type * as ARM from "../AssertionResultM/index.js";
import * as PR from "../Primitives/index.js";
import type * as R from "../Render/index.js";
/**
 * An `AssertionM[A]` is capable of producing assertion results on an `A`. As a
 * proposition, assertions compose using logical conjunction and disjunction,
 * and can be negated.
 */
export declare abstract class AssertionM<A> implements ST.HasEquals {
    readonly render: () => R.Render;
    readonly runM: (a: Lazy<A>) => ARM.AssertResultM;
    readonly [PR._A]: (_: A) => void;
    constructor(render: () => R.Render, runM: (a: Lazy<A>) => ARM.AssertResultM);
    get stringify(): string;
    toString(): string;
    [ST.equalsSym](that: unknown): boolean;
    get [ST.hashSym](): number;
}
export declare function isAssertionM(that: unknown): that is AssertionM<unknown>;
//# sourceMappingURL=AssertionM.d.ts.map