/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/Supervisor.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */
import "../Operator/index.js";
import * as SS from "../Collections/Immutable/SortedSet/index.js";
import type * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { Effect, UIO } from "../Effect/effect.js";
import type { Exit } from "../Exit/exit.js";
import type { Runtime } from "../Fiber/core.js";
import type * as O from "../Option/index.js";
import { AtomicReference } from "../Support/AtomicReference/index.js";
/**
 * A `Supervisor<A>` is allowed to supervise the launching and termination of
 * fibers, producing some visible value of type `A` from the supervision.
 */
export declare class Supervisor<A> {
    readonly value: UIO<A>;
    readonly unsafeOnStart: <R, E, A>(environment: R, effect: Effect<R, E, A>, parent: O.Option<Runtime<any, any>>, fiber: Runtime<E, A>) => Propagation;
    readonly unsafeOnEnd: <E, A>(value: Exit<E, A>, fiber: Runtime<E, A>) => Propagation;
    constructor(value: UIO<A>, unsafeOnStart: <R, E, A>(environment: R, effect: Effect<R, E, A>, parent: O.Option<Runtime<any, any>>, fiber: Runtime<E, A>) => Propagation, unsafeOnEnd: <E, A>(value: Exit<E, A>, fiber: Runtime<E, A>) => Propagation);
    /**
     * Returns a new supervisor that performs the function of this supervisor,
     * and the function of the specified supervisor, producing a tuple of the
     * outputs produced by both supervisors.
     *
     * The composite supervisor indicates that it has fully handled the
     * supervision event if only both component supervisors indicate they have
     * handled the supervision event.
     */
    and<B>(that: Supervisor<B>): Supervisor<Tp.Tuple<[A, B]>>;
    /**
     * Returns a new supervisor that performs the function of this supervisor,
     * and the function of the specified supervisor, producing a tuple of the
     * outputs produced by both supervisors.
     *
     * The composite supervisor indicates that it has fully handled the
     * supervision event if either component supervisors indicate they have
     * handled the supervision event.
     */
    or<B>(that: Supervisor<B>): Supervisor<Tp.Tuple<[A, B]>>;
}
/**
 * A hint indicating whether or not to propagate supervision events across
 * supervisor hierarchies.
 */
export declare type Propagation = Stop | Continue;
/**
 * A hint indicating supervision events no longer require propagation.
 */
export declare class Stop {
    readonly _tag = "Stop";
}
/**
 * A hint indicating supervision events require further propagation.
 */
export declare class Continue {
    readonly _tag = "Continue";
}
export declare const propagationAnd: (self: Propagation, that: Propagation) => Stop | Continue;
export declare const propagationOr: (self: Propagation, that: Propagation) => Stop | Continue;
export declare const _stop: Stop;
export declare const _continue: Continue;
export declare const mainFibers: Set<Runtime<any, any>>;
export declare const trackMainFibers: Supervisor<Set<Runtime<any, any>>>;
/**
 * Creates a new supervisor that tracks children in a set.
 */
export declare const track: Effect<unknown, never, Supervisor<SS.SortedSet<Runtime<any, any>>>>;
/**
 * Creates a new supervisor that tracks children in a set.
 */
export declare function fibersIn(ref: AtomicReference<SS.SortedSet<Runtime<any, any>>>): UIO<Supervisor<SS.SortedSet<Runtime<any, any>>>>;
/**
 * A supervisor that doesn't do anything in response to supervision events.
 */
export declare const none: Supervisor<void>;
//# sourceMappingURL=index.d.ts.map