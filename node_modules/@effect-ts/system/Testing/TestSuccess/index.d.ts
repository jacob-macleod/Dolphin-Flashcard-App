import type * as BA from "../BoolAlgebra/index.js";
export declare const SucceededTypeId: unique symbol;
export declare class Succeeded {
    readonly result: BA.BoolAlgebra<void>;
    readonly _typeId: typeof SucceededTypeId;
    constructor(result: BA.BoolAlgebra<void>);
}
export declare const IgnoredTypeId: unique symbol;
export declare class Ignored {
    readonly result: BA.BoolAlgebra<void>;
    readonly _typeId: typeof IgnoredTypeId;
    constructor(result: BA.BoolAlgebra<void>);
}
export declare type TestSuccess = Succeeded | Ignored;
//# sourceMappingURL=index.d.ts.map