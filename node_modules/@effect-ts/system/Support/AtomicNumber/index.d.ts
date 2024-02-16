import "../../Operator/index.js";
import { AtomicReference } from "../AtomicReference/index.js";
export declare class AtomicNumber extends AtomicReference<number> {
    constructor(n: number);
    incrementAndGet(): number;
    decrementAndGet(): number;
    getAndIncrement(): number;
}
//# sourceMappingURL=index.d.ts.map