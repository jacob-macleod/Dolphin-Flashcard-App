import type * as A from "../Assertion/index.js";
import type * as AR from "../AssertionResult/index.js";
export interface AssertionData {
    assertion: A.Assertion<any>;
    value: any;
}
export declare function makeAssertionData(assertion: A.Assertion<any>, value: any): AssertionData;
export declare function asFailure(ad: AssertionData): AR.AssertResult;
export declare function asSuccess(ad: AssertionData): AR.AssertResult;
//# sourceMappingURL=index.d.ts.map