import * as T from "../Effect/index.js";
import * as Ex from "../Exit/index.js";
import type * as M from "../Managed/index.js";
export declare class Attempted<E, A> {
    readonly result: Ex.Exit<E, A>;
    readonly finalizer: T.UIO<void>;
    readonly [T._E]: () => E;
    readonly [T._A]: () => A;
    constructor(result: Ex.Exit<E, A>, finalizer: T.UIO<void>);
}
export declare function isFailure<E, A>(self: Attempted<E, A>): boolean;
export declare function forEachUnit_<R, E, E1, A, Z>(self: Attempted<E, A>, f: (a: A) => T.Effect<R, E1, Z>): T.Effect<R, E1, void>;
export declare function forEachUnit<R, E1, A, Z>(f: (a: A) => T.Effect<R, E1, Z>): <E>(self: Attempted<E, A>) => T.Effect<R, E1, void>;
export declare function toManaged<E, A>(self: Attempted<E, A>): M.IO<E, A>;
//# sourceMappingURL=Attempted.d.ts.map