import * as L from "../../Collections/Immutable/List/index.js";
import type * as AM from "../AssertionM/AssertionM.js";
export declare const AssertionMTypeId: unique symbol;
export declare class AssertionM {
    readonly assertion: AM.AssertionM<any>;
    readonly _typeId: typeof AssertionMTypeId;
    constructor(assertion: AM.AssertionM<any>);
    toString(): string;
}
export declare const ValueTypeId: unique symbol;
export declare class Value {
    readonly value: any;
    readonly _typeId: typeof ValueTypeId;
    constructor(value: any);
    toString(): string;
}
export declare type RenderParam = AssertionM | Value;
export declare const FunctionTypeId: unique symbol;
export declare class Function_ {
    readonly name: string;
    readonly paramLists: L.List<L.List<RenderParam>>;
    readonly _typeId: typeof FunctionTypeId;
    constructor(name: string, paramLists: L.List<L.List<RenderParam>>);
    toString(): string;
}
export declare const InfixTypeId: unique symbol;
export declare class Infix {
    readonly left: RenderParam;
    readonly op: string;
    readonly right: RenderParam;
    readonly _typeId: typeof InfixTypeId;
    constructor(left: RenderParam, op: string, right: RenderParam);
    toString(): string;
}
export declare type Render = Function_ | Infix;
//# sourceMappingURL=definition.d.ts.map