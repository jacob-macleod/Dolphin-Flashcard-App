"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collect = collect;
exports.collectM = collectM;
exports.collectM_ = collectM_;
exports.collect_ = collect_;
exports.contramap = contramap;
exports.contramapM = contramapM;
exports.contramapM_ = contramapM_;
exports.contramap_ = contramap_;
exports.dequeueRef = dequeueRef;
exports.dimapError = dimapError;
exports.dimapError_ = dimapError_;
exports.dimapM = dimapM;
exports.dimapM_ = dimapM_;
exports.filterInput = filterInput;
exports.filterInputM = filterInputM;
exports.filterInputM_ = filterInputM_;
exports.filterInput_ = filterInput_;
exports.filterOutput = filterOutput;
exports.filterOutputM = filterOutputM;
exports.filterOutputM_ = filterOutputM_;
exports.filterOutput_ = filterOutput_;
exports.fold = fold;
exports.foldAllM = foldAllM;
exports.foldAllM_ = foldAllM_;
exports.foldM = foldM;
exports.foldM_ = foldM_;
exports.fold_ = fold_;
exports.get = get;
exports.getAndSet = getAndSet;
exports.getAndSet_ = getAndSet_;
exports.getAndUpdate = getAndUpdate;
exports.getAndUpdateSome = getAndUpdateSome;
exports.getAndUpdateSome_ = getAndUpdateSome_;
exports.getAndUpdate_ = getAndUpdate_;
exports.makeManagedRefM = makeManagedRefM;
exports.makeRefM = makeRefM;
exports.map = map;
exports.mapM = mapM;
exports.mapM_ = mapM_;
exports.map_ = map_;
exports.modify = modify;
exports.modifySome = modifySome;
exports.modifySome_ = modifySome_;
exports.modify_ = modify_;
exports.readOnly = readOnly;
exports.tapInput = tapInput;
exports.tapInput_ = tapInput_;
exports.tapOutput = tapOutput;
exports.tapOutput_ = tapOutput_;
exports.unsafeMakeRefM = unsafeMakeRefM;
exports.update = update;
exports.updateAndGet = updateAndGet;
exports.updateAndGet_ = updateAndGet_;
exports.updateSome = updateSome;
exports.updateSomeAndGet = updateSomeAndGet;
exports.updateSomeAndGet_ = updateSomeAndGet_;
exports.updateSome_ = updateSome_;
exports.update_ = update_;
exports.writeOnly = writeOnly;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index3 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Queue/index.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Ref/index.js"));

var S = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Semaphore/index.js"));

var _index8 = /*#__PURE__*/require("../Utils/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./effect.js"));

var _XRefM = /*#__PURE__*/require("./XRefM.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a new `XRefM` with the specified value.
 */
function makeRefM(a) {
  return T.map_(T.bind_(T.bind_(T.do, "ref", () => R.makeRef(a)), "semaphore", () => S.makeSemaphore(1)), ({
    ref,
    semaphore
  }) => new _XRefM.AtomicM(ref, semaphore));
}
/**
 * Creates a new `XRefM` with the specified value.
 */


function unsafeMakeRefM(a) {
  const ref = R.unsafeMakeRef(a);
  const semaphore = S.unsafeMakeSemaphore(1);
  return new _XRefM.AtomicM(ref, semaphore);
}
/**
 * Creates a new `RefM` with the specified value in the context of a
 * `Managed.`
 */


function makeManagedRefM(a) {
  return T.toManaged(makeRefM(a));
}
/**
 * Creates a new `RefM` and a `Dequeue` that will emit every change to the
 * `RefM`.
 */


function dequeueRef(a) {
  return T.map_(T.bind_(T.bind_(T.do, "ref", () => makeRefM(a)), "queue", () => Q.makeUnbounded()), ({
    queue,
    ref
  }) => [tapInput_(ref, a => Q.offer_(queue, a)), queue]);
}
/**
 * Atomically modifies the `RefM` with the specified function, which computes
 * a return value for the modification. This is a more powerful version of
 * `update`.
 */


function modify_(self, f) {
  return (0, _index8.matchTag)({
    AtomicM: atomic => S.withPermit_(T.chain_(T.chain_(atomic.ref.get, f), ({
      tuple: [b, a]
    }) => T.as_(atomic.ref.set(a), b)), atomic.semaphore),
    DerivedM: derived => derived.use((value, getEither, setEither) => S.withPermit_(T.chain_(value.ref.get, a => T.chain_(T.chain_(getEither(a), f), ({
      tuple: [b, a]
    }) => T.as_(T.chain_(setEither(a), a => value.ref.set(a)), b))), value.semaphore)),
    DerivedAllM: derivedAll => derivedAll.use((value, getEither, setEither) => S.withPermit_(T.chain_(value.ref.get, s => T.chain_(T.chain_(getEither(s), f), ({
      tuple: [b, a]
    }) => T.as_(T.chain_(setEither(a)(s), a => value.ref.set(a)), b))), value.semaphore))
  })((0, _XRefM.concrete)(self));
}
/**
 * Atomically modifies the `RefM` with the specified function, which computes
 * a return value for the modification. This is a more powerful version of
 * `update`.
 */


function modify(f) {
  return self => modify_(self, f);
}
/**
 * Reads the value from the `XRefM`.
 */


function get(self) {
  return self.get;
}
/**
 * Writes a new value to the `RefM`, returning the value immediately before
 * modification.
 */


function getAndSet_(self, a) {
  return modify_(self, v => T.succeed(Tp.tuple(v, a)));
}
/**
 * Writes a new value to the `RefM`, returning the value immediately before
 * modification.
 */


function getAndSet(a) {
  return self => getAndSet_(self, a);
}
/**
 * Atomically modifies the `RefM` with the specified function, returning the
 * value immediately before modification.
 */


function getAndUpdate_(self, f) {
  return modify_(self, v => T.map_(f(v), r => Tp.tuple(v, r)));
}
/**
 * Atomically modifies the `RefM` with the specified function, returning the
 * value immediately before modification.
 */


function getAndUpdate(f) {
  return self => getAndUpdate_(self, f);
}
/**
 * Atomically modifies the `RefM` with the specified function, returning the
 * value immediately before modification.
 */


function getAndUpdateSome_(self, f) {
  return modify_(self, v => T.map_(O.getOrElse_(f(v), () => T.succeed(v)), r => Tp.tuple(v, r)));
}
/**
 * Atomically modifies the `RefM` with the specified function, returning the
 * value immediately before modification.
 */


function getAndUpdateSome(f) {
  return self => getAndUpdateSome_(self, f);
}
/**
 * Atomically modifies the `RefM` with the specified function, which computes
 * a return value for the modification if the function is defined in the current value
 * otherwise it returns a default value.
 * This is a more powerful version of `updateSome`.
 */


function modifySome_(self, def, f) {
  return modify_(self, v => O.getOrElse_(f(v), () => T.succeed(Tp.tuple(def, v))));
}
/**
 * Atomically modifies the `RefM` with the specified function, which computes
 * a return value for the modification if the function is defined in the current value
 * otherwise it returns a default value.
 * This is a more powerful version of `updateSome`.
 */


function modifySome(def) {
  return f => self => modifySome_(self, def, f);
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */


function update_(self, f) {
  return modify_(self, v => T.map_(f(v), r => Tp.tuple(undefined, r)));
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */


function update(f) {
  return self => update_(self, f);
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */


function updateAndGet_(self, f) {
  return modify_(self, v => T.map_(f(v), r => Tp.tuple(r, r)));
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */


function updateAndGet(f) {
  return self => updateAndGet_(self, f);
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */


function updateSome_(self, f) {
  return modify_(self, v => T.map_(O.getOrElse_(f(v), () => T.succeed(v)), r => Tp.tuple(undefined, r)));
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */


function updateSome(f) {
  return self => updateSome_(self, f);
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */


function updateSomeAndGet_(self, f) {
  return modify_(self, v => T.map_(O.getOrElse_(f(v), () => T.succeed(v)), r => Tp.tuple(r, r)));
}
/**
 * Atomically modifies the `RefM` with the specified function.
 */


function updateSomeAndGet(f) {
  return self => updateSomeAndGet_(self, f);
}
/**
 * Folds over the error and value types of the `XRefM`.
 */


function fold_(self, ea, eb, ca, bd) {
  return self.foldM(ea, eb, c => T.fromEither(() => ca(c)), b => T.fromEither(() => bd(b)));
}
/**
 * Folds over the error and value types of the `XRefM`.
 */


function fold(ea, eb, ca, bd) {
  return self => self.foldM(ea, eb, c => T.fromEither(() => ca(c)), b => T.fromEither(() => bd(b)));
}
/**
 * Folds over the error and value types of the `XRefM`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XRefM`. For most use cases one of the more
 * specific combinators implemented in terms of `foldM` will be more
 * ergonomic but this method is extremely useful for implementing new
 * combinators.
 */


function foldM_(self, ea, eb, ca, bd) {
  return self.foldM(ea, eb, ca, bd);
}
/**
 * Folds over the error and value types of the `XRefM`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XRefM`. For most use cases one of the more
 * specific combinators implemented in terms of `foldM` will be more
 * ergonomic but this method is extremely useful for implementing new
 * combinators.
 */


function foldM(ea, eb, ca, bd) {
  return self => self.foldM(ea, eb, ca, bd);
}
/**
 * Folds over the error and value types of the `XRefM`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `foldM` but requires unifying the environment and error types.
 */


function foldAllM_(self, ea, eb, ec, ca, bd) {
  return self.foldAllM(ea, eb, ec, ca, bd);
}
/**
 * Folds over the error and value types of the `XRefM`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `foldM` but requires unifying the environment and error types.
 */


function foldAllM(ea, eb, ec, ca, bd) {
  return self => self.foldAllM(ea, eb, ec, ca, bd);
}
/**
 * Maps and filters the `get` value of the `XRefM` with the specified
 * effectual partial function, returning a `XRefM` with a `get` value that
 * succeeds with the result of the partial function if it is defined or else
 * fails with `None`.
 */


function collectM_(self, f) {
  return self.foldM(_index3.identity, _ => O.some(_), _ => T.succeed(_), b => O.getOrElse_(O.map_(f(b), a => T.asSomeError(a)), () => T.fail(O.none)));
}
/**
 * Maps and filters the `get` value of the `XRefM` with the specified
 * effectual partial function, returning a `XRefM` with a `get` value that
 * succeeds with the result of the partial function if it is defined or else
 * fails with `None`.
 */


function collectM(f) {
  return self => collectM_(self, f);
}
/**
 * Maps and filters the `get` value of the `XRefM` with the specified partial
 * function, returning a `XRefM` with a `get` value that succeeds with the
 * result of the partial function if it is defined or else fails with `None`.
 */


function collect_(self, f) {
  return collectM_(self, b => O.map_(f(b), T.succeed));
}
/**
 * Maps and filters the `get` value of the `XRefM` with the specified partial
 * function, returning a `XRefM` with a `get` value that succeeds with the
 * result of the partial function if it is defined or else fails with `None`.
 */


function collect(f) {
  return self => collect_(self, f);
}
/**
 * Transforms both the `set` and `get` values of the `XRefM` with the
 * specified effectual functions.
 */


function dimapM_(self, f, g) {
  return self.foldM(ea => ea, eb => eb, f, g);
}
/**
 * Transforms both the `set` and `get` values of the `XRefM` with the
 * specified effectual functions.
 */


function dimapM(f, g) {
  return self => dimapM_(self, f, g);
}
/**
 * Transforms both the `set` and `get` errors of the `XRefM` with the
 * specified functions.
 */


function dimapError_(self, f, g) {
  return fold_(self, ea => f(ea), eb => g(eb), a => E.right(a), b => E.right(b));
}
/**
 * Transforms both the `set` and `get` errors of the `XRefM` with the
 * specified functions.
 */


function dimapError(f, g) {
  return self => dimapError_(self, f, g);
}
/**
 * Filters the `set` value of the `XRefM` with the specified effectual
 * predicate, returning a `XRefM` with a `set` value that succeeds if the
 * predicate is satisfied or else fails with `None`.
 */


function filterInputM_(self, f) {
  return foldM_(self, ea => O.some(ea), _index3.identity, a => T.ifM_(T.asSomeError(f(a)), () => T.succeed(a), () => T.fail(O.none)), T.succeed);
}
/**
 * Filters the `set` value of the `XRefM` with the specified effectual
 * predicate, returning a `XRefM` with a `set` value that succeeds if the
 * predicate is satisfied or else fails with `None`.
 */


function filterInputM(f) {
  return self => filterInputM_(self, f);
}
/**
 * Filters the `set` value of the `XRefM` with the specified effectual
 * predicate, returning a `XRefM` with a `set` value that succeeds if the
 * predicate is satisfied or else fails with `None`.
 */


function filterInput_(self, f) {
  return filterInputM_(self, a => T.succeed(f(a)));
}
/**
 * Filters the `set` value of the `XRefM` with the specified effectual
 * predicate, returning a `XRefM` with a `set` value that succeeds if the
 * predicate is satisfied or else fails with `None`.
 */


function filterInput(f) {
  return self => filterInput_(self, f);
}
/**
 * Filters the `get` value of the `XRefM` with the specified effectual predicate,
 * returning a `XRefM` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */


function filterOutputM_(self, f) {
  return foldM_(self, ea => ea, eb => O.some(eb), a => T.succeed(a), b => T.ifM_(T.asSomeError(f(b)), () => T.succeed(b), () => T.fail(O.none)));
}
/**
 * Filters the `get` value of the `XRefM` with the specified effectual predicate,
 * returning a `XRefM` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */


function filterOutputM(f) {
  return self => filterOutputM_(self, f);
}
/**
 * Filters the `get` value of the `XRefM` with the specified predicate,
 * returning a `XRefM` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */


function filterOutput_(self, f) {
  return filterOutputM_(self, b => T.succeed(f(b)));
}
/**
 * Filters the `get` value of the `XRefM` with the specified predicate,
 * returning a `XRefM` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */


function filterOutput(f) {
  return self => filterOutput_(self, f);
}
/**
 * Transforms the `get` value of the `XRefM` with the specified effectual
 * function.
 */


function mapM_(self, f) {
  return dimapM_(self, T.succeed, f);
}
/**
 * Transforms the `get` value of the `XRefM` with the specified effectual
 * function.
 */


function mapM(f) {
  return self => mapM_(self, f);
}
/**
 * Transforms the `set` value of the `XRefM` with the specified effectual
 * function.
 */


function contramapM_(self, f) {
  return dimapM_(self, f, T.succeed);
}
/**
 * Transforms the `set` value of the `XRefM` with the specified effectual
 * function.
 */


function contramapM(f) {
  return self => contramapM_(self, f);
}
/**
 * Transforms the `set` value of the `XRefM` with the specified function.
 */


function contramap_(self, f) {
  return contramapM_(self, c => T.succeed(f(c)));
}
/**
 * Transforms the `set` value of the `XRefM` with the specified function.
 */


function contramap(f) {
  return self => contramap_(self, f);
}
/**
 * Transforms the `get` value of the `XRefM` with the specified function.
 */


function map_(self, f) {
  return mapM_(self, b => T.succeed(f(b)));
}
/**
 * Transforms the `get` value of the `XRefM` with the specified function.
 */


function map(f) {
  return self => map_(self, f);
}
/**
 * Returns a read only view of the `XRefM`.
 */


function readOnly(self) {
  return self;
}
/**
 * Returns a read only view of the `XRefM`.
 */


function writeOnly(self) {
  return fold_(self, _index3.identity, () => undefined, E.right, () => E.left(undefined));
}
/**
 * Performs the specified effect every time a value is written to this
 * `XRefM`.
 */


function tapInput_(self, f) {
  return contramapM_(self, c => T.as_(f(c), c));
}
/**
 * Performs the specified effect every time a value is written to this
 * `XRefM`.
 */


function tapInput(f) {
  return self => tapInput_(self, f);
}
/**
 * Performs the specified effect every time a value is read to this
 * `XRefM`.
 */


function tapOutput_(self, f) {
  return mapM_(self, b => T.as_(f(b), b));
}
/**
 * Performs the specified effect every time a value is read to this
 * `XRefM`.
 */


function tapOutput(f) {
  return self => tapOutput_(self, f);
}
//# sourceMappingURL=api.js.map