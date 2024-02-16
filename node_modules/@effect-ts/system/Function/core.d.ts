import type { _A, _E, _R } from "../Effect/index.js";
import { flow } from "./flow.js";
import { pipe } from "./pipe.js";
export { flow, pipe };
/**
 * Models () => A
 */
export interface Lazy<A> {
    (): A;
}
/**
 * Models (a: A) => boolean
 */
export interface Predicate<A> {
    (a: A): boolean;
}
/**
 * Models (a: A) => a is B
 */
export interface Refinement<A, B extends A> {
    (a: A): a is B;
}
/**
 * Models (a: A) => A
 */
export interface Endomorphism<A> {
    (a: A): A;
}
/**
 * Models (...args: A) => B
 */
export interface FunctionN<A extends ReadonlyArray<unknown>, B> {
    (...args: A): B;
}
/**
 * Will raise if called
 */
export declare function absurd<A = never>(_: never): A;
/**
 * A constant function that always return A
 */
export declare function constant<A>(a: A): Lazy<A>;
/**
 * A thunk that returns always `false`
 */
export declare const constFalse: () => boolean;
/**
 * A thunk that returns always `null`
 */
export declare const constNull: () => null;
/**
 * A thunk that returns always `true`
 */
export declare const constTrue: () => boolean;
/**
 * A thunk that returns always `undefined`
 */
export declare const constUndefined: () => undefined;
/**
 * A thunk that returns always `void`
 */
export declare const constVoid: () => void;
/**
 * Flips the order of the arguments of a function of two arguments.
 */
export declare function flip<A, B, C>(f: (a: A, b: B) => C): (b: B, a: A) => C;
/**
 * Identity function
 *
 * @ets_optimize identity
 */
export declare function identity<A>(a: A): A;
/**
 * Force string to be literal
 *
 * @ets_optimize identity
 */
export declare function literal<K extends string>(k: K): K;
/**
 * Inverts a boolean predicate
 */
export declare function not<A>(predicate: Predicate<A>): Predicate<A>;
/**
 * Construct tuples
 */
export declare function tuple<T extends ReadonlyArray<any>>(...t: T): Readonly<T>;
/**
 * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
 *
 * @example
 * const add = tupled((x: number, y: number): number => x + y)
 *
 * assert.strictEqual(add([1, 2]), 3)
 */
export declare function tupled<A extends ReadonlyArray<unknown>, B>(f: (...a: A) => B): (a: Readonly<A>) => B;
/**
 * Inverse function of `tupled`
 */
export declare function untupled<A extends ReadonlyArray<unknown>, B>(f: (a: Readonly<A>) => B): (...a: A) => B;
/**
 * Performs unsafe coercion of types
 *
 * @ets_optimize identity
 */
export declare function unsafeCoerce<A, B>(a: A): B;
/**
 * Type Hole, to be used while implementing functions where you need a placeholder
 */
export declare function hole<T>(): T;
/**
 * Requires _A to be the one specified
 */
export declare function enforceOutput<A>(): <T extends {
    [_A]: () => A;
}>(_: T) => T;
/**
 * Requires _E to be the one specified
 */
export declare function enforceError<E>(): <T extends {
    [_E]: () => E;
}>(_: T) => T;
/**
 * Requires _R to be the one specified
 */
export declare function enforceContext<R>(): <T extends {
    [_R]: (_: R) => void;
}>(_: T) => T;
/**
 * Increments a number by one
 */
export declare function increment(n: number): number;
/**
 * Decrements a number by one
 */
export declare function decrement(n: number): number;
//# sourceMappingURL=core.d.ts.map