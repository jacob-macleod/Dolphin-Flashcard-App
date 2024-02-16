import type * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { HasUnify } from "../Utils/index.js";
import { unifyIndex } from "../Utils/index.js";
import * as T from "./deps-core.js";
import type { Finalizer, ReleaseMap } from "./ReleaseMap/index.js";
export declare const ManagedURI = "@matechs/core/Eff/ManagedURI";
export declare type ManagedURI = typeof ManagedURI;
export interface Managed<R, E, A> extends HasUnify {
    readonly [unifyIndex]: ManagedURI;
    readonly [T._U]: ManagedURI;
    readonly [T._E]: () => E;
    readonly [T._A]: () => A;
    readonly [T._R]: (_: R) => void;
    readonly effect: T.Effect<Tp.Tuple<[R, ReleaseMap]>, E, Tp.Tuple<[Finalizer, A]>>;
}
export declare class ManagedImpl<R, E, A> implements Managed<R, E, A> {
    readonly effect: T.Effect<Tp.Tuple<[R, ReleaseMap]>, E, Tp.Tuple<[Finalizer, A]>>;
    readonly [unifyIndex]: ManagedURI;
    readonly [T._U]: ManagedURI;
    readonly [T._E]: () => E;
    readonly [T._A]: () => A;
    readonly [T._R]: (_: R) => void;
    constructor(effect: T.Effect<Tp.Tuple<[R, ReleaseMap]>, E, Tp.Tuple<[Finalizer, A]>>);
}
export declare function managedApply<R, E, A>(effect: T.Effect<Tp.Tuple<[R, ReleaseMap]>, E, Tp.Tuple<[Finalizer, A]>>): Managed<R, E, A>;
export declare type UIO<A> = Managed<unknown, never, A>;
export declare type RIO<R, A> = Managed<R, never, A>;
export declare type IO<E, A> = Managed<unknown, E, A>;
declare module "../Utils" {
    interface UnifiableIndexed<X> {
        [ManagedURI]: [X] extends [Managed<infer R, infer E, infer A>] ? Managed<R, E, A> : never;
    }
}
//# sourceMappingURL=managed.d.ts.map