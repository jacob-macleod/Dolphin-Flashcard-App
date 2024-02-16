import * as O from "@effect-ts/system/Option";
import type { Identity } from "../../Identity/index.js";
/**
 * `Apply` Identity
 *
 * | x       | y       | combine(y)(x)      |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 */
export declare function getApplyIdentity<A>(M: Identity<A>): Identity<O.Option<A>>;
//# sourceMappingURL=getApplyIdentity.d.ts.map