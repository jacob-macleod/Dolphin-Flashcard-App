import * as O from "@effect-ts/system/Option";
import type { Associative } from "../../Associative/index.js";
/**
 * `Associative` returning the left-most non-`None` value
 *
 * | x       | y       | combine(y)(x) |
 * | ------- | ------- | ------------- |
 * | none    | none    | none          |
 * | some(a) | none    | some(a)       |
 * | none    | some(a) | some(a)       |
 * | some(a) | some(b) | some(a)       |
 */
export declare function getLastAssociative<A>(): Associative<O.Option<A>>;
//# sourceMappingURL=getLastAssociative.d.ts.map