import type { Ordering } from "../Ordering/index.js";
import type { Bounded } from "./definition.js";
/**
 * Creates Bounded[A] from equals & compare functions
 */
export declare function makeBounded<A>(compare: (x: A, y: A) => Ordering, top: A, bottom: A): Bounded<A>;
//# sourceMappingURL=operations.d.ts.map