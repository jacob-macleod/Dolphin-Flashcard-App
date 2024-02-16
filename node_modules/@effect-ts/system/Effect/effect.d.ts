import type { HasUnify } from "../Utils/index.js";
import { _A, _E, _R, _S1, _S2, _U, _W } from "./commons.js";
import type { Instruction } from "./primitives.js";
export declare const EffectURI = "Effect";
export declare type EffectURI = typeof EffectURI;
export interface Effect<R, E, A> extends HasUnify {
    readonly [_U]: EffectURI;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    readonly [_R]: (_: R) => void;
    readonly [_S1]: (_: unknown) => void;
    readonly [_S2]: () => unknown;
    readonly [_W]: () => unknown;
}
export declare type IO<E, A> = Effect<unknown, E, A>;
export declare type RIO<R, A> = Effect<R, never, A>;
export declare type UIO<A> = Effect<unknown, never, A>;
export declare abstract class Base<R, E, A> implements Effect<R, E, A> {
    readonly [_S1]: (_: unknown) => void;
    readonly [_S2]: () => unknown;
    readonly [_W]: () => unknown;
    readonly [_U]: EffectURI;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    readonly [_R]: (_: R) => void;
}
/**
 * @ets_optimize identity
 */
export declare function instruction<R, E, A>(self: Effect<R, E, A>): Instruction;
//# sourceMappingURL=effect.d.ts.map