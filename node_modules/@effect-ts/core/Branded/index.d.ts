import "../Operator/index.js";
export declare const _brand: unique symbol;
export interface Brand<B> {
    readonly [_brand]: B;
}
export declare type Branded<A, B> = A & Brand<B>;
/**
 * @ets_optimize identity
 */
export declare function makeBranded<T extends Branded<any, any>>(self: Omit<T, typeof _brand>): T;
//# sourceMappingURL=index.d.ts.map