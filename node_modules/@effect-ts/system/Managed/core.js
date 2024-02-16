"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Reservation = void 0;
exports.chain = chain;
exports.chain_ = chain_;
exports.ensuring = ensuring;
exports.ensuring_ = ensuring_;
exports.fail = fail;
exports.failWith = failWith;
exports.finalizerRef = finalizerRef;
exports.foldCauseM = foldCauseM;
exports.foldCauseM_ = foldCauseM_;
exports.make = make;
exports.makeInterruptible = makeInterruptible;
exports.makeInterruptible_ = makeInterruptible_;
exports.makeManagedReleaseMap = makeManagedReleaseMap;
exports.makeReservation = makeReservation;
exports.makeReservation_ = makeReservation_;
exports.makeReserve = makeReserve;
exports.make_ = make_;
exports.managedReserve = managedReserve;
exports.map = map;
exports.mapM = mapM;
exports.mapM_ = mapM_;
exports.map_ = map_;
exports.onExit = onExit;
exports.onExitFirst = onExitFirst;
exports.onExitFirst_ = onExitFirst_;
exports.onExit_ = onExit_;
exports.provideAll = provideAll;
exports.provideAll_ = provideAll_;
exports.provideSome = provideSome;
exports.provideSome_ = provideSome_;
exports.reserve = reserve;
exports.succeedWith = succeedWith;
exports.tap = tap;
exports.tap_ = tap_;
exports.useForever = useForever;
exports.useNow = useNow;
exports.zip = zip;
exports.zipWith = zipWith;
exports.zipWithPar = zipWithPar;
exports.zipWithPar_ = zipWithPar_;
exports.zipWith_ = zipWith_;
exports.zip_ = zip_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _ExecutionStrategy = /*#__PURE__*/require("../Effect/ExecutionStrategy.js");

var _index2 = /*#__PURE__*/require("../Function/index.js");

var _index3 = /*#__PURE__*/require("../Ref/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./deps-core.js"));

var _fromEffect = /*#__PURE__*/require("./fromEffect.js");

var _makeExit = /*#__PURE__*/require("./makeExit.js");

var _managed = /*#__PURE__*/require("./managed.js");

var add = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ReleaseMap/add.js"));

var addIfOpen = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ReleaseMap/addIfOpen.js"));

var makeReleaseMap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ReleaseMap/makeReleaseMap.js"));

var release = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ReleaseMap/release.js"));

var releaseAll = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ReleaseMap/releaseAll.js"));

var _use = /*#__PURE__*/require("./use.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns a managed that models the execution of this managed, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the managed that it returns.
 *
 * @ets_data_first chain_
 */
function chain(f, __trace) {
  return self => chain_(self, f, __trace);
}
/**
 * Returns a managed that models the execution of this managed, followed by
 * the passing of its value to the specified continuation function `f`,
 * followed by the managed that it returns.
 */


function chain_(self, f, __trace) {
  return (0, _managed.managedApply)(T.chain_(self.effect, ({
    tuple: [releaseSelf, a]
  }) => T.map_(f(a).effect, ({
    tuple: [releaseThat, b]
  }) => Tp.tuple(e => T.chain_(T.result(releaseThat(e)), e1 => T.chain_(T.result(releaseSelf(e)), e2 => T.done(T.exitZipRight_(e1, e2), __trace))), b), __trace)));
}
/**
 * Imports a synchronous side-effect into a pure value
 */


function succeedWith(effect, __trace) {
  return (0, _fromEffect.fromEffect)(T.succeedWith(effect, __trace));
}
/**
 * Ensures that `f` is executed when this Managed is finalized, after
 * the existing finalizer.
 *
 * For usecases that need access to the Managed's result, see `onExit`.
 */


function ensuring_(self, f, __trace) {
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


function ensuring(f, __trace) {
  return self => ensuring_(self, f, __trace);
}
/**
 * Returns an effect that models failure with the specified error. The moral equivalent of throw for pure code.
 */


function fail(e, __trace) {
  return (0, _fromEffect.fromEffect)(T.fail(e, __trace));
}
/**
 * Returns an effect that models failure with the specified error. The moral equivalent of throw for pure code.
 */


function failWith(e, __trace) {
  return (0, _fromEffect.fromEffect)(T.failWith(e, __trace));
}
/**
 * Creates an effect that executes a finalizer stored in a `Ref`.
 * The `Ref` is yielded as the result of the effect, allowing for
 * control flows that require mutating finalizers.
 */


function finalizerRef(initial, __trace) {
  return (0, _makeExit.makeExit_)((0, _index3.makeRef)(initial), (ref, exit) => T.chain_(ref.get, f => f(exit)), __trace);
}
/**
 * A more powerful version of `foldM` that allows recovering from any kind of failure except interruptions.
 *
 * @ets_data_first foldCauseM_
 */


function foldCauseM(f, g, __trace) {
  return self => foldCauseM_(self, f, g, __trace);
}
/**
 * A more powerful version of `foldM` that allows recovering from any kind of failure except interruptions.
 */


function foldCauseM_(self, f, g, __trace) {
  return (0, _managed.managedApply)(T.foldCauseM_(self.effect, c => f(c).effect, ({
    tuple: [_, a]
  }) => g(a).effect, __trace));
}
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action.
 * The acquire and release actions will be performed uninterruptibly.
 *
 * @ets_data_first make_
 */


function make(release, __trace) {
  return acquire => make_(acquire, release, __trace);
}
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action.
 * The acquire and release actions will be performed uninterruptibly.
 */


function make_(acquire, release, __trace) {
  return (0, _makeExit.makeExit_)(acquire, release, __trace);
}
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action.
 * The acquire action will be performed interruptibly, while release
 * will be performed uninterruptibly.
 *
 * @ets_data_first makeInterruptible_
 */


function makeInterruptible(release, __trace) {
  return acquire => makeInterruptible_(acquire, release, __trace);
}
/**
 * Lifts a `Effect< R, E, A>` into `Managed< R, E, A>` with a release action.
 * The acquire action will be performed interruptibly, while release
 * will be performed uninterruptibly.
 */


function makeInterruptible_(acquire, release, __trace) {
  return onExitFirst_((0, _fromEffect.fromEffect)(acquire, __trace), T.exitForeach(release), __trace);
}
/**
 * Construct a `ReleaseMap` wrapped in a `Managed`. The `ReleaseMap` will
 * be released with the specified `ExecutionStrategy` as the release action
 * for the resulting `Managed`.
 */


function makeManagedReleaseMap(es, __trace) {
  return (0, _makeExit.makeExit_)(makeReleaseMap.makeReleaseMap, (rm, e) => releaseAll.releaseAll(e, es)(rm), __trace);
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


function makeReserve(reservation, __trace) {
  return (0, _managed.managedApply)(T.uninterruptibleMask(({
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


function map(f, __trace) {
  return self => map_(self, f, __trace);
}
/**
 * Returns a managed whose success is mapped by the specified `f` function.
 */


function map_(self, f, __trace) {
  return (0, _managed.managedApply)(T.map_(self.effect, ({
    tuple: [fin, a]
  }) => Tp.tuple(fin, f(a)), __trace));
}
/**
 * Returns a managed whose success is mapped by the specified `f` function.
 */


function mapM_(self, f, __trace) {
  return (0, _managed.managedApply)(T.chain_(self.effect, ({
    tuple: [fin, a]
  }) => T.provideSome_(T.map_(f(a), b => Tp.tuple(fin, b), __trace), ({
    tuple: [r]
  }) => r)));
}
/**
 * Returns a managed whose success is mapped by the specified `f` function.
 */


function mapM(f, __trace) {
  return self => mapM_(self, f, __trace);
}
/**
 * Ensures that a cleanup function runs when this Managed is finalized, after
 * the existing finalizers.
 */


function onExit_(self, cleanup, __trace) {
  return (0, _managed.managedApply)(T.uninterruptibleMask(({
    restore
  }) => T.map_(T.bind_(T.bind_(T.bind_(T.bind_(T.let_(T.let_(T.bind_(T.do, "tp", () => T.environment()), "r", s => s.tp.get(0)), "outerReleaseMap", s => s.tp.get(1)), "innerReleaseMap", () => makeReleaseMap.makeReleaseMap), "exitEA", s => T.provideAll_(T.result(restore(T.map_(self.effect, ({
    tuple: [_, a]
  }) => a))), Tp.tuple(s.r, s.innerReleaseMap))), "releaseMapEntry", s => add.add(e => T.flatten(T.zipWith_(T.result(releaseAll.releaseAll(e, _ExecutionStrategy.sequential)(s.innerReleaseMap)), T.result(T.provideAll_(cleanup(s.exitEA), s.r)), (l, r) => T.done(T.exitZipRight_(l, r)), __trace)))(s.outerReleaseMap)), "a", s => T.done(s.exitEA)), s => Tp.tuple(s.releaseMapEntry, s.a))));
}
/**
 * Ensures that a cleanup function runs when this Managed is finalized, after
 * the existing finalizers.
 *
 * @ets_data_first onExit_
 */


function onExit(cleanup, __trace) {
  return self => onExit_(self, cleanup, __trace);
}
/**
 * Ensures that a cleanup function runs when this Managed is finalized, before
 * the existing finalizers.
 *
 * @ets_data_first onExitFirst_
 */


function onExitFirst(cleanup, __trace) {
  return self => onExitFirst_(self, cleanup, __trace);
}
/**
 * Ensures that a cleanup function runs when this Managed is finalized, before
 * the existing finalizers.
 */


function onExitFirst_(self, cleanup, __trace) {
  return (0, _managed.managedApply)(T.uninterruptibleMask(({
    restore
  }) => T.map_(T.bind_(T.bind_(T.bind_(T.bind_(T.let_(T.let_(T.bind_(T.do, "tp", () => T.environment()), "r", s => s.tp.get(0)), "outerReleaseMap", s => s.tp.get(1)), "innerReleaseMap", () => makeReleaseMap.makeReleaseMap), "exitEA", s => T.provideAll_(T.result(restore(T.map_(self.effect, ({
    tuple: [_, a]
  }) => a))), Tp.tuple(s.r, s.innerReleaseMap))), "releaseMapEntry", s => add.add(e => T.flatten(T.zipWith_(T.result(T.provideAll_(cleanup(s.exitEA), s.r, __trace)), T.result(releaseAll.releaseAll(e, _ExecutionStrategy.sequential)(s.innerReleaseMap)), (l, r) => T.done(T.exitZipRight_(l, r)))))(s.outerReleaseMap)), "a", s => T.done(s.exitEA)), s => Tp.tuple(s.releaseMapEntry, s.a))));
}
/**
 * Like provideSome_ for effect but for Managed
 */


function provideSome_(self, f, __trace) {
  return (0, _managed.managedApply)(T.accessM(({
    tuple: [r0, rm]
  }) => T.provideAll_(self.effect, Tp.tuple(f(r0), rm), __trace)));
}
/**
 * Like provideSome for effect but for Managed
 *
 * @ets_data_first provideSome_
 */


function provideSome(f, __trace) {
  return self => provideSome_(self, f, __trace);
}
/**
 * Provides the `Managed` effect with its required environment, which eliminates
 * its dependency on `R`.
 *
 * @ets_data_first provideAll_
 */


function provideAll(r, __trace) {
  return self => provideAll_(self, r);
}
/**
 * Provides the `Managed` effect with its required environment, which eliminates
 * its dependency on `R`.
 */


function provideAll_(self, r, __trace) {
  return provideSome_(self, () => r, __trace);
}
/**
 * A `Reservation<R, E, A>` encapsulates resource acquisition and disposal
 * without specifying when or how that resource might be used.
 *
 * See `Managed#reserve` and `Effect#reserve` for details of usage.
 */


class Reservation {
  constructor(acquire, release) {
    this.acquire = acquire;
    this.release = release;
  }

}

exports.Reservation = Reservation;

Reservation.of = (acquire, release) => new Reservation(acquire, release);
/**
 * Make a new reservation
 */


function makeReservation_(acquire, release) {
  return Reservation.of(acquire, release);
}
/**
 * Make a new reservation
 *
 * @ets_data_first makeReservation_
 */


function makeReservation(release) {
  return acquire => Reservation.of(acquire, release);
}
/**
 * Lifts a pure `Reservation< R, E, A>` into `Managed< R, E, A>`. The acquisition step
 * is performed interruptibly.
 */


function reserve(reservation, __trace) {
  return makeReserve(T.succeed(reservation), __trace);
}
/**
 * Returns a managed that effectfully peeks at the acquired resource.
 */


function tap_(self, f, __trace) {
  return chain_(self, a => map_(f(a), () => a), __trace);
}
/**
 * Returns a managed that effectfully peeks at the acquired resource.
 *
 * @ets_data_first tap_
 */


function tap(f, __trace) {
  return self => tap_(self, f, __trace);
}
/**
 * Runs the acquire and release actions and returns the result of this
 * managed effect. Note that this is only safe if the result of this managed
 * effect is valid outside its scope.
 */


function useNow(self, __trace) {
  return (0, _use.use_)(self, T.succeed, __trace);
}
/**
 * Use the resource until interruption. Useful for resources that you want
 * to acquire and use as long as the application is running, like a
 * HTTP server.
 */


function useForever(self, __trace) {
  return (0, _use.use_)(self, () => T.never, __trace);
}
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in sequence, combining their results with the specified `f` function.
 */


function zip_(self, that, __trace) {
  return zipWith_(self, that, (a, a2) => [a, a2], __trace);
}
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in sequence, combining their results with the specified `f` function.
 *
 * @ets_data_first zip_
 */


function zip(that, __trace) {
  return self => zip_(self, that, __trace);
}
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in sequence, combining their results with the specified `f` function.
 *
 * @ets_data_first zipWith_
 */


function zipWith(that, f, __trace) {
  return self => zipWith_(self, that, f, __trace);
}
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in sequence, combining their results with the specified `f` function.
 */


function zipWith_(self, that, f, __trace) {
  return chain_(self, a => map_(that, a2 => f(a, a2)), __trace);
}
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in parallel, combining their results with the specified `f` function.
 *
 * @ets_data_first zipWithPar_
 */


function zipWithPar(that, f, __trace) {
  return self => zipWithPar_(self, that, f, __trace);
}
/**
 * Returns a managed that executes both this managed and the specified managed,
 * in parallel, combining their results with the specified `f` function.
 */


function zipWithPar_(self, that, f, __trace) {
  return mapM_(makeManagedReleaseMap(_ExecutionStrategy.parallel), parallelReleaseMap => {
    const innerMap = T.provideSome_(makeManagedReleaseMap(_ExecutionStrategy.sequential).effect, r => Tp.tuple(r, parallelReleaseMap));
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


function managedReserve(self) {
  return T.map_(makeReleaseMap.makeReleaseMap, releaseMap => Reservation.of(T.map_(T.provideSome_(self.effect, _ => Tp.tuple(_, releaseMap)), Tp.get(1)), _ => releaseAll.releaseAll(_, T.sequential)(releaseMap)));
}
//# sourceMappingURL=core.js.map