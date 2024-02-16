import "../Operator/index.js";
import * as Tp from "../Collections/Immutable/Tuple/index.js";
import { _A, _U } from "../Effect/commons.js";
import type { HasUnify } from "../Utils/index.js";
import { unifyIndex } from "../Utils/index.js";
/**
 * `IO[A]` is a purely functional description of a computation.
 *
 * Note: while for general cases the `Sync` data type is preferrable,
 * this data type is designed for speed and low allocations,
 * it is internally used to suspend recursive procedures but can be
 * useful whenever you need a fast sync computation that cannot fail
 * and that doesn't require any environment.
 */
export declare type IO<A> = Succeed<A> | FlatMap<any, A> | Suspend<A>;
export declare const IoURI: unique symbol;
export declare type IoURI = typeof IoURI;
declare module "../Utils" {
    interface UnifiableIndexed<X> {
        [IoURI]: [X] extends [IO<infer A>] ? IO<A> : never;
    }
}
interface Base<A> extends HasUnify {
}
declare abstract class Base<A> {
    readonly [unifyIndex]: IoURI;
    readonly [_U]: "IO";
    readonly [_A]: () => A;
}
declare class Succeed<A> extends Base<A> {
    readonly a: A;
    readonly _iotag = "Succeed";
    constructor(a: A);
}
declare class Suspend<A> extends Base<A> {
    readonly f: () => IO<A>;
    readonly _iotag = "Suspend";
    constructor(f: () => IO<A>);
}
declare class FlatMap<A, B> extends Base<A> {
    readonly value: IO<A>;
    readonly cont: (a: A) => IO<B>;
    readonly _iotag = "FlatMap";
    constructor(value: IO<A>, cont: (a: A) => IO<B>);
}
/**
 * Runs this computation
 */
export declare function run<A>(self: IO<A>): A;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first chain_
 */
export declare function chain<A, B>(f: (a: A) => IO<B>): (self: IO<A>) => IO<B>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare function chain_<A, B>(self: IO<A>, f: (a: A) => IO<B>): IO<B>;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 *
 * @ets_data_first tap_
 */
export declare function tap<A>(f: (a: A) => IO<any>): (self: IO<A>) => IO<A>;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */
export declare function tap_<A>(self: IO<A>, f: (a: A) => IO<any>): IO<A>;
/**
 * Constructs a computation that always succeeds with the specified value.
 */
export declare function succeed<A>(a: A): IO<A>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare function map_<A, B>(self: IO<A>, f: (a: A) => B): IO<B>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (a: A) => B): (self: IO<A>) => IO<B>;
/**
 * Constructs a computation that always returns the `Unit` value.
 */
export declare const unit: IO<void>;
/**
 * Combines this computation with the specified computation combining the
 * results of both using the specified function.
 *
 * @ets_data_first zipWith_
 */
export declare function zipWith<A, B, C>(that: IO<B>, f: (a: A, b: B) => C): (self: IO<A>) => IO<C>;
/**
 * Combines this computation with the specified computation combining the
 * results of both using the specified function.
 */
export declare function zipWith_<A, B, C>(self: IO<A>, that: IO<B>, f: (a: A, b: B) => C): IO<C>;
/**
 * Combines this computation with the specified computation, combining the
 * results of both into a tuple.
 *
 * @ets_data_first zip_
 */
export declare function zip<B>(that: IO<B>): <A>(self: IO<A>) => IO<Tp.Tuple<[a: A, b: B]>>;
/**
 * Combines this computation with the specified computation combining the
 * results of both into a tuple.
 */
export declare function zip_<A, B>(self: IO<A>, that: IO<B>): IO<Tp.Tuple<[a: A, b: B]>>;
/**
 * Suspend a computation, useful in recursion
 */
export declare function suspend<A>(f: () => IO<A>): IO<A>;
/**
 * Lift a sync (non failable) computation
 */
export declare function succeedWith<A>(f: () => A): IO<A>;
export declare class GenIO<A> {
    readonly effect: IO<A>;
    readonly _A: () => A;
    constructor(effect: IO<A>);
    [Symbol.iterator](): Generator<GenIO<A>, A, any>;
}
/**
 * Generator
 */
export declare function gen<Eff extends GenIO<any>, AEff>(f: (i: {
    <A>(_: IO<A>): GenIO<A>;
}) => Generator<Eff, AEff, any>): IO<AEff>;
export {};
//# sourceMappingURL=index.d.ts.map