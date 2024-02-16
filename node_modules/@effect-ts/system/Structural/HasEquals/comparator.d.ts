import type { EqualityComparator } from "./utils.js";
declare type EqualityComparatorCreator = (fn: EqualityComparator) => EqualityComparator;
export declare function createComparator(createIsEqual?: EqualityComparatorCreator): EqualityComparator;
export {};
//# sourceMappingURL=comparator.d.ts.map