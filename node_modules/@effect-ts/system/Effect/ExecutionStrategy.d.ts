export declare type ExecutionStrategy = Sequential | Parallel | ParallelN;
export declare class Sequential {
    readonly _tag = "Sequential";
}
export declare class Parallel {
    readonly _tag = "Parallel";
}
export declare class ParallelN {
    readonly n: number;
    readonly _tag = "ParallelN";
    constructor(n: number);
}
/**
 * Sequential execution strategy
 */
export declare const sequential: ExecutionStrategy;
/**
 * Parallel execution strategy
 */
export declare const parallel: ExecutionStrategy;
/**
 * Parallel (up to N) execution strategy
 */
export declare function parallelN(n: number): ExecutionStrategy;
//# sourceMappingURL=ExecutionStrategy.d.ts.map