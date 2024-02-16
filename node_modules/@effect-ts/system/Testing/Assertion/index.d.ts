import type { Lazy } from "../../Function/index.js";
import * as O from "../../Option/index.js";
import * as ST from "../../Structural/index.js";
import * as AD from "../AssertionData/index.js";
import type * as AssertionM from "../AssertionM/AssertionM.js";
import type * as AR from "../AssertionResult/index.js";
import type * as ARM from "../AssertionResultM/index.js";
import * as PR from "../Primitives/index.js";
import * as R from "../Render/index.js";
export declare class Assertion<A> implements AssertionM.AssertionM<A> {
    readonly render: () => R.Render;
    readonly run: (a: Lazy<A>) => AR.AssertResult;
    readonly [PR._A]: (_: A) => void;
    constructor(render: () => R.Render, run: (a: Lazy<A>) => AR.AssertResult);
    runM(a: Lazy<A>): ARM.AssertResultM;
    get stringify(): string;
    toString(): string;
    [ST.equalsSym](that: unknown): boolean;
    get [ST.hashSym](): number;
}
export declare function isAssertion(that: unknown): that is Assertion<any>;
export declare function makeAssertion(name: string, ...params: R.RenderParam[]): <A>(run: (a: Lazy<A>) => boolean) => Assertion<A>;
export declare function makeAssertionDirect(name: string, ...params: R.RenderParam[]): <A>(run: (a: Lazy<A>) => AR.AssertResult) => Assertion<A>;
export declare const isFalse: Assertion<boolean>;
export declare const isEmptyString: Assertion<string>;
export declare function equalTo<A>(expected: A): Assertion<A>;
export declare function makeAssertionRec(name: string, ...params: R.RenderParam[]): <B>(assertion: Assertion<B>) => <A>(get: (a: Lazy<A>) => O.Option<B>, orElse?: (ad: AD.AssertionData) => AR.AssertResult) => Assertion<A>;
export declare function hasProperty<A, B>(name: string, proj: (a: A) => B, assertion: Assertion<B>): Assertion<A>;
export declare function and<A>(self: Assertion<A>, that: Assertion<A>): Assertion<A>;
export declare function or<A>(self: Assertion<A>, that: Assertion<A>): Assertion<A>;
//# sourceMappingURL=index.d.ts.map