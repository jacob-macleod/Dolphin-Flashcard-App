import * as T from "../../Effect/index.js";
import type { Lazy } from "../../Function/index.js";
import * as O from "../../Option/index.js";
import * as AMD from "../AssertionMData/index.js";
import type * as ARM from "../AssertionResultM/index.js";
import * as R from "../Render/index.js";
import { AssertionM } from "./AssertionM.js";
/**
 * Returns a new assertion that succeeds only if both assertions succeed.
 */
export declare function and<A>(self: AssertionM<A>, that: Lazy<AssertionM<A>>): AssertionM<A>;
/**
 * Returns a new assertion that succeeds if either assertion succeeds.
 */
export declare function or<A>(self: AssertionM<A>, that: Lazy<AssertionM<A>>): AssertionM<A>;
/**
 * Labels this assertion with the specified string.
 */
export declare function label_<A>(self: AssertionM<A>, str: string): AssertionM<A>;
/**
 * Labels this assertion with the specified string.
 */
export declare function label(str: string): <A>(self: AssertionM<A>) => AssertionM<A>;
/**
 * Makes a new `AssertionM` from a pretty-printing and a function.
 */
export declare function makeAssertionDirect(name: string, ...params: R.RenderParam[]): <A>(run: (a: Lazy<A>) => ARM.AssertResultM) => AssertionM<A>;
/**
 * Makes a new `AssertionM` from a pretty-printing and a function.
 */
export declare function makeAssertionM(name: string, ...params: R.RenderParam[]): <A>(run: (a: Lazy<A>) => T.UIO<boolean>) => AssertionM<A>;
/**
 * Makes a new `AssertionM` from a pretty-printing and a function.
 */
export declare function makeAssertionRecM(name: string, ...params: R.RenderParam[]): <B>(assertion: AssertionM<B>) => <A>(get: (a: Lazy<A>) => T.Effect<unknown, never, O.Option<B>>, orElse?: (amd: AMD.AssertionMData) => ARM.AssertResultM) => AssertionM<A>;
/**
 * Makes a new assertion that negates the specified assertion.
 */
export declare function not<A>(assertion: AssertionM<A>): AssertionM<A>;
//# sourceMappingURL=api.d.ts.map