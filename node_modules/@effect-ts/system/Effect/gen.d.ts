import type { Either } from "../Either/index.js";
import type { NoSuchElementException } from "../GlobalExceptions/index.js";
import type { Has, Tag } from "../Has/index.js";
import type { Managed } from "../Managed/managed.js";
import type { Option } from "../Option/index.js";
import * as Utils from "../Utils/index.js";
import { _A, _E, _R } from "./commons.js";
import type { Effect } from "./effect.js";
export declare class GenEffect<R, E, A> {
    readonly effect: Effect<R, E, A> | Managed<R, E, A>;
    readonly trace?: string | undefined;
    readonly [_R]: (_R: R) => void;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    constructor(effect: Effect<R, E, A> | Managed<R, E, A>, trace?: string | undefined);
    [Symbol.iterator](): Generator<GenEffect<R, E, A>, A, any>;
}
export interface Adapter {
    <A>(_: Tag<A>, __trace?: string): GenEffect<Has<A>, never, A>;
    <E, A>(_: Option<A>, onNone: () => E, __trace?: string): GenEffect<unknown, E, A>;
    <A>(_: Option<A>, __trace?: string): GenEffect<unknown, NoSuchElementException, A>;
    <E, A>(_: Either<E, A>, __trace?: string): GenEffect<unknown, E, A>;
    <R, E, A>(_: Effect<R, E, A>, __trace?: string): GenEffect<R, E, A>;
}
export interface AdapterWithManaged extends Adapter {
    <R, E, A>(_: Managed<R, E, A>, __trace?: string): GenEffect<R, E, A>;
}
export declare function genM<Eff extends GenEffect<any, any, any>, AEff>(f: (i: AdapterWithManaged) => Generator<Eff, AEff, any>, __trace?: string): Effect<Utils._R<Eff>, Utils._E<Eff>, AEff>;
export declare function gen<Eff extends GenEffect<any, any, any>, AEff>(f: (i: Adapter) => Generator<Eff, AEff, any>, __trace?: string): Effect<Utils._R<Eff>, Utils._E<Eff>, AEff>;
//# sourceMappingURL=gen.d.ts.map