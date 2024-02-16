import type * as AM from "../AssertionM/AssertionM.js";
import type * as AR from "../AssertionResult/index.js";
import type * as ARM from "../AssertionResultM/index.js";
export interface AssertionMData {
    assertion: AM.AssertionM<any>;
    value: any;
}
export declare function makeAssertionMData(assertion: AM.AssertionM<any>, value: any): AssertionMData;
export declare function asFailure(amd: AssertionMData): AR.AssertResult;
export declare function asSuccess(amd: AssertionMData): AR.AssertResult;
export declare function asFailureM(amd: AssertionMData): ARM.AssertResultM;
export declare function asSuccessM(amd: AssertionMData): ARM.AssertResultM;
//# sourceMappingURL=index.d.ts.map