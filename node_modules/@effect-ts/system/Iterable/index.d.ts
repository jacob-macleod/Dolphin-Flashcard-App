import "../Operator/index.js";
import * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { Either } from "../Either/index.js";
export declare function zipWith<A, B, C>(iterableA: Iterable<A>, iterableB: Iterable<B>, zipper: (a: A, b: B) => C): Iterable<C>;
export declare function map<A, B>(f: (a: A, k: number) => B): (i: Iterable<A>) => Iterable<B>;
export declare function map_<A, B>(i: Iterable<A>, f: (a: A, k: number) => B): Iterable<B>;
export declare function zip<B>(fb: Iterable<B>): <A>(fa: Iterable<A>) => Iterable<Tp.Tuple<[A, B]>>;
export declare function zip_<A, B>(fa: Iterable<A>, fb: Iterable<B>): Iterable<Tp.Tuple<[A, B]>>;
export declare function chain<A, B>(f: (a: A) => Iterable<B>): (i: Iterable<A>) => Iterable<B>;
export declare function chain_<A, B>(i: Iterable<A>, f: (a: A) => Iterable<B>): Iterable<B>;
export declare function ap<A>(fa: Iterable<A>): <B>(fab: Iterable<(a: A) => B>) => Iterable<B>;
export declare function of<A>(a: A): Iterable<A>;
export declare function take_<A>(a: Iterable<A>, n: number): Iterable<A>;
export declare function skip_<A>(a: Iterable<A>, n: number): Iterable<A>;
export declare const never: Iterable<never>;
export declare function foldMap<M>(M: {
    empty: M;
    concat: (x: M, y: M) => M;
}): <A>(f: (a: A, k: number) => M) => (fa: Iterable<A>) => M;
export declare function reduce<A, B>(b: B, f: (b: B, a: A, i: number) => B): (fa: Iterable<A>) => B;
export declare function reduce_<A, B>(fa: Iterable<A>, b: B, f: (b: B, a: A, i: number) => B): B;
export declare function reduceRight<A, B>(b: B, f: (a: A, b: B, i: number) => B): (fa: Iterable<A>) => B;
export declare function reduceRight_<A, B>(fa: Iterable<A>, b: B, f: (a: A, b: B, i: number) => B): B;
export declare function concat<A>(a: Iterable<A>, b: Iterable<A>): Iterable<A>;
export declare function flatten<A>(a: Iterable<Iterable<A>>): Iterable<A>;
export declare function partitionMap<A, A1, A2>(f: (a: A) => Either<A1, A2>): (as: Iterable<A>) => Tp.Tuple<[Iterable<A1>, Iterable<A2>]>;
/**
 * Infinite sequence produced by repeated application of f to a
 */
export declare function unfold<A>(a: A, f: (a: A) => A): Iterable<A>;
export declare function corresponds<A, B>(left: Iterable<A>, right: Iterable<B>, f: (a: A, b: B) => boolean): boolean;
//# sourceMappingURL=index.d.ts.map