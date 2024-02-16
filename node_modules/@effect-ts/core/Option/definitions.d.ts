import type * as O from "@effect-ts/system/Option";
export declare type AOfOptions<Ts extends O.Option<any>[]> = {
    [k in keyof Ts]: Ts[k] extends O.Option<infer A> ? A : never;
}[number];
//# sourceMappingURL=definitions.d.ts.map