import type { _E, _R, EnforceNonEmptyRecord } from "../Utils/index.js";
import type { Managed } from "./managed.js";
export declare function struct<NER extends Record<string, Managed<any, any, any>>>(r: EnforceNonEmptyRecord<NER> & Record<string, Managed<any, any, any>>, __trace?: string): Managed<_R<NER[keyof NER]>, _E<NER[keyof NER]>, {
    [K in keyof NER]: [NER[K]] extends [Managed<any, any, infer A>] ? A : never;
}>;
export declare function structPar<NER extends Record<string, Managed<any, any, any>>>(r: EnforceNonEmptyRecord<NER> & Record<string, Managed<any, any, any>>, __trace?: string): Managed<_R<NER[keyof NER]>, _E<NER[keyof NER]>, {
    [K in keyof NER]: [NER[K]] extends [Managed<any, any, infer A>] ? A : never;
}>;
/**
 * @ets_data_first structParN_
 */
export declare function structParN(n: number, __trace?: string): <NER extends Record<string, Managed<any, any, any>>>(r: EnforceNonEmptyRecord<NER> & Record<string, Managed<any, any, any>>) => Managed<_R<NER[keyof NER]>, _E<NER[keyof NER]>, {
    [K in keyof NER]: [NER[K]] extends [Managed<any, any, infer A>] ? A : never;
}>;
export declare function structParN_<NER extends Record<string, Managed<any, any, any>>>(r: EnforceNonEmptyRecord<NER> & Record<string, Managed<any, any, any>>, n: number, __trace?: string): Managed<_R<NER[keyof NER]>, _E<NER[keyof NER]>, {
    [K in keyof NER]: [NER[K]] extends [Managed<any, any, infer A>] ? A : never;
}>;
/**
 * @ets_data_first bindAll_
 */
export declare function bindAll<K, NER extends Record<string, Managed<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}>(r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Managed<any, any, any>>, __trace?: string): <R, E>(s: Managed<R, E, K>) => Managed<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Managed<any, any, infer A>] ? A : never;
}>;
export declare function bindAll_<K, NER extends Record<string, Managed<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}, R, E>(s: Managed<R, E, K>, r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Managed<any, any, any>>, __trace?: string): Managed<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Managed<any, any, infer A>] ? A : never;
}>;
/**
 * @ets_data_first bindAllPar_
 */
export declare function bindAllPar<K, NER extends Record<string, Managed<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}>(r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Managed<any, any, any>>, __trace?: string): <R, E>(s: Managed<R, E, K>) => Managed<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Managed<any, any, infer A>] ? A : never;
}>;
export declare function bindAllPar_<K, NER extends Record<string, Managed<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}, R, E>(s: Managed<R, E, K>, r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Managed<any, any, any>>, __trace?: string): Managed<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Managed<any, any, infer A>] ? A : never;
}>;
/**
 * @ets_data_first bindAllParN_
 */
export declare function bindAllParN<K, NER extends Record<string, Managed<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}>(n: number, r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Managed<any, any, any>>, __trace?: string): <R, E>(s: Managed<R, E, K>) => Managed<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Managed<any, any, infer A>] ? A : never;
}>;
export declare function bindAllParN_<K, NER extends Record<string, Managed<any, any, any>> & {
    [k in keyof K & keyof NER]?: never;
}, R, E>(s: Managed<R, E, K>, n: number, r: (k: K) => EnforceNonEmptyRecord<NER> & Record<string, Managed<any, any, any>>, __trace?: string): Managed<R & _R<NER[keyof NER]>, E | _E<NER[keyof NER]>, K & {
    [K in keyof NER]: [NER[K]] extends [Managed<any, any, infer A>] ? A : never;
}>;
//# sourceMappingURL=struct.d.ts.map