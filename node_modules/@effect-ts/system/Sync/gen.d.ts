/**
 * inspired by https://github.com/tusharmath/qio/pull/22 (revised)
 */
import { _A, _E, _R } from "../Effect/commons.js";
import type { Either } from "../Either/index.js";
import { NoSuchElementException } from "../GlobalExceptions/index.js";
import type { Has, Tag } from "../Has/index.js";
import type { Option } from "../Option/index.js";
import type * as Utils from "../Utils/index.js";
import type { Sync } from "./core.js";
export declare class GenSync<R, E, A> {
    readonly effect: Sync<R, E, A>;
    readonly [_R]: (_R: R) => void;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    constructor(effect: Sync<R, E, A>);
    [Symbol.iterator](): Generator<GenSync<R, E, A>, A, any>;
}
export declare function gen<Eff extends GenSync<any, any, any>, AEff>(f: (i: {
    <A>(_: Tag<A>): GenSync<Has<A>, never, A>;
    <E, A>(_: Option<A>, onNone: () => E): GenSync<unknown, E, A>;
    <A>(_: Option<A>): GenSync<unknown, NoSuchElementException, A>;
    <E, A>(_: Either<E, A>): GenSync<unknown, E, A>;
    <R, E, A>(_: Sync<R, E, A>): GenSync<R, E, A>;
}) => Generator<Eff, AEff, any>): Sync<Utils._R<Eff>, Utils._E<Eff>, AEff>;
//# sourceMappingURL=gen.d.ts.map