import type { AccessCustom, CustomType } from "./custom.js";
import type { URI } from "./kind.js";
export interface HKT<F, A> {
    F: F;
    A: A;
}
export interface HKT2<F, E, A> {
    F: F;
    E: E;
    A: A;
}
export interface HKT3<F, R, E, A> {
    F: F;
    R: R;
    E: E;
    A: A;
}
export interface HKT4<F, S, R, E, A> {
    F: F;
    S: S;
    R: R;
    E: E;
    A: A;
}
export declare type UHKT<F> = [URI<"HKT1", CustomType<"F", F>>];
export declare type UHKT2<F> = [URI<"HKT2", CustomType<"F", F>>];
export declare type UHKT3<F> = [URI<"HKT3", CustomType<"F", F>>];
export declare type UHKT4<F> = [URI<"HKT4", CustomType<"F", F>>];
export declare type UHKTCategory<F> = [URI<"HKTCategory", CustomType<"F", F>>];
export interface URItoKind<FC, TC, K, Q, W, X, I, S, R, E, A> {
    ["HKT1"]: HKT<AccessCustom<FC, "F">, A>;
    ["HKT2"]: HKT2<AccessCustom<FC, "F">, E, A>;
    ["HKTCategory"]: HKT2<AccessCustom<FC, "F">, I, A>;
    ["HKT3"]: HKT3<AccessCustom<FC, "F">, R, E, A>;
    ["HKT4"]: HKT4<AccessCustom<FC, "F">, S, R, E, A>;
}
export interface URItoIndex<K> {
}
export declare type ConcreteURIS = keyof URItoKind<any, any, any, any, any, any, any, any, any, any, any>;
//# sourceMappingURL=hkt.d.ts.map