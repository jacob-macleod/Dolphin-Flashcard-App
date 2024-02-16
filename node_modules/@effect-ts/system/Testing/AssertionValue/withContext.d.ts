import type * as O from "../../Option/index.js";
import type { AssertionValue } from "./AssertionValue.js";
export declare function withContext_(self: AssertionValue, expr: O.Option<string>, sourceLocation: O.Option<string>): AssertionValue;
export declare function withContext(expr: O.Option<string>, sourceLocation: O.Option<string>): (self: AssertionValue) => AssertionValue;
//# sourceMappingURL=withContext.d.ts.map