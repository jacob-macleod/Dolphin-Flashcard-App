import type * as NEA from "../../Collections/Immutable/NonEmptyArray";
import type * as AV from "../AssertionValue/AssertionValue";
export declare const failureDetailsTypeId: unique symbol;
/**
 * `FailureDetails` keeps track of details relevant to failures.
 */
export declare class FailureDetails {
    readonly assertion: NEA.NonEmptyArray<AV.AssertionValue>;
    readonly typeId: typeof failureDetailsTypeId;
    constructor(assertion: NEA.NonEmptyArray<AV.AssertionValue>);
}
export declare function label_(self: FailureDetails, str: string): FailureDetails;
export declare function label(str: string): (self: FailureDetails) => FailureDetails;
//# sourceMappingURL=index.d.ts.map