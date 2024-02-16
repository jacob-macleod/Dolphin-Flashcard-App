"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TRefTypeId = exports.DerivedAll = exports.Derived = exports.Atomic = void 0;
exports.concrete = concrete;
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
exports.make = make;
exports.makeCommit = makeCommit;
exports.makeCommitWith = makeCommitWith;
exports.makeWith = makeWith;
exports.modify = modify;
exports.modifySome = modifySome;
exports.modifySome_ = modifySome_;
exports.modify_ = modify_;
exports.set = set;
exports.set_ = set_;
exports.unsafeGet_ = unsafeGet_;
exports.unsafeMake = unsafeMake;
exports.update = update;
exports.updateAndGet = updateAndGet;
exports.updateAndGet_ = updateAndGet_;
exports.updateSome = updateSome;
exports.updateSomeAndGet = updateSomeAndGet;
exports.updateSomeAndGet_ = updateSomeAndGet_;
exports.updateSome_ = updateSome_;
exports.update_ = update_;

require("../../Operator/index.js");

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _index3 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var _index5 = /*#__PURE__*/require("../../Support/AtomicReference/index.js");

var _primitives = /*#__PURE__*/require("../STM/_internal/primitives.js");

var STM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../STM/core.js"));

var _index6 = /*#__PURE__*/require("../STM/Entry/index.js");

var _index7 = /*#__PURE__*/require("../STM/Journal/index.js");

var _index8 = /*#__PURE__*/require("../STM/Versioned/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const TRefTypeId = /*#__PURE__*/Symbol();
exports.TRefTypeId = TRefTypeId;

class Atomic {
  constructor(versioned, todo) {
    this.versioned = versioned;
    this.todo = todo;
    this._typeId = TRefTypeId;
    this._tag = "Atomic";
    this.atomic = this;
  }

  fold(_ea, _eb, ca, bd) {
    return new Derived(bd, ca, this, this.atomic);
  }

  foldAll(_ea, _eb, _ec, ca, bd) {
    return new DerivedAll(bd, ca, this, this.atomic);
  }

}

exports.Atomic = Atomic;

class Derived {
  constructor(getEither, setEither, value, atomic) {
    this.getEither = getEither;
    this.setEither = setEither;
    this.value = value;
    this.atomic = atomic;
    this._typeId = TRefTypeId;
    this._tag = "Derived";
  }

  fold(ea, eb, ca, bd) {
    return new Derived(s => E.fold_(this.getEither(s), e => E.left(eb(e)), bd), c => E.chain_(ca(c), a => E.fold_(this.setEither(a), e => E.left(ea(e)), E.right)), this.value, this.atomic);
  }

  foldAll(ea, eb, ec, ca, bd) {
    return new DerivedAll(s => E.fold_(this.getEither(s), e => E.left(eb(e)), bd), c => s => E.chain_(E.fold_(this.getEither(s), e => E.left(ec(e)), ca(c)), a => E.fold_(this.setEither(a), e => E.left(ea(e)), E.right)), this.value, this.atomic);
  }

}

exports.Derived = Derived;

class DerivedAll {
  constructor(getEither, setEither, value, atomic) {
    this.getEither = getEither;
    this.setEither = setEither;
    this.value = value;
    this.atomic = atomic;
    this._typeId = TRefTypeId;
    this._tag = "DerivedAll";
  }

  fold(ea, eb, ca, bd) {
    return new DerivedAll(s => E.fold_(this.getEither(s), e => E.left(eb(e)), bd), c => s => E.chain_(ca(c), a => E.fold_(this.setEither(a)(s), e => E.left(ea(e)), E.right)), this.value, this.atomic);
  }

  foldAll(ea, eb, ec, ca, bd) {
    return new DerivedAll(s => E.fold_(this.getEither(s), e => E.left(eb(e)), bd), c => s => E.chain_(E.fold_(this.getEither(s), e => E.left(ec(e)), ca(c)), a => E.fold_(this.setEither(a)(s), e => E.left(ea(e)), E.right)), this.value, this.atomic);
  }

}

exports.DerivedAll = DerivedAll;

function getOrMakeEntry(self, journal) {
  if (journal.has(self)) {
    return journal.get(self);
  }

  const entry = (0, _index6.makeEntry)(self, false);
  journal.set(self, entry);
  return entry;
}
/**
 * Retrieves the value of the `XTRef`.
 */


function get(self) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new _primitives.STMEffect(journal => {
          const entry = getOrMakeEntry(self, journal);
          return entry.use(_ => _.unsafeGet());
        });
      }

    case "Derived":
      {
        return STM.chain_(get(self.value), s => E.fold_(self.getEither(s), STM.fail, STM.succeed));
      }

    case "DerivedAll":
      {
        return STM.chain_(get(self.value), s => E.fold_(self.getEither(s), STM.fail, STM.succeed));
      }
  }
}
/**
 * Unsafely retrieves the value of the `XTRef`.
 */


function unsafeGet_(self, journal) {
  return getOrMakeEntry(self.atomic, journal).use(_ => _.unsafeGet());
}
/**
 * Sets the value of the `XTRef`.
 */


function set_(self, a) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new _primitives.STMEffect(journal => {
          const entry = getOrMakeEntry(self, journal);
          return entry.use(_ => _.unsafeSet(a));
        });
      }

    case "Derived":
      {
        return E.fold_(self.setEither(a), STM.fail, s => set_(self.value, s));
      }

    case "DerivedAll":
      {
        return STM.absolve(modify_(self.value, s => E.fold_(self.setEither(a)(s), e => [E.leftW(e), s], s => [E.right(undefined), s])));
      }
  }
}
/**
 * Updates the value of the variable, returning a function of the specified
 * value.
 */


function modify_(self, f) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new _primitives.STMEffect(journal => {
          const entry = getOrMakeEntry(self, journal);
          const oldValue = entry.use(_ => _.unsafeGet());
          const [retValue, newValue] = f(oldValue);
          entry.use(_ => _.unsafeSet(newValue));
          return retValue;
        });
      }

    case "Derived":
      {
        return STM.absolve(modify_(self.value, s => E.fold_(self.getEither(s), e => [E.leftW(e), s], a1 => {
          const [b, a2] = f(a1);
          return E.fold_(self.setEither(a2), e => [E.left(e), s], s => [E.right(b), s]);
        })));
      }

    case "DerivedAll":
      {
        return STM.absolve(modify_(self.value, s => E.fold_(self.getEither(s), e => [E.leftW(e), s], a1 => {
          const [b, a2] = f(a1);
          return E.fold_(self.setEither(a2)(s), e => [E.left(e), s], s => [E.right(b), s]);
        })));
      }
  }
}
/**
 * Updates the value of the variable, returning a function of the specified
 * value.
 *
 * @ets_data_first modify_
 */


function modify(f) {
  return self => modify_(self, f);
}
/**
 * Updates the value of the variable, returning a function of the specified
 * value.
 */


function modifySome_(self, b, f) {
  return modify_(self, a => O.fold_(f(a), () => [b, a], _index3.identity));
}
/**
 * Updates the value of the variable, returning a function of the specified
 * value.
 *
 * @ets_data_first modifySome_
 */


function modifySome(b, f) {
  return self => modifySome_(self, b, f);
}
/**
 * Sets the value of the `XTRef` and returns the old value.
 */


function getAndSet_(self, a) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new _primitives.STMEffect(journal => {
          const entry = getOrMakeEntry(self, journal);
          const oldValue = entry.use(_ => _.unsafeGet());
          entry.use(_ => _.unsafeSet(a));
          return oldValue;
        });
      }

    default:
      {
        return modify_(self, _ => [_, a]);
      }
  }
}
/**
 * Sets the value of the `XTRef` and returns the old value.
 *
 * @ets_data_first getAndSet_
 */


function getAndSet(a) {
  return self => getAndSet_(self, a);
}
/**
 * Updates the value of the variable and returns the old value.
 */


function getAndUpdate_(self, f) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new _primitives.STMEffect(journal => {
          const entry = getOrMakeEntry(self, journal);
          const oldValue = entry.use(_ => _.unsafeGet());
          entry.use(_ => _.unsafeSet(f(oldValue)));
          return oldValue;
        });
      }

    default:
      {
        return modify_(self, _ => [_, f(_)]);
      }
  }
}
/**
 * Updates the value of the variable and returns the old value.
 *
 * @ets_data_first getAndUpdate_
 */


function getAndUpdate(f) {
  return self => getAndUpdate_(self, f);
}
/**
 * Updates some values of the variable but leaves others alone, returning the
 * old value.
 */


function getAndUpdateSome_(self, f) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new _primitives.STMEffect(journal => {
          const entry = getOrMakeEntry(self, journal);
          const oldValue = entry.use(_ => _.unsafeGet());
          const v = f(oldValue);

          if (O.isSome(v)) {
            entry.use(_ => _.unsafeSet(v.value));
          }

          return oldValue;
        });
      }

    default:
      {
        return modify_(self, _ => O.fold_(f(_), () => [_, _], v => [_, v]));
      }
  }
}
/**
 * Updates some values of the variable but leaves others alone, returning the
 * old value.
 *
 * @ets_data_first getAndUpdateSome_
 */


function getAndUpdateSome(f) {
  return self => getAndUpdateSome_(self, f);
}
/**
 * Sets the value of the `XTRef`.
 *
 * @ets_data_first set_
 */


function set(a) {
  return self => set_(self, a);
}
/**
 * Updates the value of the variable.
 */


function update_(self, f) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new _primitives.STMEffect(journal => {
          const entry = getOrMakeEntry(self, journal);
          const newValue = f(entry.use(_ => _.unsafeGet()));
          entry.use(_ => _.unsafeSet(newValue));
        });
      }

    default:
      return modify_(self, a => [undefined, f(a)]);
  }
}
/**
 * Updates the value of the variable.
 *
 * @ets_data_first update_
 */


function update(f) {
  return self => update_(self, f);
}
/**
 * Updates some values of the variable but leaves others alone.
 */


function updateSome_(self, f) {
  return update_(self, a => O.fold_(f(a), () => a, _index3.identity));
}
/**
 * Updates some values of the variable but leaves others alone.
 *
 * @ets_data_first updateSome_
 */


function updateSome(f) {
  return self => updateSome_(self, f);
}
/**
 * Updates some values of the variable but leaves others alone.
 */


function updateSomeAndGet_(self, f) {
  return updateAndGet_(self, a => O.fold_(f(a), () => a, _index3.identity));
}
/**
 * Updates some values of the variable but leaves others alone.
 *
 * @ets_data_first updateSomeAndGet_
 */


function updateSomeAndGet(f) {
  return self => updateSomeAndGet_(self, f);
}
/**
 * Updates the value of the variable and returns the new value.
 */


function updateAndGet_(self, f) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new _primitives.STMEffect(journal => {
          const entry = getOrMakeEntry(self, journal);
          const oldValue = entry.use(_ => _.unsafeGet());
          const x = f(oldValue);
          entry.use(_ => _.unsafeSet(x));
          return x;
        });
      }

    default:
      {
        return modify_(self, _ => {
          const x = f(_);
          return [x, x];
        });
      }
  }
}
/**
 * Updates the value of the variable and returns the new value.
 *
 * @ets_data_first getAndUpdate_
 */


function updateAndGet(f) {
  return self => updateAndGet_(self, f);
}
/**
 * @ets_optimize remove
 */


function concrete(_) {//
}
/**
 * Makes a new `XTRef` that is initialized to the specified value.
 */


function makeWith(a) {
  return new _primitives.STMEffect(journal => {
    const value = a();
    const versioned = new _index8.Versioned(value);
    const todo = new _index5.AtomicReference(_index7.emptyTodoMap);
    const tref = new Atomic(versioned, todo);
    journal.set(tref, (0, _index6.makeEntry)(tref, true));
    return tref;
  });
}
/**
 * Makes a new `XTRef` that is initialized to the specified value.
 */


function make(a) {
  return new _primitives.STMEffect(journal => {
    const value = a;
    const versioned = new _index8.Versioned(value);
    const todo = new _index5.AtomicReference(_index7.emptyTodoMap);
    const tref = new Atomic(versioned, todo);
    journal.set(tref, (0, _index6.makeEntry)(tref, true));
    return tref;
  });
}
/**
 * Unsafely makes a new `XTRef` that is initialized to the specified value.
 */


function unsafeMake(a) {
  const value = a;
  const versioned = new _index8.Versioned(value);
  const todo = new _index5.AtomicReference(_index7.emptyTodoMap);
  return new Atomic(versioned, todo);
}
/**
 * Makes a new `XTRef` that is initialized to the specified value.
 */


function makeCommitWith(a) {
  return STM.commit(makeWith(a));
}
/**
 * Makes a new `XTRef` that is initialized to the specified value.
 */


function makeCommit(a) {
  return STM.commit(make(a));
}
/**
 * Folds over the error and value types of the `XTRef`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XTRef`. For most use cases one of the more
 * specific combinators implemented in terms of `fold` will be more ergonomic
 * but this method is extremely useful for implementing new combinators.
 */


function fold_(self, ea, eb, ca, bd) {
  return self.fold(ea, eb, ca, bd);
}
/**
 * Folds over the error and value types of the `XTRef`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XTRef`. For most use cases one of the more
 * specific combinators implemented in terms of `fold` will be more ergonomic
 * but this method is extremely useful for implementing new combinators.
 *
 * @ets_data_first fold_
 */


function fold(ea, eb, ca, bd) {
  return self => fold_(self, ea, eb, ca, bd);
}
/**
 * Folds over the error and value types of the `XTRef`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `fold` but requires unifying the error types.
 */


function foldAll_(self, ea, eb, ec, ca, bd) {
  return self.foldAll(ea, eb, ec, ca, bd);
}
/**
 * Folds over the error and value types of the `XTRef`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `fold` but requires unifying the error types.
 *
 * @ets_data_first foldAll_
 */


function foldAll(ea, eb, ec, ca, bd) {
  return self => self.foldAll(ea, eb, ec, ca, bd);
}
//# sourceMappingURL=index.js.map