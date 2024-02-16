"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collect = collect;
exports.collect_ = collect_;
exports.contramap = contramap;
exports.contramapEither = contramapEither;
exports.contramapEither_ = contramapEither_;
exports.contramap_ = contramap_;
exports.dimap = dimap;
exports.dimapEither = dimapEither;
exports.dimapEither_ = dimapEither_;
exports.dimapError = dimapError;
exports.dimapError_ = dimapError_;
exports.dimap_ = dimap_;
exports.filterInput = filterInput;
exports.filterInput_ = filterInput_;
exports.filterOutput = filterOutput;
exports.filterOutput_ = filterOutput_;
exports.fold = fold;
exports.foldAll = foldAll;
exports.foldAll_ = foldAll_;
exports.fold_ = fold_;
exports.get = get;
exports.getAndSet = getAndSet;
exports.getAndSet_ = getAndSet_;
exports.getAndUpdate = getAndUpdate;
exports.getAndUpdateSome = getAndUpdateSome;
exports.getAndUpdateSome_ = getAndUpdateSome_;
exports.getAndUpdate_ = getAndUpdate_;
exports.makeRef = makeRef;
exports.map = map;
exports.mapEither = mapEither;
exports.mapEither_ = mapEither_;
exports.map_ = map_;
exports.modify = modify;
exports.modifySome = modifySome;
exports.modifySome_ = modifySome_;
exports.modify_ = modify_;
exports.readOnly = readOnly;
exports.set = set;
exports.set_ = set_;
exports.unsafeMakeRef = unsafeMakeRef;
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

var absolve = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Effect/absolve.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index3 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _index5 = /*#__PURE__*/require("../Support/AtomicReference/index.js");

var _index6 = /*#__PURE__*/require("../Utils/index.js");

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./atomic.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./effect.js"));

var _XRef = /*#__PURE__*/require("./XRef.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a new `XRef` with the specified value.
 */
function makeRef(a) {
  return T.succeedWith(() => new _XRef.Atomic(new _index5.AtomicReference(a)));
}
/**
 * Creates a new `XRef` with the specified value.
 */


function unsafeMakeRef(a) {
  return new _XRef.Atomic(new _index5.AtomicReference(a));
}
/**
 * Maps and filters the `get` value of the `XRef` with the specified partial
 * function, returning a `XRef` with a `get` value that succeeds with the
 * result of the partial function if it is defined or else fails with `None`.
 *
 * @ets_data_first collect_
 */


function collect(pf) {
  return self => collect_(self, pf);
}
/**
 * Maps and filters the `get` value of the `XRef` with the specified partial
 * function, returning a `XRef` with a `get` value that succeeds with the
 * result of the partial function if it is defined or else fails with `None`.
 */


function collect_(self, pf) {
  return self.fold(_index3.identity, O.some, E.right, b => E.fromOption_(pf(b), () => O.none));
}
/**
 * Transforms the `set` value of the `XRef` with the specified function.
 *
 * @ets_data_first contramap_
 */


function contramap(f) {
  return self => contramap_(self, f);
}
/**
 * Transforms the `set` value of the `XRef` with the specified function.
 */


function contramap_(self, f) {
  return contramapEither_(self, c => E.right(f(c)));
}
/**
 * Transforms the `set` value of the `XRef` with the specified fallible
 * function.
 *
 * @ets_data_first contramapEither_
 */


function contramapEither(f) {
  return self => contramapEither_(self, f);
}
/**
 * Transforms the `set` value of the `XRef` with the specified fallible
 * function.
 */


function contramapEither_(self, f) {
  return dimapEither_(self, f, x => E.right(x));
}
/**
 * Transforms both the `set` and `get` values of the `XRef` with the
 * specified functions.
 *
 * @ets_data_first dimap_
 */


function dimap(f, g) {
  return self => dimap_(self, f, g);
}
/**
 * Transforms both the `set` and `get` values of the `XRef` with the
 * specified functions.
 */


function dimap_(self, f, g) {
  return dimapEither_(self, c => E.right(f(c)), b => E.right(g(b)));
}
/**
 * Transforms both the `set` and `get` values of the `XRef` with the
 * specified fallible functions.
 *
 * @ets_data_first dimapEither_
 */


function dimapEither(f, g) {
  return self => dimapEither_(self, f, g);
}
/**
 * Transforms both the `set` and `get` values of the `XRef` with the
 * specified fallible functions.
 */


function dimapEither_(self, f, g) {
  return self.fold(ea => ea, eb => eb, f, g);
}
/**
 * Transforms both the `set` and `get` errors of the `XRef` with the
 * specified functions.
 *
 * @ets_data_first dimapError_
 */


function dimapError(f, g) {
  return self => dimapError_(self, f, g);
}
/**
 * Transforms both the `set` and `get` errors of the `XRef` with the
 * specified functions.
 */


function dimapError_(self, f, g) {
  return self.fold(f, g, E.right, E.right);
}
/**
 * Filters the `set` value of the `XRef` with the specified predicate,
 * returning a `XRef` with a `set` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 *
 * @ets_data_first filterInput_
 */


function filterInput(f) {
  return self => filterInput_(self, f);
}
/**
 * Filters the `set` value of the `XRef` with the specified predicate,
 * returning a `XRef` with a `set` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */


function filterInput_(self, f) {
  return self.fold(O.some, _index3.identity, a => f(a) ? E.right(a) : E.left(O.none), E.right);
}
/**
 * Filters the `get` value of the `XRef` with the specified predicate,
 * returning a `XRef` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 *
 * @ets_data_first filterOutput_
 */


function filterOutput(f) {
  return _ => filterOutput_(_, f);
}
/**
 * Filters the `get` value of the `XRef` with the specified predicate,
 * returning a `XRef` with a `get` value that succeeds if the predicate is
 * satisfied or else fails with `None`.
 */


function filterOutput_(_, f) {
  return _.fold(_index3.identity, O.some, E.right, b => f(b) ? E.right(b) : E.left(O.none));
}
/**
 * Transforms the `get` value of the `XRef` with the specified function.
 *
 * @ets_data_first map_
 */


function map(f) {
  return _ => map_(_, f);
}
/**
 * Transforms the `get` value of the `XRef` with the specified function.
 */


function map_(_, f) {
  return mapEither_(_, b => E.right(f(b)));
}
/**
 * Transforms the `get` value of the `XRef` with the specified fallible
 * function.
 *
 * @ets_data_first mapEither_
 */


function mapEither(f) {
  return _ => mapEither_(_, f);
}
/**
 * Transforms the `get` value of the `XRef` with the specified fallible
 * function.
 */


function mapEither_(_, f) {
  return dimapEither_(_, a => E.right(a), f);
}
/**
 * Returns a read only view of the `XRef`.
 *
 * @ets_optimize identity
 */


function readOnly(_) {
  return _;
}
/**
 * Returns a write only view of the `XRef`.
 */


function writeOnly(_) {
  return _.fold(_index3.identity, () => undefined, E.right, () => E.left(undefined));
}
/**
 * Atomically modifies the `XRef` with the specified function, which
 * computes a return value for the modification. This is a more powerful
 * version of `update`.
 *
 * @ets_data_first modify_
 */


function modify(f) {
  return self => modify_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified function, which
 * computes a return value for the modification. This is a more powerful
 * version of `update`.
 */


function modify_(self, f) {
  return (0, _index6.matchTag)({
    Atomic: _ => A.modify(_, f),
    Derived: self => self.use((value, getEither, setEither) => absolve.absolve(A.modify(value, s => E.fold_(getEither(s), e => Tp.tuple(E.left(e), s), a1 => (({
      tuple: [b, a2]
    }) => E.fold_(setEither(a2), e => Tp.tuple(E.left(e), s), s => Tp.tuple(E.right(b), s)))(f(a1)))))),
    DerivedAll: self => self.use((value, getEither, setEither) => absolve.absolve(A.modify(value, s => E.fold_(getEither(s), e => Tp.tuple(E.left(e), s), a1 => (({
      tuple: [b, a2]
    }) => E.fold_(setEither(a2)(s), e => Tp.tuple(E.left(e), s), s => Tp.tuple(E.right(b), s)))(f(a1))))))
  })(self);
}
/**
 * Atomically modifies the `XRef` with the specified partial function,
 * which computes a return value for the modification if the function is
 * defined on the current value otherwise it returns a default value. This
 * is a more powerful version of `updateSome`.
 *
 * @ets_data_first modifySome_
 */


function modifySome(def, f) {
  return self => modifySome_(self, def, f);
}
/**
 * Atomically modifies the `XRef` with the specified partial function,
 * which computes a return value for the modification if the function is
 * defined on the current value otherwise it returns a default value. This
 * is a more powerful version of `updateSome`.
 */


function modifySome_(self, def, f) {
  return (0, _index6.matchTag)({
    Atomic: _ => A.modifySome(_, def, f)
  }, _ => modify_(_, a => O.getOrElse_(f(a), () => Tp.tuple(def, a))))(self);
}
/**
 * Atomically writes the specified value to the `XRef`, returning the value
 * immediately before modification.
 *
 * @ets_data_first getAndSet_
 */


function getAndSet(a) {
  return self => getAndSet_(self, a);
}
/**
 * Atomically writes the specified value to the `XRef`, returning the value
 * immediately before modification.
 */


function getAndSet_(self, a) {
  return (0, _index6.matchTag)({
    Atomic: _ => A.getAndSet(_, a)
  }, _ => modify_(_, v => Tp.tuple(v, a)))(self);
}
/**
 * Atomically modifies the `XRef` with the specified function, returning
 * the value immediately before modification.
 *
 * @ets_data_first getAndUpdate_
 */


function getAndUpdate(f) {
  return self => getAndUpdate_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified function, returning
 * the value immediately before modification.
 */


function getAndUpdate_(self, f) {
  return (0, _index6.matchTag)({
    Atomic: _ => A.getAndUpdate(_, f)
  }, modify(v => Tp.tuple(v, f(v))))(self);
}
/**
 * Atomically modifies the `XRef` with the specified partial function,
 * returning the value immediately before modification. If the function is
 * undefined on the current value it doesn't change it.
 *
 * @ets_data_first getAndUpdateSome_
 */


function getAndUpdateSome(f) {
  return self => getAndUpdateSome_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified partial function,
 * returning the value immediately before modification. If the function is
 * undefined on the current value it doesn't change it.
 */


function getAndUpdateSome_(self, f) {
  return (0, _index6.matchTag)({
    Atomic: _ => A.getAndUpdateSome(_, f)
  }, _ => modify_(_, v => (a => Tp.tuple(v, a))(O.getOrElse_(f(v), () => v))))(self);
}
/**
 * Atomically modifies the `XRef` with the specified function.
 *
 * @ets_data_first update_
 */


function update(f) {
  return self => update_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified function.
 */


function update_(self, f) {
  return (0, _index6.matchTag)({
    Atomic: _ => A.update(_, f)
  }, _ => modify_(_, v => Tp.tuple(undefined, f(v))))(self);
}
/**
 * Atomically modifies the `XRef` with the specified function and returns
 * the updated value.
 *
 * @ets_data_first updateAndGet_
 */


function updateAndGet(f) {
  return self => updateAndGet_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified function and returns
 * the updated value.
 */


function updateAndGet_(self, f) {
  return (0, _index6.matchTag)({
    Atomic: _ => A.updateAndGet(_, f)
  }, self => T.chain_(modify_(self, v => (result => Tp.tuple(result, result))(f(v))), () => self.get))(self);
}
/**
 * Atomically modifies the `XRef` with the specified partial function. If
 * the function is undefined on the current value it doesn't change it.
 *
 * @ets_data_first updateSome_
 */


function updateSome(f) {
  return self => updateSome_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified partial function. If
 * the function is undefined on the current value it doesn't change it.
 */


function updateSome_(self, f) {
  return (0, _index6.matchTag)({
    Atomic: _ => A.updateSome(_, f)
  }, modify(v => (a => Tp.tuple(undefined, a))(O.getOrElse_(f(v), () => v))))(self);
}
/**
 * Atomically modifies the `XRef` with the specified partial function. If
 * the function is undefined on the current value it returns the old value
 * without changing it.
 *
 * @ets_data_first updateSomeAndGet_
 */


function updateSomeAndGet(f) {
  return self => updateSomeAndGet_(self, f);
}
/**
 * Atomically modifies the `XRef` with the specified partial function. If
 * the function is undefined on the current value it returns the old value
 * without changing it.
 */


function updateSomeAndGet_(self, f) {
  return (0, _index6.matchTag)({
    Atomic: _ => A.updateSomeAndGet(_, f)
  }, _ => modify_(_, v => (result => Tp.tuple(result, result))(O.getOrElse_(f(v), () => v))))(self);
}
/**
 * Folds over the error and value types of the `XRef`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XRef`. For most use cases one of the more specific
 * combinators implemented in terms of `fold` will be more ergonomic but this
 * method is extremely useful for implementing new combinators.
 *
 * @ets_data_first fold_
 */


function fold(ea, eb, ca, bd) {
  return self => self.fold(ea, eb, ca, bd);
}
/**
 * Folds over the error and value types of the `XRef`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XRef`. For most use cases one of the more specific
 * combinators implemented in terms of `fold` will be more ergonomic but this
 * method is extremely useful for implementing new combinators.
 */


function fold_(self, ea, eb, ca, bd) {
  return self.fold(ea, eb, ca, bd);
}
/**
 * Folds over the error and value types of the `XRef`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `fold` but requires unifying the error types.
 *
 * @ets_data_first foldAll_
 */


function foldAll(ea, eb, ec, ca, bd) {
  return self => self.foldAll(ea, eb, ec, ca, bd);
}
/**
 * Folds over the error and value types of the `XRef`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `fold` but requires unifying the error types.
 */


function foldAll_(self, ea, eb, ec, ca, bd) {
  return self.foldAll(ea, eb, ec, ca, bd);
}
/**
 * Reads the value from the `XRef`.
 */


function get(self) {
  return self.get;
}
/**
 * Writes a new value to the `XRef`, with a guarantee of immediate
 * consistency (at some cost to performance).
 *
 * @ets_data_first set_
 */


function set(a) {
  return self => self.set(a);
}
/**
 * Writes a new value to the `XRef`, with a guarantee of immediate
 * consistency (at some cost to performance).
 */


function set_(self, a) {
  return self.set(a);
}
//# sourceMappingURL=api.js.map