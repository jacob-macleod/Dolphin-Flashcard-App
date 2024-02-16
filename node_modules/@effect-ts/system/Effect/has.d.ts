import type { Effect } from "../Effect/effect.js";
import type { Has, Tag } from "../Has/index.js";
import type { UnionToIntersection } from "../Utils/index.js";
/**
 * Access a record of services with the required Service Entries
 */
export declare function accessServicesM<SS extends Record<string, Tag<any>>>(s: SS): <R = unknown, E = never, B = unknown>(f: (a: { [k in keyof SS]: [SS[k]] extends [Tag<infer T>] ? T : unknown; }) => Effect<R, E, B>, __trace?: string | undefined) => Effect<R & UnionToIntersection<{ [k_1 in keyof SS]: [SS[k_1]] extends [Tag<infer T_1>] ? Has<T_1> : unknown; }[keyof SS]>, E, B>;
/**
 * Access a tuple of services with the required Service Entries monadically
 */
export declare function accessServicesTM<SS extends Tag<any>[]>(...s: SS): <R = unknown, E = never, B = unknown>(f: (...a: { [k in keyof SS]: [SS[k]] extends [Tag<infer T>] ? T : unknown; }) => Effect<R, E, B>, __trace?: string | undefined) => Effect<R & UnionToIntersection<{ [k_1 in keyof SS]: [SS[k_1]] extends [Tag<infer T_1>] ? Has<T_1> : never; }[keyof SS & number]>, E, B>;
/**
 * Access a tuple of services with the required Service Entries
 */
export declare function accessServicesT<SS extends Tag<any>[]>(...s: SS): <B = unknown>(f: (...a: { [k in keyof SS]: [SS[k]] extends [Tag<infer T>] ? T : unknown; }) => B, __trace?: string | undefined) => import("../Effect/effect.js").RIO<UnionToIntersection<{ [k_1 in keyof SS]: [SS[k_1]] extends [Tag<infer T_1>] ? Has<T_1> : never; }[keyof SS & number]>, B>;
/**
 * Access a record of services with the required Service Entries
 */
export declare function accessServices<SS extends Record<string, Tag<any>>>(s: SS): <B>(f: (a: { [k in keyof SS]: [SS[k]] extends [Tag<infer T>] ? T : unknown; }) => B, __trace?: string | undefined) => import("../Effect/effect.js").RIO<UnionToIntersection<{ [k_1 in keyof SS]: [SS[k_1]] extends [Tag<infer T_1>] ? Has<T_1> : unknown; }[keyof SS]>, B>;
/**
 * Access a service with the required Service Entry
 */
export declare function accessServiceM<T>(s: Tag<T>): <R, E, B>(f: (a: T) => Effect<R, E, B>, __trace?: string | undefined) => Effect<R & Has<T>, E, B>;
/**
 * Access a service with the required Service Entry
 */
export declare function accessService<T>(s: Tag<T>): <B>(f: (a: T) => B, __trace?: string | undefined) => Effect<Has<T>, never, B>;
/**
 * Accesses the specified service in the environment of the effect.
 */
export declare function service<T>(s: Tag<T>, __trace?: string): Effect<Has<T>, never, T>;
/**
 * Accesses the specified services in the environment of the effect.
 *
 * @ets_trace call
 */
export declare function services<Ts extends readonly Tag<any>[]>(...s: Ts): import("../Effect/effect.js").RIO<UnionToIntersection<{ [k in keyof Ts]: [Ts[k]] extends [Tag<infer T>] ? Has<T> : never; }[number]>, Readonly<{ [k_1 in keyof Ts]: [Ts[k_1]] extends [Tag<infer T_1>] ? T_1 : never; }>>;
/**
 * Provides the service with the required Service Entry
 */
export declare function provideServiceM<T>(_: Tag<T>): <R, E>(service: Effect<R, E, T>, __trace?: string | undefined) => <R1, E1, A1>(ma: Effect<R1 & Has<T>, E1, A1>) => Effect<R & R1, E | E1, A1>;
/**
 * Provides the service with the required Service Entry
 */
export declare function provideServiceM_<R1, E1, A1, R, E, T>(ma: Effect<R1 & Has<T>, E1, A1>, _: Tag<T>, service: Effect<R, E, T>, __trace?: string): Effect<R & R1, E | E1, A1>;
/**
 * Provides the service with the required Service Entry
 */
export declare function provideService<T>(_: Tag<T>): (service: T, __trace?: string | undefined) => <R1, E1, A1>(ma: Effect<R1 & Has<T>, E1, A1>) => Effect<R1, E1, A1>;
/**
 * Provides the service with the required Service Entry
 */
export declare function provideService_<R1, E1, A1, T>(ma: Effect<R1 & Has<T>, E1, A1>, _: Tag<T>, service: T, __trace?: string): Effect<R1, E1, A1>;
/**
 * Replaces the service with the required Service Entry
 */
export declare function replaceServiceM<R, E, T>(_: Tag<T>, f: (_: T) => Effect<R, E, T>, __trace?: string): <R1, E1, A1>(ma: Effect<R1 & Has<T>, E1, A1>) => Effect<R & R1 & Has<T>, E | E1, A1>;
/**
 * Replaces the service with the required Service Entry
 */
export declare function replaceServiceM_<R, E, T, R1, E1, A1>(ma: Effect<R1 & Has<T>, E1, A1>, _: Tag<T>, f: (_: T) => Effect<R, E, T>, __trace?: string): Effect<R & R1 & Has<T>, E | E1, A1>;
/**
 * Replaces the service with the required Service Entry
 *
 * @ets_data_first replaceService_
 */
export declare function replaceService<T>(_: Tag<T>, f: (_: T) => T, __trace?: string): <R1, E1, A1>(ma: Effect<R1 & Has<T>, E1, A1>) => Effect<R1 & Has<T>, E1, A1>;
/**
 * Replaces the service with the required Service Entry
 */
export declare function replaceService_<R1, E1, A1, T>(ma: Effect<R1 & Has<T>, E1, A1>, _: Tag<T>, f: (_: T) => T, __trace?: string): Effect<R1 & Has<T>, E1, A1>;
//# sourceMappingURL=has.d.ts.map