import "../Operator/index.js";
/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/Has.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */
import type { Option } from "../Option/index.js";
export declare type Flat<A> = {
    readonly [k in keyof A]: A[k];
} extends infer X ? X : never;
export declare function service<X extends Record<PropertyKey, unknown>>(x: X): Flat<X>;
/**
 * URI used in Has
 */
export declare const HasURI: unique symbol;
/**
 * Has signal presence of a specific service provided via Tag in the environment
 */
export interface Has<T> {
    [HasURI]: {
        _T: () => T;
    };
}
/**
 * Extract the type of a class constructor
 */
export declare type ConstructorType<K extends Constructor<any>> = K extends {
    prototype: infer T;
} ? T : never;
export declare type Constructor<T> = Function & {
    prototype: T;
};
/**
 * Tag Encodes capabilities of reading and writing a service T into a generic environment
 */
export interface Tag<T> {
    _tag: "Tag";
    _T: T;
    key: PropertyKey;
    read: (r: Has<T>) => T;
    readOption: (r: unknown) => Option<T>;
    has: (_: T) => Has<T>;
    of: (_: T) => T;
    refine: <T1 extends T>() => Tag<T1>;
}
/**
 * Create a service entry Tag from a type and a URI
 */
export declare function tag<T>(key?: PropertyKey): Tag<T>;
/**
 * Get the service type of a Has
 */
export declare type ServiceType<T> = [T] extends [Has<infer A>] ? A : never;
/**
 * Replaces the service with the required Service Entry, in the specified environment
 */
export declare const replaceServiceIn: <T>(_: Tag<T>, f: (t: T) => T) => <R>(r: R & Has<T>) => R & Has<T>;
/**
 * Replaces the service with the required Service Entry, in the specified environment
 */
export declare const replaceServiceIn_: <R, T>(r: R & Has<T>, _: Tag<T>, f: (t: T) => T) => R & Has<T>;
export declare function mergeEnvironments<T, R1 extends {}>(_: Tag<T>, r: R1, t: T): R1 & Has<T>;
//# sourceMappingURL=index.d.ts.map