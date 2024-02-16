import type { Cause } from "../Cause/cause.js";
import type { ExecutionStrategy } from "../Effect/ExecutionStrategy.js";
import * as T from "./deps-core.js";
import type { Managed } from "./managed.js";
import type { Finalizer } from "./ReleaseMap/finalizer.js";
import type { ReleaseMap } from "./ReleaseMap/index.js";
/**
 * Returns a managed that models the execution of this managed, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the managed that it returns.
 *
 * @ets_data_first chain_
 */
export declare function chain<A, R2, E2, A2>(f: (a: A) => Managed<R2, E2, A2>, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R & R2, E2 | E, A2>;
/**
 * Returns a managed that models the execution of this managed, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the managed that it returns.
 */
export declare function chain_<R, E, A, R2, E2, A2>(self: Managed<R, E, A>, f: (a: A) => Managed<R2, E2, A2>, __trace?: string): Managed<R & R2, E | E2, A2>;
/**
 * Imports a synchronous side-effect into a pure value
 */
export declare function succeedWith<A>(effect: () => A, __trace?: string): Managed<unknown, never, A>;
/**
 * Ensures that `f` is executed when this Managed is finalized, after
 * the existing finalizer.
 *
 * For usecases that need access to the Managed's result, see `onExit`.
 */
export declare function ensuring_<R, E, A, R2, X>(self: Managed<R, E, A>, f: T.Effect<R2, never, X>, __trace?: string): Managed<R & R2, E, A>;
/**
 * Ensures that `f` is executed when this Managed is finalized, after
 * the existing finalizer.
 *
 * For usecases that need access to the Managed's result, see `onExit`.
 *
 * @ets_data_first ensuring_
 */
export declare function ensuring<R2, X>(f: T.Effect<R2, never, X>, __trace?: string): <R, E, A>(self: Managed<R, E, A>) => Managed<R & R2, E, A>;
/**
 * Returns an effect that models failure with the specified error. The moral equivalent of throw for pure code.
 */
export declare function fail<E>(e: E, __trace?: string): Managed<unknown, E, never>;
/**
 * Returns an effect that models failure with the specified error. The moral equivalent of throw for pure code.
 */
export declare function failWith<E>(e: () => E, __trace?: string): Managed<unknown, E, never>;
/**
 * Creates an effect that executes a finalizer stored in a `Ref`.
 * The `Ref` is yielded as the result of the effect, allowing for
 * control flows that require mutating finalizers.
 */
export declare function finalizerRef(initial: Finalizer, __trace?: string): Managed<unknown, never, import("../Ref/XRef.js").Ref<Finalizer>>;
/**
 * A more powerful version of `foldM` that allows recovering from any kind of failure except interruptions.
 *
 * @ets_data_first foldCauseM_
 */
export declare function foldCauseM<E, A, R1, E1, A1, R2, E2, A2>(f: (cause: Cause<E>) => Managed<R1, E1, A1>, g: (a: A) => Managed<R2, E2, A2>, __trace?: string): <R>(self: Managed<R, E, A>) => Managed<R & R1 & R2, E1 | E2, A1 | A2>;
/**
 * A more powerful version of `foldM` that allows recovering from any kind of failure except interruptions.
 */
export declare function foldCauseM_<R, E, A, R1, E1, A1, R2, E2, A2>(self: Managed<R, E, A>, f: (cause: Cause<E>) => Managed<R1, E1, A1>, g: (a: A) => Managed<R2, E2, A2>, __trace?: string): Managed<R & R1 & R2, E1 | E2, A1 | A2>;
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action.
 * The acquire and release actions will be performed uninterruptibly.
 *
 * @ets_data_first make_
 */
export declare function make<R1, A>(release: (a: A) => T.Effect<R1, never, unknown>, __trace?: string): <R, E>(acquire: T.Effect<R, E, A>) => Managed<R & R1, E, A>;
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action.
 * The acquire and release actions will be performed uninterruptibly.
 */
export declare function make_<R, E, A, R1>(acquire: T.Effect<R, E, A>, release: (a: A) => T.Effect<R1, never, unknown>, __trace?: string): Managed<R & R1, E, A>;
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action.
 * The acquire action will be performed interruptibly, while release
 * will be performed uninterruptibly.
 *
 * @ets_data_first makeInterruptible_
 */
export declare function makeInterruptible<A, R1>(release: (a: A) => T.Effect<R1, never, unknown>, __trace?: string): <R, E>(acquire: T.Effect<R, E, A>) => Managed<R & R1, E, A>;
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action.
 * The acquire action will be performed interruptibly, while release
 * will be performed uninterruptibly.
 */
export declare function makeInterruptible_<R, E, A, R1>(acquire: T.Effect<R, E, A>, release: (a: A) => T.Effect<R1, never, unknown>, __trace?: string): Managed<R & R1, E, A>;
/**
 * Construct a `ReleaseMap` wrapped in a `Managed`. The `ReleaseMap` will
 * be released with the specified `ExecutionStrategy` as the release action
 * for the resulting `Managed`.
 */
export declare function makeManagedReleaseMap(es: ExecutionStrategy, __trace?: string): Managed<unknown, never, ReleaseMap>;
/**
 * Creates a `Managed` from a `Reservation` produced by an effect. Evaluating
 * the effect that produces the reservation will be performed *uninterruptibly*,
 * while the acquisition step of the reservation will be performed *interruptibly*.
 * The release step will be performed uninterruptibly as usual.
 *
 * This two-phase acquisition allows for resource acquisition flows that can be
 * safely interrupted and released.
 */
export declare function makeReserve<R, E, R2, E2, A>(reservation: T.Effect<R, E, Reservation<R2, E2, A>>, __trace?: string): Managed<R & R2, E | E2, A>;
/**
 * Returns a managed whose success is mapped by the specified `f` function.
 *
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (a: A) => B, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R, E, B>;
/**
 * Returns a managed whose success is mapped by the specified `f` function.
 */
export declare function map_<R, E, A, B>(self: Managed<R, E, A>, f: (a: A) => B, __trace?: string): Managed<R, E, B>;
/**
 * Returns a managed whose success is mapped by the specified `f` function.
 */
export declare function mapM_<R, E, A, R2, E2, B>(self: Managed<R, E, A>, f: (a: A) => T.Effect<R2, E2, B>, __trace?: string): Managed<R & R2, E | E2, B>;
/**
 * Returns a managed whose success is mapped by the specified `f` function.
 */
export declare function mapM<A, R2, E2, B>(f: (a: A) => T.Effect<R2, E2, B>, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R & R2, E2 | E, B>;
/**
 * Ensures that a cleanup function runs when this Managed is finalized, after
 * the existing finalizers.
 */
export declare function onExit_<R, E, A, R2, X>(self: Managed<R, E, A>, cleanup: (exit: T.Exit<E, A>) => T.Effect<R2, never, X>, __trace?: string): Managed<R & R2, E, A>;
/**
 * Ensures that a cleanup function runs when this Managed is finalized, after
 * the existing finalizers.
 *
 * @ets_data_first onExit_
 */
export declare function onExit<E, A, R2, X>(cleanup: (exit: T.Exit<E, A>) => T.Effect<R2, never, X>, __trace?: string): <R>(self: Managed<R, E, A>) => Managed<R & R2, E, A>;
/**
 * Ensures that a cleanup function runs when this Managed is finalized, before
 * the existing finalizers.
 *
 * @ets_data_first onExitFirst_
 */
export declare function onExitFirst<E, A, R2, X>(cleanup: (exit: T.Exit<E, A>) => T.Effect<R2, never, X>, __trace?: string): <R>(self: Managed<R, E, A>) => Managed<R & R2, E, A>;
/**
 * Ensures that a cleanup function runs when this Managed is finalized, before
 * the existing finalizers.
 */
export declare function onExitFirst_<R, E, A, R2, X>(self: Managed<R, E, A>, cleanup: (exit: T.Exit<E, A>) => T.Effect<R2, never, X>, __trace?: string): Managed<R & R2, E, A>;
/**
 * Like provideSome_ for effect but for Managed
 */
export declare function provideSome_<R, E, A, R0>(self: Managed<R, E, A>, f: (r0: R0) => R, __trace?: string): Managed<R0, E, A>;
/**
 * Like provideSome for effect but for Managed
 *
 * @ets_data_first provideSome_
 */
export declare function provideSome<R, R0>(f: (r0: R0) => R, __trace?: string): <E, A>(self: Managed<R, E, A>) => Managed<R0, E, A>;
/**
 * Provides the `Managed` effect with its required environment, which eliminates
 * its dependency on `R`.
 *
 * @ets_data_first provideAll_
 */
export declare function provideAll<R>(r: R, __trace?: string): <E, A>(self: Managed<R, E, A>) => Managed<unknown, E, A>;
/**
 * Provides the `Managed` effect with its required environment, which eliminates
 * its dependency on `R`.
 */
export declare function provideAll_<R, E, A>(self: Managed<R, E, A>, r: R, __trace?: string): Managed<unknown, E, A>;
/**
 * A `Reservation<R, E, A>` encapsulates resource acquisition and disposal
 * without specifying when or how that resource might be used.
 *
 * See `Managed#reserve` and `Effect#reserve` for details of usage.
 */
export declare class Reservation<R, E, A> {
    readonly acquire: T.Effect<R, E, A>;
    readonly release: (exit: T.Exit<any, any>) => T.Effect<R, never, unknown>;
    static of: <R_1, E_1, A_1, R2>(acquire: T.Effect<R_1, E_1, A_1>, release: (exit: T.Exit<any, any>) => T.Effect<R2, never, unknown>) => Reservation<R_1 & R2, E_1, A_1>;
    private constructor();
}
/**
 * Make a new reservation
 */
export declare function makeReservation_<R, E, A, R2>(acquire: T.Effect<R, E, A>, release: (exit: T.Exit<any, any>) => T.Effect<R2, never, unknown>): Reservation<R & R2, E, A>;
/**
 * Make a new reservation
 *
 * @ets_data_first makeReservation_
 */
export declare function makeReservation<R2>(release: (exit: T.Exit<any, any>) => T.Effect<R2, never, unknown>): <R, E, A>(acquire: T.Effect<R, E, A>) => Reservation<R & R2, E, A>;
/**
 * Lifts a pure `Reservation< R, E, A>` into `Managed< R, E, A>`. The acquisition step
 * is performed interruptibly.
 */
export declare function reserve<R, E, A>(reservation: Reservation<R, E, A>, __trace?: string): Managed<R, E, A>;
/**
 * Returns a managed that effectfully peeks at the acquired resource.
 */
export declare function tap_<A, R, R2, E, E2, X>(self: Managed<R, E, A>, f: (a: A) => Managed<R2, E2, X>, __trace?: string): Managed<R & R2, E | E2, A>;
/**
 * Returns a managed that effectfully peeks at the acquired resource.
 *
 * @ets_data_first tap_
 */
export declare function tap<A, R2, E2, X>(f: (a: A) => Managed<R2, E2, X>, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R & R2, E2 | E, A>;
/**
 * Runs the acquire and release actions and returns the result of this
 * managed effect. Note that this is only safe if the result of this managed
 * effect is valid outside its scope.
 */
export declare function useNow<R, E, A>(self: Managed<R, E, A>, __trace?: string): T.Effect<R, E, A>;
/**
 * Use the resource until interruption. Useful for resources that you want
 * to acquire and use as long as the application is running, like a
 * HTTP server.
 */
export declare function useForever<R, E, A>(self: Managed<R, E, A>, __trace?: string): T.Effect<R, E, never>;
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in sequence, combining their results with the specified `f` function.
 */
export declare function zip_<R, E, A, R2, E2, A2>(self: Managed<R, E, A>, that: Managed<R2, E2, A2>, __trace?: string): Managed<R & R2, E | E2, [A, A2]>;
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in sequence, combining their results with the specified `f` function.
 *
 * @ets_data_first zip_
 */
export declare function zip<R2, E2, A2>(that: Managed<R2, E2, A2>, __trace?: string): <R, E, A>(self: Managed<R, E, A>) => Managed<R & R2, E2 | E, [A, A2]>;
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in sequence, combining their results with the specified `f` function.
 *
 * @ets_data_first zipWith_
 */
export declare function zipWith<A, R2, E2, A2, B>(that: Managed<R2, E2, A2>, f: (a: A, a2: A2) => B, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R & R2, E2 | E, B>;
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in sequence, combining their results with the specified `f` function.
 */
export declare function zipWith_<R, E, A, R2, E2, A2, B>(self: Managed<R, E, A>, that: Managed<R2, E2, A2>, f: (a: A, a2: A2) => B, __trace?: string): Managed<R & R2, E | E2, B>;
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in parallel, combining their results with the specified `f` function.
 *
 * @ets_data_first zipWithPar_
 */
export declare function zipWithPar<A, R2, E2, A2, B>(that: Managed<R2, E2, A2>, f: (a: A, a2: A2) => B, __trace?: string): <R, E>(self: Managed<R, E, A>) => Managed<R & R2, E2 | E, B>;
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in parallel, combining their results with the specified `f` function.
 */
export declare function zipWithPar_<R, E, A, R2, E2, A2, B>(self: Managed<R, E, A>, that: Managed<R2, E2, A2>, f: (a: A, a2: A2) => B, __trace?: string): Managed<R & R2, E | E2, B>;
/**
 * Returns a `Reservation` that allows separately accessing effects
 * describing resource acquisition and release.
 */
export declare function managedReserve<R, E, A>(self: Managed<R, E, A>): T.UIO<Reservation<R, E, A>>;
//# sourceMappingURL=core.d.ts.map