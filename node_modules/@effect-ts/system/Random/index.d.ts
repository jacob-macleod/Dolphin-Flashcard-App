/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/Random.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */
import "../Operator/index.js";
import type { UIO } from "../Effect/effect.js";
import type { Has } from "../Has/index.js";
export declare const RandomId: unique symbol;
export declare type RandomId = typeof RandomId;
export declare abstract class Random {
    readonly serviceId: RandomId;
    abstract readonly next: UIO<number>;
    abstract readonly nextBoolean: UIO<boolean>;
    abstract readonly nextInt: UIO<number>;
    abstract readonly nextRange: (low: number, high: number) => UIO<number>;
    abstract readonly nextIntBetween: (low: number, high: number) => UIO<number>;
}
export declare class LiveRandom extends Random {
    private PRNG;
    constructor(seed: number);
    next: UIO<number>;
    nextBoolean: UIO<boolean>;
    nextInt: UIO<number>;
    nextRange: (low: number, high: number) => UIO<number>;
    nextIntBetween: (low: number, high: number) => UIO<number>;
}
export declare const defaultRandom: LiveRandom;
export declare const HasRandom: import("../Has/index.js").Tag<Random>;
export declare type HasRandom = Has<Random>;
export declare const next: import("../Effect/effect.js").Effect<Has<Random>, never, number>;
export declare const nextBoolean: import("../Effect/effect.js").Effect<Has<Random>, never, boolean>;
export declare const nextIntBetween: (low: number, high: number) => import("../Effect/effect.js").Effect<Has<Random>, never, number>;
export declare const nextInt: import("../Effect/effect.js").Effect<Has<Random>, never, number>;
export declare const nextRange: (low: number, high: number) => import("../Effect/effect.js").Effect<Has<Random>, never, number>;
export declare const withSeed: (seed: number) => <R1, E1, A1>(ma: import("../Effect/effect.js").Effect<R1 & Has<Random>, E1, A1>) => import("../Effect/effect.js").Effect<R1 & Has<Random>, E1, A1>;
//# sourceMappingURL=index.d.ts.map