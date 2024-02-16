import type { Finalizer } from "./finalizer.js";
export declare class Running {
    readonly nextKey: number;
    readonly _finalizers: ReadonlyMap<number, Finalizer>;
    readonly _tag = "Running";
    constructor(nextKey: number, _finalizers: ReadonlyMap<number, Finalizer>);
    finalizers(): ReadonlyMap<number, Finalizer>;
}
//# sourceMappingURL=Running.d.ts.map