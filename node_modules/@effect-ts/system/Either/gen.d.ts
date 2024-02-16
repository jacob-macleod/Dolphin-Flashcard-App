import { _A, _E } from "../Effect/commons.js";
import { NoSuchElementException } from "../GlobalExceptions/index.js";
import type { Option } from "../Option/index.js";
import * as Utils from "../Utils/index.js";
import type { Either } from "./core.js";
export declare class GenEither<E, A> {
    readonly effect: Either<E, A>;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    constructor(effect: Either<E, A>);
    [Symbol.iterator](): Generator<GenEither<E, A>, A, any>;
}
export declare function gen<Eff extends GenEither<any, any>, AEff>(f: (i: {
    <E, A>(_: Option<A>, onNone: () => E): GenEither<E, A>;
    <A>(_: Option<A>): GenEither<NoSuchElementException, A>;
    <E, A>(_: Either<E, A>): GenEither<E, A>;
}) => Generator<Eff, AEff, any>): Either<Utils._E<Eff>, AEff>;
//# sourceMappingURL=gen.d.ts.map