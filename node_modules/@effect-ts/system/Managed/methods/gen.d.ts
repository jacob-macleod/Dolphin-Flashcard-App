import type { Effect } from "../../Effect/effect.js";
import { _A, _E, _R } from "../../Effect/index.js";
import type { Either } from "../../Either/index.js";
import type { NoSuchElementException } from "../../GlobalExceptions/index.js";
import type { Has, Tag } from "../../Has/index.js";
import type { Option } from "../../Option/index.js";
import type * as Utils from "../../Utils/index.js";
import type { Managed } from "../managed.js";
export declare class GenManaged<R, E, A> {
    readonly effect: Managed<R, E, A>;
    readonly trace?: string | undefined;
    readonly [_R]: (_R: R) => void;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    constructor(effect: Managed<R, E, A>, trace?: string | undefined);
    [Symbol.iterator](): Generator<GenManaged<R, E, A>, A, any>;
}
export declare function gen<Eff extends GenManaged<any, any, any>, AEff>(f: (i: {
    <A>(_: Tag<A>, __trace?: string): GenManaged<Has<A>, never, A>;
    <E, A>(_: Option<A>, onNone: () => E, __trace?: string): GenManaged<unknown, E, A>;
    <A>(_: Option<A>, __trace?: string): GenManaged<unknown, NoSuchElementException, A>;
    <E, A>(_: Either<E, A>, __trace?: string): GenManaged<unknown, E, A>;
    <R, E, A>(_: Managed<R, E, A>, __trace?: string): GenManaged<R, E, A>;
    <R, E, A>(_: Effect<R, E, A>, __trace?: string): GenManaged<R, E, A>;
}) => Generator<Eff, AEff, any>): Managed<Utils._R<Eff>, Utils._E<Eff>, AEff>;
//# sourceMappingURL=gen.d.ts.map