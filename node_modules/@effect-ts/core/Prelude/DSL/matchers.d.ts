import type { Base, Infer, Kind, URIS } from "../HKT/index.js";
declare type KindFromObj<URI extends URIS, C, __> = Kind<URI, C, Infer<URI, C, "K", __>, Infer<URI, C, "Q", __>, Infer<URI, C, "W", __>, Infer<URI, C, "X", __>, Infer<URI, C, "I", __>, Infer<URI, C, "S", __>, Infer<URI, C, "R", __>, Infer<URI, C, "E", __>, Infer<URI, C, "A", __>>;
export interface MatchFn<URI extends URIS, C, N extends string> {
    <X extends {
        [tag in N]: string;
    }, K extends {
        [k in X[N]]: (_: Extract<X, {
            [tag in N]: k;
        }>, __: Extract<X, {
            [tag in N]: k;
        }>) => Kind<URI, C, any, any, any, any, any, any, any, any, any>;
    }>(matcher: K): (_: X) => KindFromObj<URI, C, {
        [k in keyof K]: ReturnType<K[k]>;
    }[keyof K]>;
    <X extends {
        [tag in N]: string;
    }, K extends Partial<{
        [k in X[N]]: (_: Extract<X, {
            [tag in N]: k;
        }>, __: Extract<X, {
            [tag in N]: k;
        }>) => Kind<URI, C, any, any, any, any, any, any, any, any, any>;
    }>, Ret extends Kind<URI, C, any, any, any, any, any, any, any, any, any>>(matcher: K, def: (_: Exclude<X, {
        [tag in N]: keyof K;
    }>, __: Exclude<X, {
        [tag in N]: keyof K;
    }>) => Ret): (_: X) => KindFromObj<URI, C, {
        [k in keyof K]: K[k] extends (...args: any) => any ? ReturnType<K[k]> : never;
    }[keyof K] | Ret>;
}
export interface MatchInFn<URI extends URIS, C, N extends string> {
    <X extends {
        [tag in N]: string;
    }>(): {
        <K extends {
            [k in X[N]]: (_: Extract<X, {
                [tag in N]: k;
            }>, __: Extract<X, {
                [tag in N]: k;
            }>) => Kind<URI, C, any, any, any, any, any, any, any, any, any>;
        }>(matcher: K): (_: X) => KindFromObj<URI, C, {
            [k in keyof K]: ReturnType<K[k]>;
        }[keyof K]>;
        <K extends Partial<{
            [k in X[N]]: (_: Extract<X, {
                [tag in N]: k;
            }>, __: Extract<X, {
                [tag in N]: k;
            }>) => Kind<URI, C, any, any, any, any, any, any, any, any, any>;
        }>, Ret extends Kind<URI, C, any, any, any, any, any, any, any, any, any>>(matcher: K, def: (_: Exclude<X, {
            [tag in N]: keyof K;
        }>, __: Exclude<X, {
            [tag in N]: keyof K;
        }>) => Ret): (_: X) => KindFromObj<URI, C, {
            [k in keyof K]: K[k] extends (...args: any) => any ? ReturnType<K[k]> : never;
        }[keyof K] | Ret>;
    };
}
export interface MatchMorphFn<URI extends URIS, C, N extends string, X extends {
    [tag in N]: string;
}> {
    <K extends {
        [k in X[N]]: (_: Extract<X, {
            [tag in N]: k;
        }>, __: Extract<X, {
            [tag in N]: k;
        }>) => Kind<URI, C, any, any, any, any, any, any, any, any, any>;
    }>(matcher: K): (_: X) => KindFromObj<URI, C, {
        [k in keyof K]: ReturnType<K[k]>;
    }[keyof K]>;
    <X extends {
        [tag in N]: string;
    }, K extends Partial<{
        [k in X[N]]: (_: Extract<X, {
            [tag in N]: k;
        }>, __: Extract<X, {
            [tag in N]: k;
        }>) => Kind<URI, C, any, any, any, any, any, any, any, any, any>;
    }>, Ret extends Kind<URI, C, any, any, any, any, any, any, any, any, any>>(matcher: K, def: (_: Exclude<X, {
        [tag in N]: keyof K;
    }>, __: Exclude<X, {
        [tag in N]: keyof K;
    }>) => Ret): (_: X) => KindFromObj<URI, C, {
        [k in keyof K]: K[k] extends (...args: any) => any ? ReturnType<K[k]> : never;
    }[keyof K] | Ret>;
}
export declare function matchers<URI extends URIS, C>(_: Base<URI, C>): {
    match: <N extends string>(tag: N) => MatchFn<URI, C, N>;
    matchTag: MatchFn<URI, C, "_tag">;
    matchIn: <N_1 extends string>(tag: N_1) => MatchInFn<URI, C, N_1>;
    matchTagIn: MatchInFn<URI, C, "_tag">;
    matchMorph: <N_2 extends string, X extends { [tag in N_2]: string; }>(MorphADT: {
        tag: N_2;
        _A: X;
    }) => MatchMorphFn<URI, C, N_2, X>;
};
export {};
//# sourceMappingURL=matchers.d.ts.map