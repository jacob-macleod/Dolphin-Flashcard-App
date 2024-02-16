import type { Has, Tag } from "../Has/index.js";
import type { UnionToIntersection } from "../Utils/index.js";
import * as X from "./core.js";
/**
 * Access a record of services with the required Service Entries
 */
export declare function accessServicesM<SS extends Record<string, Tag<any>>>(s: SS): <R = unknown, E = never, B = unknown>(f: (a: { [k in keyof SS]: [SS[k]] extends [Tag<infer T>] ? T : unknown; }) => X.Sync<R, E, B>) => X.Sync<R & UnionToIntersection<{ [k_1 in keyof SS]: [SS[k_1]] extends [Tag<infer T_1>] ? Has<T_1> : unknown; }[keyof SS]>, E, B>;
export declare const accessServicesTM: <SS extends Tag<any>[]>(...s: SS) => <S, R = unknown, E = never, B = unknown>(f: (...a: { [k in keyof SS]: [SS[k]] extends [Tag<infer T>] ? T : unknown; }) => X.Sync<R, E, B>) => X.Sync<R & UnionToIntersection<{ [k_1 in keyof SS]: [SS[k_1]] extends [Tag<infer T_1>] ? Has<T_1> : never; }[keyof SS & number]>, E, B>;
export declare function accessServicesT<SS extends Tag<any>[]>(...s: SS): <B = unknown>(f: (...a: { [k in keyof SS]: [SS[k]] extends [Tag<infer T>] ? T : unknown; }) => B) => X.Sync<UnionToIntersection<{ [k_1 in keyof SS]: [SS[k_1]] extends [Tag<infer T_1>] ? Has<T_1> : never; }[keyof SS & number]>, never, B>;
/**
 * Access a record of services with the required Service Entries
 */
export declare function accessServices<SS extends Record<string, Tag<any>>>(s: SS): <B>(f: (a: { [k in keyof SS]: [SS[k]] extends [Tag<infer T>] ? T : unknown; }) => B) => X.Sync<UnionToIntersection<{ [k_1 in keyof SS]: [SS[k_1]] extends [Tag<infer T_1>] ? Has<T_1> : unknown; }[keyof SS]>, never, B>;
/**
 * Access a service with the required Service Entry
 */
export declare function accessServiceM<T>(s: Tag<T>): <R, E, B>(f: (a: T) => X.Sync<R, E, B>) => X.Sync<R & Has<T>, E, B>;
/**
 * Access a service with the required Service Entry
 */
export declare function accessService<T>(s: Tag<T>): <B>(f: (a: T) => B) => X.Sync<Has<T>, never, B>;
/**
 * Access a service with the required Service Entry
 */
export declare function service<T>(s: Tag<T>): X.Sync<Has<T>, never, T>;
/**
 * Provides the service with the required Service Entry
 */
export declare function provideServiceM<T>(_: Tag<T>): <R, E>(f: X.Sync<R, E, T>) => <R1, E1, A1>(ma: X.Sync<R1 & Has<T>, E1, A1>) => X.Sync<R & R1, E | E1, A1>;
/**
 * Provides the service with the required Service Entry
 */
export declare function provideService<T>(_: Tag<T>): (f: T) => <R1, E1, A1>(ma: X.Sync<R1 & Has<T>, E1, A1>) => X.Sync<R1, E1, A1>;
/**
 * Replaces the service with the required Service Entry
 */
export declare function replaceServiceM<R, E, T>(_: Tag<T>, f: (_: T) => X.Sync<R, E, T>): <R1, E1, A1>(ma: X.Sync<R1 & Has<T>, E1, A1>) => X.Sync<R & R1 & Has<T>, E | E1, A1>;
/**
 * Replaces the service with the required Service Entry
 */
export declare function replaceServiceM_<R, E, T, R1, E1, A1>(ma: X.Sync<R1 & Has<T>, E1, A1>, _: Tag<T>, f: (_: T) => X.Sync<R, E, T>): X.Sync<R & R1 & Has<T>, E | E1, A1>;
/**
 * Replaces the service with the required Service Entry
 */
export declare function replaceService<T>(_: Tag<T>, f: (_: T) => T): <R1, E1, A1>(ma: X.Sync<R1 & Has<T>, E1, A1>) => X.Sync<R1 & Has<T>, E1, A1>;
/**
 * Replaces the service with the required Service Entry
 */
export declare function replaceService_<R1, E1, A1, T>(ma: X.Sync<R1 & Has<T>, E1, A1>, _: Tag<T>, f: (_: T) => T): X.Sync<R1 & Has<T>, E1, A1>;
//# sourceMappingURL=has.d.ts.map