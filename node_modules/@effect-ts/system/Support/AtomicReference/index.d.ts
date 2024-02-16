import "../../Operator/index.js";
export declare class AtomicReference<A> {
    readonly initial: A;
    private current;
    constructor(initial: A);
    get get(): A;
    getAndSet(value: A): A;
    set(value: A): void;
    compareAndSet(old: A, value: A): boolean;
}
//# sourceMappingURL=index.d.ts.map