import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { parallel, sequential } from "../Effect/ExecutionStrategy.mjs";
import { pipe } from "../Function/index.mjs";
import { makeRef } from "../Ref/index.mjs";
import * as T from "./deps-core.mjs";
import { fromEffect } from "./fromEffect.mjs";
import { makeExit_ } from "./makeExit.mjs";
import { managedApply } from "./managed.mjs";
import * as add from "./ReleaseMap/add.mjs";
import * as addIfOpen from "./ReleaseMap/addIfOpen.mjs";
import * as makeReleaseMap from "./ReleaseMap/makeReleaseMap.mjs";
import * as release from "./ReleaseMap/release.mjs";
import * as releaseAll from "./ReleaseMap/releaseAll.mjs";
import { use_ } from "./use.mjs";
/**
 * Returns a managed that models the execution of this managed, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the managed that it returns.
 *
 * @ets_data_first chain_
 */

export function chain(f, __trace) {
  return self => chain_(self, f, __trace);
}
/**
 * Returns a managed that models the execution of this managed, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the managed that it returns.
 */

export function chain_(self, f, __trace) {
  return managedApply(T.chain_(self.effect, ({
    tuple: [releaseSelf, a]
  }) => T.map_(f(a).effect, ({
    tuple: [releaseThat, b]
  }) => Tp.tuple(e => T.chain_(T.result(releaseThat(e)), e1 => T.chain_(T.result(releaseSelf(e)), e2 => T.done(T.exitZipRight_(e1, e2), __trace))), b), __trace)));
}
/**
 * Imports a synchronous side-effect into a pure value
 */

export function succeedWith(effect, __trace) {
  return fromEffect(T.succeedWith(effect, __trace));
}
/**
 * Ensures that `f` is executed when this Managed is finalized, after
 * the existing finalizer.
 *
 * For usecases that need access to the Managed's result, see `onExit`.
 */

export function ensuring_(self, f, __trace) {
  return onExit_(self, () => f, __trace);
}
/**
 * Ensures that `f` is executed when this Managed is finalized, after
 * the existing finalizer.
 *
 * For usecases that need access to the Managed's result, see `onExit`.
 *
 * @ets_data_first ensuring_
 */

export function ensuring(f, __trace) {
  return self => ensuring_(self, f, __trace);
}
/**
 * Returns an effect that models failure with the specified error. The moral equivalent of throw for pure code.
 */

export function fail(e, __trace) {
  return fromEffect(T.fail(e, __trace));
}
/**
 * Returns an effect that models failure with the specified error. The moral equivalent of throw for pure code.
 */

export function failWith(e, __trace) {
  return fromEffect(T.failWith(e, __trace));
}
/**
 * Creates an effect that executes a finalizer stored in a `Ref`.
 * The `Ref` is yielded as the result of the effect, allowing for
 * control flows that require mutating finalizers.
 */

export function finalizerRef(initial, __trace) {
  return makeExit_(makeRef(initial), (ref, exit) => T.chain_(ref.get, f => f(exit)), __trace);
}
/**
 * A more powerful version of `foldM` that allows recovering from any kind of failure except interruptions.
 *
 * @ets_data_first foldCauseM_
 */

export function foldCauseM(f, g, __trace) {
  return self => foldCauseM_(self, f, g, __trace);
}
/**
 * A more powerful version of `foldM` that allows recovering from any kind of failure except interruptions.
 */

export function foldCauseM_(self, f, g, __trace) {
  return managedApply(T.foldCauseM_(self.effect, c => f(c).effect, ({
    tuple: [_, a]
  }) => g(a).effect, __trace));
}
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action.
 * The acquire and release actions will be performed uninterruptibly.
 *
 * @ets_data_first make_
 */

export function make(release, __trace) {
  return acquire => make_(acquire, release, __trace);
}
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action.
 * The acquire and release actions will be performed uninterruptibly.
 */

export function make_(acquire, release, __trace) {
  return makeExit_(acquire, release, __trace);
}
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action.
 * The acquire action will be performed interruptibly, while release
 * will be performed uninterruptibly.
 *
 * @ets_data_first makeInterruptible_
 */

export function makeInterruptible(release, __trace) {
  return acquire => makeInterruptible_(acquire, release, __trace);
}
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action.
 * The acquire action will be performed interruptibly, while release
 * will be performed uninterruptibly.
 */

export function makeInterruptible_(acquire, release, __trace) {
  return onExitFirst_(fromEffect(acquire, __trace), T.exitForeach(release), __trace);
}
/**
 * Construct a `ReleaseMap` wrapped in a `Managed`. The `ReleaseMap` will
 * be released with the specified `ExecutionStrategy` as the release action
 * for the resulting `Managed`.
 */

export function makeManagedReleaseMap(es, __trace) {
  return makeExit_(makeReleaseMap.makeReleaseMap, (rm, e) => releaseAll.releaseAll(e, es)(rm), __trace);
}
/**
 * Creates a `Managed` from a `Reservation` produced by an effect. Evaluating
 * the effect that produces the reservation will be performed *uninterruptibly*,
 * while the acquisition step of the reservation will be performed *interruptibly*.
 * The release step will be performed uninterruptibly as usual.
 *
 * This two-phase acquisition allows for resource acquisition flows that can be
 * safely interrupted and released.
 */

export function makeReserve(reservation, __trace) {
  return managedApply(T.uninterruptibleMask(({
    restore
  }) => T.map_(T.bind_(T.bind_(T.bind_(T.let_(T.let_(T.bind_(T.do, "tp", () => T.environment()), "r", s => s.tp.get(0)), "releaseMap", s => s.tp.get(1)), "reserved", s => T.provideAll_(reservation, s.r)), "releaseKey", s => addIfOpen.addIfOpen(x => T.provideAll_(s.reserved.release(x), s.r, __trace))(s.releaseMap)), "finalizerAndA", s => {
    const k = s.releaseKey;

    switch (k._tag) {
      case "None":
        {
          return T.interrupt;
        }

      case "Some":
        {
          return T.map_(restore(T.provideSome_(s.reserved.acquire, ({
            tuple: [r]
          }) => r, __trace)), a => Tp.tuple(e => release.release(k.value, e)(s.releaseMap), a));
        }
    }
  }), s => s.finalizerAndA)));
}
/**
 * Returns a managed whose success is mapped by the specified `f` function.
 *
 * @ets_data_first map_
 */

export function map(f, __trace) {
  return self => map_(self, f, __trace);
}
/**
 * Returns a managed whose success is mapped by the specified `f` function.
 */

export function map_(self, f, __trace) {
  return managedApply(T.map_(self.effect, ({
    tuple: [fin, a]
  }) => Tp.tuple(fin, f(a)), __trace));
}
/**
 * Returns a managed whose success is mapped by the specified `f` function.
 */

export function mapM_(self, f, __trace) {
  return managedApply(T.chain_(self.effect, ({
    tuple: [fin, a]
  }) => T.provideSome_(T.map_(f(a), b => Tp.tuple(fin, b), __trace), ({
    tuple: [r]
  }) => r)));
}
/**
 * Returns a managed whose success is mapped by the specified `f` function.
 */

export function mapM(f, __trace) {
  return self => mapM_(self, f, __trace);
}
/**
 * Ensures that a cleanup function runs when this Managed is finalized, after
 * the existing finalizers.
 */

export function onExit_(self, cleanup, __trace) {
  return managedApply(T.uninterruptibleMask(({
    restore
  }) => T.map_(T.bind_(T.bind_(T.bind_(T.bind_(T.let_(T.let_(T.bind_(T.do, "tp", () => T.environment()), "r", s => s.tp.get(0)), "outerReleaseMap", s => s.tp.get(1)), "innerReleaseMap", () => makeReleaseMap.makeReleaseMap), "exitEA", s => T.provideAll_(T.result(restore(T.map_(self.effect, ({
    tuple: [_, a]
  }) => a))), Tp.tuple(s.r, s.innerReleaseMap))), "releaseMapEntry", s => add.add(e => T.flatten(T.zipWith_(T.result(releaseAll.releaseAll(e, sequential)(s.innerReleaseMap)), T.result(T.provideAll_(cleanup(s.exitEA), s.r)), (l, r) => T.done(T.exitZipRight_(l, r)), __trace)))(s.outerReleaseMap)), "a", s => T.done(s.exitEA)), s => Tp.tuple(s.releaseMapEntry, s.a))));
}
/**
 * Ensures that a cleanup function runs when this Managed is finalized, after
 * the existing finalizers.
 *
 * @ets_data_first onExit_
 */

export function onExit(cleanup, __trace) {
  return self => onExit_(self, cleanup, __trace);
}
/**
 * Ensures that a cleanup function runs when this Managed is finalized, before
 * the existing finalizers.
 *
 * @ets_data_first onExitFirst_
 */

export function onExitFirst(cleanup, __trace) {
  return self => onExitFirst_(self, cleanup, __trace);
}
/**
 * Ensures that a cleanup function runs when this Managed is finalized, before
 * the existing finalizers.
 */

export function onExitFirst_(self, cleanup, __trace) {
  return managedApply(T.uninterruptibleMask(({
    restore
  }) => T.map_(T.bind_(T.bind_(T.bind_(T.bind_(T.let_(T.let_(T.bind_(T.do, "tp", () => T.environment()), "r", s => s.tp.get(0)), "outerReleaseMap", s => s.tp.get(1)), "innerReleaseMap", () => makeReleaseMap.makeReleaseMap), "exitEA", s => T.provideAll_(T.result(restore(T.map_(self.effect, ({
    tuple: [_, a]
  }) => a))), Tp.tuple(s.r, s.innerReleaseMap))), "releaseMapEntry", s => add.add(e => T.flatten(T.zipWith_(T.result(T.provideAll_(cleanup(s.exitEA), s.r, __trace)), T.result(releaseAll.releaseAll(e, sequential)(s.innerReleaseMap)), (l, r) => T.done(T.exitZipRight_(l, r)))))(s.outerReleaseMap)), "a", s => T.done(s.exitEA)), s => Tp.tuple(s.releaseMapEntry, s.a))));
}
/**
 * Like provideSome_ for effect but for Managed
 */

export function provideSome_(self, f, __trace) {
  return managedApply(T.accessM(({
    tuple: [r0, rm]
  }) => T.provideAll_(self.effect, Tp.tuple(f(r0), rm), __trace)));
}
/**
 * Like provideSome for effect but for Managed
 *
 * @ets_data_first provideSome_
 */

export function provideSome(f, __trace) {
  return self => provideSome_(self, f, __trace);
}
/**
 * Provides the `Managed` effect with its required environment, which eliminates
 * its dependency on `R`.
 *
 * @ets_data_first provideAll_
 */

export function provideAll(r, __trace) {
  return self => provideAll_(self, r);
}
/**
 * Provides the `Managed` effect with its required environment, which eliminates
 * its dependency on `R`.
 */

export function provideAll_(self, r, __trace) {
  return provideSome_(self, () => r, __trace);
}
/**
 * A `Reservation<R, E, A>` encapsulates resource acquisition and disposal
 * without specifying when or how that resource might be used.
 *
 * See `Managed#reserve` and `Effect#reserve` for details of usage.
 */

export class Reservation {
  constructor(acquire, release) {
    this.acquire = acquire;
    this.release = release;
  }

}

Reservation.of = (acquire, release) => new Reservation(acquire, release);
/**
 * Make a new reservation
 */


export function makeReservation_(acquire, release) {
  return Reservation.of(acquire, release);
}
/**
 * Make a new reservation
 *
 * @ets_data_first makeReservation_
 */

export function makeReservation(release) {
  return acquire => Reservation.of(acquire, release);
}
/**
 * Lifts a pure `Reservation< R, E, A>` into `Managed< R, E, A>`. The acquisition step
 * is performed interruptibly.
 */

export function reserve(reservation, __trace) {
  return makeReserve(T.succeed(reservation), __trace);
}
/**
 * Returns a managed that effectfully peeks at the acquired resource.
 */

export function tap_(self, f, __trace) {
  return chain_(self, a => map_(f(a), () => a), __trace);
}
/**
 * Returns a managed that effectfully peeks at the acquired resource.
 *
 * @ets_data_first tap_
 */

export function tap(f, __trace) {
  return self => tap_(self, f, __trace);
}
/**
 * Runs the acquire and release actions and returns the result of this
 * managed effect. Note that this is only safe if the result of this managed
 * effect is valid outside its scope.
 */

export function useNow(self, __trace) {
  return use_(self, T.succeed, __trace);
}
/**
 * Use the resource until interruption. Useful for resources that you want
 * to acquire and use as long as the application is running, like a
 * HTTP server.
 */

export function useForever(self, __trace) {
  return use_(self, () => T.never, __trace);
}
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in sequence, combining their results with the specified `f` function.
 */

export function zip_(self, that, __trace) {
  return zipWith_(self, that, (a, a2) => [a, a2], __trace);
}
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in sequence, combining their results with the specified `f` function.
 *
 * @ets_data_first zip_
 */

export function zip(that, __trace) {
  return self => zip_(self, that, __trace);
}
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in sequence, combining their results with the specified `f` function.
 *
 * @ets_data_first zipWith_
 */

export function zipWith(that, f, __trace) {
  return self => zipWith_(self, that, f, __trace);
}
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in sequence, combining their results with the specified `f` function.
 */

export function zipWith_(self, that, f, __trace) {
  return chain_(self, a => map_(that, a2 => f(a, a2)), __trace);
}
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in parallel, combining their results with the specified `f` function.
 *
 * @ets_data_first zipWithPar_
 */

export function zipWithPar(that, f, __trace) {
  return self => zipWithPar_(self, that, f, __trace);
}
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in parallel, combining their results with the specified `f` function.
 */

export function zipWithPar_(self, that, f, __trace) {
  return mapM_(makeManagedReleaseMap(parallel), parallelReleaseMap => {
    const innerMap = T.provideSome_(makeManagedReleaseMap(sequential).effect, r => Tp.tuple(r, parallelReleaseMap));
    return T.chain_(T.zip_(innerMap, innerMap, __trace), ({
      tuple: [{
        tuple: [_, l]
      }, {
        tuple: [__, r]
      }]
    }) => T.zipWithPar_(T.provideSome_(self.effect, _ => Tp.tuple(_, l)), T.provideSome_(that.effect, _ => Tp.tuple(_, r)), ({
      tuple: [_, a]
    }, {
      tuple: [__, a2]
    }) => f(a, a2), __trace));
  });
}
/**
 * Returns a `Reservation` that allows separately accessing effects
 * describing resource acquisition and release.
 */

export function managedReserve(self) {
  return T.map_(makeReleaseMap.makeReleaseMap, releaseMap => Reservation.of(T.map_(T.provideSome_(self.effect, _ => Tp.tuple(_, releaseMap)), Tp.get(1)), _ => releaseAll.releaseAll(_, T.sequential)(releaseMap)));
}
//# sourceMappingURL=core.mjs.map