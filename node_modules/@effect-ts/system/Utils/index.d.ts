import "../Operator/index.js";
import type { Tuple } from "../Collections/Immutable/Tuple/index.js";
import type { _A, _E, _R } from "../Effect/index.js";
import type { Either } from "../Either/core.js";
import type { Tag } from "../Has/index.js";
import type { Option } from "../Option/index.js";
import type { Sync } from "../Sync/index.js";
export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R;
export declare function intersect<AS extends unknown[] & {
    0: unknown;
}>(...as: AS): UnionToIntersection<{
    [k in keyof AS]: AS[k];
}[number]>;
export declare const pattern: <N extends string>(n: N) => {
    <X extends {
        [k in N]: string;
    }, K extends {
        [k in X[N]]: (_: Extract<X, {
            [_tag in N]: k;
        }>, __: Extract<X, {
            [_tag in N]: k;
        }>) => any;
    }>(_: K): (m: X) => ReturnType<K[keyof K]>;
    <X extends {
        [k in N]: string;
    }, K extends Partial<{
        [k in X[N]]: (_: Extract<X, {
            [_tag in N]: k;
        }>, __: Extract<X, {
            [_tag in N]: k;
        }>) => any;
    }>, H>(_: K & {
        [k in X[N]]?: (_: Extract<X, {
            [_tag in N]: k;
        }>, __: Extract<X, {
            [_tag in N]: k;
        }>) => any;
    }, __: (_: Exclude<X, {
        _tag: keyof K;
    }>, __: Exclude<X, {
        _tag: keyof K;
    }>) => H): (m: X) => {
        [k in keyof K]: ReturnType<NonNullable<K[k]>>;
    }[keyof K] | H;
};
export declare const matchTag: {
    <X extends {
        _tag: string;
    }, K extends { [k in X["_tag"]]: (_: Extract<X, {
        _tag: k;
    }>, __: Extract<X, {
        _tag: k;
    }>) => any; }>(_: K): (m: X) => ReturnType<K[keyof K]>;
    <X_1 extends {
        _tag: string;
    }, K_1 extends Partial<{ [k_1 in X_1["_tag"]]: (_: Extract<X_1, {
        _tag: k_1;
    }>, __: Extract<X_1, {
        _tag: k_1;
    }>) => any; }>, H>(_: K_1 & { [k_2 in X_1["_tag"]]?: ((_: Extract<X_1, {
        _tag: k_2;
    }>, __: Extract<X_1, {
        _tag: k_2;
    }>) => any) | undefined; }, __: (_: Exclude<X_1, {
        _tag: keyof K_1;
    }>, __: Exclude<X_1, {
        _tag: keyof K_1;
    }>) => H): (m: X_1) => H | { [k_3 in keyof K_1]: ReturnType<NonNullable<K_1[k_3]>>; }[keyof K_1];
};
export declare const pattern_: <N extends string>(n: N) => {
    <X extends {
        [k in N]: string;
    }, K extends {
        [k in X[N]]: (_: Extract<X, {
            [_tag in N]: k;
        }>, __: Extract<X, {
            [_tag in N]: k;
        }>) => any;
    }>(m: X, _: K): ReturnType<K[keyof K]>;
    <X extends {
        [k in N]: string;
    }, K extends Partial<{
        [k in X[N]]: (_: Extract<X, {
            [_tag in N]: k;
        }>, __: Extract<X, {
            [_tag in N]: k;
        }>) => any;
    }>, H>(m: X, _: K & {
        [k in X[N]]?: (_: Extract<X, {
            [_tag in N]: k;
        }>, __: Extract<X, {
            [_tag in N]: k;
        }>) => any;
    }, __: (_: Exclude<X, {
        _tag: keyof K;
    }>, __: Exclude<X, {
        _tag: keyof K;
    }>) => H): {
        [k in keyof K]: ReturnType<NonNullable<K[k]>>;
    }[keyof K] | H;
};
export declare const matchTag_: {
    <X extends {
        _tag: string;
    }, K extends { [k in X["_tag"]]: (_: Extract<X, {
        _tag: k;
    }>, __: Extract<X, {
        _tag: k;
    }>) => any; }>(m: X, _: K): ReturnType<K[keyof K]>;
    <X_1 extends {
        _tag: string;
    }, K_1 extends Partial<{ [k_1 in X_1["_tag"]]: (_: Extract<X_1, {
        _tag: k_1;
    }>, __: Extract<X_1, {
        _tag: k_1;
    }>) => any; }>, H>(m: X_1, _: K_1 & { [k_2 in X_1["_tag"]]?: ((_: Extract<X_1, {
        _tag: k_2;
    }>, __: Extract<X_1, {
        _tag: k_2;
    }>) => any) | undefined; }, __: (_: Exclude<X_1, {
        _tag: keyof K_1;
    }>, __: Exclude<X_1, {
        _tag: keyof K_1;
    }>) => H): H | { [k_3 in keyof K_1]: ReturnType<NonNullable<K_1[k_3]>>; }[keyof K_1];
};
export declare const patternFor: <N extends string>(n: N) => <X extends {
    [k in N]: string;
}>() => {
    <K extends {
        [k in X[N]]: (_: Extract<X, {
            [_tag in N]: k;
        }>, __: Extract<X, {
            [_tag in N]: k;
        }>) => any;
    }>(_: K): (m: X) => ReturnType<K[keyof K]>;
    <K extends Partial<{
        [k in X[N]]: (_: Extract<X, {
            [_tag in N]: k;
        }>, __: Extract<X, {
            [_tag in N]: k;
        }>) => any;
    }>, H>(_: K & {
        [k in X[N]]?: (_: Extract<X, {
            [_tag in N]: k;
        }>, __: Extract<X, {
            [_tag in N]: k;
        }>) => any;
    }, __: (_: Exclude<X, {
        _tag: keyof K;
    }>, __: Exclude<X, {
        _tag: keyof K;
    }>) => H): (m: X) => {
        [k in keyof K]: ReturnType<NonNullable<K[k]>>;
    }[keyof K] | H;
};
export declare const matchTagFor: <X extends {
    _tag: string;
}>() => {
    <K extends { [k in X["_tag"]]: (_: Extract<X, {
        _tag: k;
    }>, __: Extract<X, {
        _tag: k;
    }>) => any; }>(_: K): (m: X) => ReturnType<K[keyof K]>;
    <K_1 extends Partial<{ [k_1 in X["_tag"]]: (_: Extract<X, {
        _tag: k_1;
    }>, __: Extract<X, {
        _tag: k_1;
    }>) => any; }>, H>(_: K_1 & { [k_2 in X["_tag"]]?: ((_: Extract<X, {
        _tag: k_2;
    }>, __: Extract<X, {
        _tag: k_2;
    }>) => any) | undefined; }, __: (_: Exclude<X, {
        _tag: keyof K_1;
    }>, __: Exclude<X, {
        _tag: keyof K_1;
    }>) => H): (m: X) => H | { [k_3 in keyof K_1]: ReturnType<NonNullable<K_1[k_3]>>; }[keyof K_1];
};
export declare type RefinementWithIndex<I, A, B extends A> = (i: I, a: A) => a is B;
export declare type PredicateWithIndex<I, A> = (i: I, a: A) => boolean;
export declare type Erase<R, K> = R & K extends K & infer R1 ? R1 : R;
export declare type _A<T> = [T] extends [{
    [k in typeof _A]: () => infer A;
}] ? A : never;
export declare type _R<T> = [T] extends [{
    [k in typeof _R]: (_: infer R) => void;
}] ? R : never;
export declare type _E<T> = [T] extends [{
    [k in typeof _E]: () => infer E;
}] ? E : never;
export * from "./tool.js";
export declare function isEither(u: unknown): u is Either<unknown, unknown>;
export declare function isOption(u: unknown): u is Option<unknown>;
export declare function isTag(u: unknown): u is Tag<unknown>;
export declare function isSync(u: unknown): u is Sync<unknown, unknown, unknown>;
export declare function isAdtElement<A extends {
    _tag: string;
}, K extends A["_tag"]>(tag: K): (adt: A) => adt is Extract<A, {
    _tag: K;
}>;
export declare function isGenericAdtElement<T extends string>(_t: T): <A extends {
    [k in T]: string;
}, K extends A[T]>(tag: K) => (adt: A) => adt is Extract<A, {
    [k in T]: K;
}>;
export declare function onAdtElement<A extends {
    _tag: string;
}, K extends A["_tag"], B>(tag: K, f: (_: Extract<A, {
    _tag: K;
}>) => B): (adt: A) => Option<B>;
export declare function onGenericAdtElement<T extends string>(_t: T): <A extends { [k in T]: string; }, K extends A[T], B>(tag: K, f: (_: Extract<A, { [k_1 in T]: K; }>) => B) => (adt: A) => Option<B>;
export declare type ForcedTuple<A> = A extends unknown[] ? Tuple<A> : never;
export declare type ForcedArray<A> = A extends readonly any[] ? A : [];
export interface UnifiableIndexed<X> {
}
export * from "./lazy.js";
export * from "./union.js";
export * from "./equal.js";
export * from "./unification.js";
//# sourceMappingURL=index.d.ts.map