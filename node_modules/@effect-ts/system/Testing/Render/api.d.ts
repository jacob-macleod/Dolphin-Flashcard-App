import type * as L from "../../Collections/Immutable/List/index.js";
import * as AssertionM from "../AssertionM/AssertionM.js";
import * as R from "./definition.js";
/**
 * Creates a string representation of a class name.
 */
export declare function className(cons: new (...args: any[]) => any): string;
/**
 * Creates a string representation of a field accessor.
 */
export declare function field(name: string): string;
/**
 * Create a `Render` from an assertion combinator that should be rendered
 * using standard function notation.
 */
export declare function function_(name: string, paramLists: L.List<L.List<R.RenderParam>>): R.Render;
/**
 * Create a `Render` from an assertion combinator that should be rendered
 * using infix function notation.
 */
export declare function infix(left: R.RenderParam, op: string, right: R.RenderParam): R.Render;
/**
 * Construct a `RenderParam` from an `AssertionM`.
 */
export declare function param<A>(value: AssertionM.AssertionM<A> | A): R.RenderParam;
/**
 * Quote a string so it renders as a valid Scala string when rendered.
 */
export declare function quoted(str: string): string;
//# sourceMappingURL=api.d.ts.map