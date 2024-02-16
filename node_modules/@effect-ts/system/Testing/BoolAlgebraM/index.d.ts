import * as T from "../../Effect/index.js";
import * as BA from "../BoolAlgebra/index.js";
export declare class BoolAlgebraM<R, E, A> {
    readonly run: T.Effect<R, E, BA.BoolAlgebra<A>>;
    readonly [T._R]: (_: R) => void;
    readonly [T._E]: () => E;
    readonly [T._A]: () => A;
    constructor(run: T.Effect<R, E, BA.BoolAlgebra<A>>);
}
export declare function and_<R, R1, E, E1, A>(self: BoolAlgebraM<R, E, A>, that: BoolAlgebraM<R1, E1, A>): BoolAlgebraM<R & R1, E | E1, A>;
export declare function and<R1, E1, A>(that: BoolAlgebraM<R1, E1, A>): <R, E>(self: BoolAlgebraM<R, E, A>) => BoolAlgebraM<R & R1, E1 | E, A>;
export declare function or_<R, R1, E, E1, A>(self: BoolAlgebraM<R, E, A>, that: BoolAlgebraM<R1, E1, A>): BoolAlgebraM<R & R1, E | E1, A>;
export declare function or<R1, E1, A>(that: BoolAlgebraM<R1, E1, A>): <R, E>(self: BoolAlgebraM<R, E, A>) => BoolAlgebraM<R & R1, E1 | E, A>;
export declare function implies_<R, R1, E, E1, A>(self: BoolAlgebraM<R, E, A>, that: BoolAlgebraM<R1, E1, A>): BoolAlgebraM<R & R1, E | E1, A>;
export declare function implies<R1, E1, A>(that: BoolAlgebraM<R1, E1, A>): <R, E>(self: BoolAlgebraM<R, E, A>) => BoolAlgebraM<R & R1, E1 | E, A>;
export declare function iff_<R, R1, E, E1, A>(self: BoolAlgebraM<R, E, A>, that: BoolAlgebraM<R1, E1, A>): BoolAlgebraM<R & R1, E | E1, A>;
export declare function iff<R1, E1, A>(that: BoolAlgebraM<R1, E1, A>): <R, E>(self: BoolAlgebraM<R, E, A>) => BoolAlgebraM<R & R1, E1 | E, A>;
export declare function not<R, E, A>(self: BoolAlgebraM<R, E, A>): BoolAlgebraM<R, E, A>;
export declare function as_<R, E, A, B>(self: BoolAlgebraM<R, E, A>, b: B): BoolAlgebraM<R, E, B>;
export declare function as<B>(b: B): <R, E, A>(self: BoolAlgebraM<R, E, A>) => BoolAlgebraM<R, E, B>;
export declare function chain_<R, R1, E, E1, A, B>(self: BoolAlgebraM<R, E, A>, f: (a: A) => BoolAlgebraM<R1, E1, B>): BoolAlgebraM<R & R1, E | E1, B>;
export declare function chain<R1, E1, A, B>(f: (a: A) => BoolAlgebraM<R1, E1, B>): <R, E>(self: BoolAlgebraM<R, E, A>) => BoolAlgebraM<R & R1, E1 | E, B>;
export declare function isSuccess<R, E, A>(self: BoolAlgebraM<R, E, A>): T.Effect<R, E, boolean>;
export declare function map_<R, E, A, B>(self: BoolAlgebraM<R, E, A>, f: (a: A) => B): BoolAlgebraM<R, E, B>;
export declare function failure<A>(a: A): BoolAlgebraM<unknown, never, A>;
export declare function fromEffect<R, E, A>(effect: T.Effect<R, E, A>): BoolAlgebraM<R, E, A>;
export declare function success<A>(a: A): BoolAlgebraM<unknown, never, A>;
//# sourceMappingURL=index.d.ts.map