import type { FoldMapWithIndex } from "../FoldMapWithIndex/index.js";
import type { Auto, URIS } from "../HKT/index.js";
import type { ReduceRightWithIndex } from "../ReduceRightWithIndex/index.js";
import type { ReduceWithIndex } from "../ReduceWithIndex/index.js";
export declare type FoldableWithIndex<F extends URIS, C = Auto> = ReduceRightWithIndex<F, C> & ReduceWithIndex<F, C> & FoldMapWithIndex<F, C>;
//# sourceMappingURL=index.d.ts.map