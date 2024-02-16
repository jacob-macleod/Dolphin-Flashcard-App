import * as O from "@effect-ts/system/Option";
import type { Identity } from "../../Identity/index.js";
/**
 * `Identity` returning the left-most non-`None` value
 *
 * | x       | y       | combine(y)(x) |
 * | ------- | ------- | ------------- |
 * | none    | none    | none          |
 * | some(a) | none    | some(a)       |
 * | none    | some(a) | some(a)       |
 * | some(a) | some(b) | some(a)       |
 */
export declare function getFirstIdentity<A>(): Identity<O.Option<A>>;
//# sourceMappingURL=getFirstIdentity.d.ts.map