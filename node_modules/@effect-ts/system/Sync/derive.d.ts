import type { Has, Tag } from "../Has/index.js";
import type { Sync } from "./core.js";
export declare type ShapeFn<T> = Pick<T, {
    [k in keyof T]: T[k] extends (...args: infer ARGS) => Sync<infer R, infer E, infer A> ? ((...args: ARGS) => Sync<R, E, A>) extends T[k] ? k : never : never;
}[keyof T]>;
export declare type ShapeCn<T> = Pick<T, {
    [k in keyof T]: T[k] extends Sync<any, any, any> ? k : never;
}[keyof T]>;
export declare type DerivedLifted<T, Fns extends keyof ShapeFn<T>, Cns extends keyof ShapeCn<T>, Values extends keyof T> = {
    [k in Fns]: T[k] extends (...args: infer ARGS) => Sync<infer R, infer E, infer A> ? (...args: ARGS) => Sync<R & Has<T>, E, A> : never;
} & {
    [k in Cns]: T[k] extends Sync<infer R, infer E, infer A> ? Sync<R & Has<T>, E, A> : never;
} & {
    [k in Values]: Sync<Has<T>, never, T[k]>;
};
export declare function deriveLifted<T>(H: Tag<T>): <Fns extends keyof ShapeFn<T> = never, Cns extends keyof ShapeCn<T> = never, Values extends keyof T = never>(functions: Fns[], effects: Cns[], values: Values[]) => DerivedLifted<T, Fns, Cns, Values>;
export declare type DerivedAccessM<T, Gens extends keyof T> = {
    [k in Gens]: <R_, E_, A_>(f: (_: T[k]) => Sync<R_, E_, A_>, __trace?: string) => Sync<R_ & Has<T>, E_, A_>;
};
export declare function deriveAccessM<T>(H: Tag<T>): <Gens extends keyof T = never>(generics: Gens[]) => DerivedAccessM<T, Gens>;
export declare type DerivedAccess<T, Gens extends keyof T> = {
    [k in Gens]: <A_>(f: (_: T[k]) => A_, __trace?: string) => Sync<Has<T>, never, A_>;
};
export declare function deriveAccess<T>(H: Tag<T>): <Gens extends keyof T = never>(generics: Gens[]) => DerivedAccess<T, Gens>;
//# sourceMappingURL=derive.d.ts.map