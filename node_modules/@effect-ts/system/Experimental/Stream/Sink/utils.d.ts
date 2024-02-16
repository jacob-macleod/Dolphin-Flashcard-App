export declare const _R: unique symbol;
export declare type _R<T> = [T] extends [{
    [k in typeof _R]: (_: infer R) => void;
}] ? R : never;
export declare const _InErr: unique symbol;
export declare type _InErr<T> = [T] extends [{
    [k in typeof _InErr]: (_: infer InErr) => void;
}] ? InErr : never;
export declare const _In: unique symbol;
export declare type _In<T> = [T] extends [{
    [k in typeof _In]: (_: infer In) => void;
}] ? In : never;
export declare const _OutErr: unique symbol;
export declare type _OutErr<T> = [T] extends [{
    [k in typeof _L]: () => infer OutErr;
}] ? OutErr : never;
export declare const _L: unique symbol;
export declare type _L<T> = [T] extends [{
    [k in typeof _L]: () => infer L;
}] ? L : never;
export declare const _Z: unique symbol;
export declare type _Z<T> = [T] extends [{
    [k in typeof _Z]: () => infer Z;
}] ? Z : never;
//# sourceMappingURL=utils.d.ts.map