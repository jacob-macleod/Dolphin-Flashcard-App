export interface CustomType<P extends string, V> {
    CustomType: {
        [p in P]: () => V;
    };
}
export declare type AccessCustom<C, P extends string, D = any> = C extends CustomType<P, infer V> ? V : D;
export declare type AccessCustomExtends<C, P extends string, D = any> = C extends CustomType<P, infer V> ? V extends D ? V : D : D;
//# sourceMappingURL=custom.d.ts.map