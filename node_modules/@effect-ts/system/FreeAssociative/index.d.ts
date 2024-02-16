import "../Operator/index.js";
import * as St from "../Structural/index.js";
declare const _brand: unique symbol;
export declare function isFreeAssociative(self: unknown): self is FreeAssociative<unknown>;
export declare class IEmpty {
    readonly _tag = "Empty";
    readonly [_brand]: symbol;
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare class IElement<A> {
    readonly element: A;
    readonly _tag = "Element";
    readonly [_brand]: symbol;
    constructor(element: A);
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare class IConcat<A> {
    readonly left: FreeAssociative<A>;
    readonly right: FreeAssociative<A>;
    readonly _tag = "Concat";
    readonly [_brand]: symbol;
    constructor(left: FreeAssociative<A>, right: FreeAssociative<A>);
}
export declare type FreeAssociative<A> = IEmpty | IElement<A> | IConcat<A>;
export declare function init<A>(): FreeAssociative<A>;
export declare function of<A>(a: A): FreeAssociative<A>;
export declare function concat<A>(r: FreeAssociative<A>): (l: FreeAssociative<A>) => FreeAssociative<A>;
export declare function concat_<A>(l: FreeAssociative<A>, r: FreeAssociative<A>): FreeAssociative<A>;
export declare function append<A>(a: A): (_: FreeAssociative<A>) => FreeAssociative<A>;
export declare function append_<A>(_: FreeAssociative<A>, a: A): FreeAssociative<A>;
export declare function prepend<A>(a: A): (_: FreeAssociative<A>) => FreeAssociative<A>;
export declare function prepend_<A>(_: FreeAssociative<A>, a: A): FreeAssociative<A>;
export declare function toArray<A>(_: FreeAssociative<A>): readonly A[];
export {};
//# sourceMappingURL=index.d.ts.map