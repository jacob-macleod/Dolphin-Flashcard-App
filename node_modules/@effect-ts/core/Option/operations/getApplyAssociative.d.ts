import * as O from "@effect-ts/system/Option";
import type { Associative } from "../../Associative/index.js";
/**
 * `Apply` Associative
 *
 * | x       | y       | combine(y)(x)      |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 */
export declare function getApplyAssociative<A>(S: Associative<A>): Associative<O.Option<A>>;
//# sourceMappingURL=getApplyAssociative.d.ts.map