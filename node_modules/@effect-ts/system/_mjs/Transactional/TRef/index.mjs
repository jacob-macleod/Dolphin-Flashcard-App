// ets_tracing: off
import "../../Operator/index.mjs";
import * as E from "../../Either/index.mjs";
import { identity } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import { AtomicReference } from "../../Support/AtomicReference/index.mjs";
import { STMEffect } from "../STM/_internal/primitives.mjs";
import * as STM from "../STM/core.mjs";
import { makeEntry } from "../STM/Entry/index.mjs";
import { emptyTodoMap } from "../STM/Journal/index.mjs";
import { Versioned } from "../STM/Versioned/index.mjs";
export const TRefTypeId = /*#__PURE__*/Symbol();
export class Atomic {
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
export class Derived {
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
export class DerivedAll {
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

function getOrMakeEntry(self, journal) {
  if (journal.has(self)) {
    return journal.get(self);
  }

  const entry = makeEntry(self, false);
  journal.set(self, entry);
  return entry;
}
/**
 * Retrieves the value of the `XTRef`.
 */


export function get(self) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new STMEffect(journal => {
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

export function unsafeGet_(self, journal) {
  return getOrMakeEntry(self.atomic, journal).use(_ => _.unsafeGet());
}
/**
 * Sets the value of the `XTRef`.
 */

export function set_(self, a) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new STMEffect(journal => {
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

export function modify_(self, f) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new STMEffect(journal => {
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

export function modify(f) {
  return self => modify_(self, f);
}
/**
 * Updates the value of the variable, returning a function of the specified
 * value.
 */

export function modifySome_(self, b, f) {
  return modify_(self, a => O.fold_(f(a), () => [b, a], identity));
}
/**
 * Updates the value of the variable, returning a function of the specified
 * value.
 *
 * @ets_data_first modifySome_
 */

export function modifySome(b, f) {
  return self => modifySome_(self, b, f);
}
/**
 * Sets the value of the `XTRef` and returns the old value.
 */

export function getAndSet_(self, a) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new STMEffect(journal => {
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

export function getAndSet(a) {
  return self => getAndSet_(self, a);
}
/**
 * Updates the value of the variable and returns the old value.
 */

export function getAndUpdate_(self, f) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new STMEffect(journal => {
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

export function getAndUpdate(f) {
  return self => getAndUpdate_(self, f);
}
/**
 * Updates some values of the variable but leaves others alone, returning the
 * old value.
 */

export function getAndUpdateSome_(self, f) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new STMEffect(journal => {
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

export function getAndUpdateSome(f) {
  return self => getAndUpdateSome_(self, f);
}
/**
 * Sets the value of the `XTRef`.
 *
 * @ets_data_first set_
 */

export function set(a) {
  return self => set_(self, a);
}
/**
 * Updates the value of the variable.
 */

export function update_(self, f) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new STMEffect(journal => {
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

export function update(f) {
  return self => update_(self, f);
}
/**
 * Updates some values of the variable but leaves others alone.
 */

export function updateSome_(self, f) {
  return update_(self, a => O.fold_(f(a), () => a, identity));
}
/**
 * Updates some values of the variable but leaves others alone.
 *
 * @ets_data_first updateSome_
 */

export function updateSome(f) {
  return self => updateSome_(self, f);
}
/**
 * Updates some values of the variable but leaves others alone.
 */

export function updateSomeAndGet_(self, f) {
  return updateAndGet_(self, a => O.fold_(f(a), () => a, identity));
}
/**
 * Updates some values of the variable but leaves others alone.
 *
 * @ets_data_first updateSomeAndGet_
 */

export function updateSomeAndGet(f) {
  return self => updateSomeAndGet_(self, f);
}
/**
 * Updates the value of the variable and returns the new value.
 */

export function updateAndGet_(self, f) {
  ;

  switch (self._tag) {
    case "Atomic":
      {
        return new STMEffect(journal => {
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

export function updateAndGet(f) {
  return self => updateAndGet_(self, f);
}
/**
 * @ets_optimize remove
 */

export function concrete(_) {//
}
/**
 * Makes a new `XTRef` that is initialized to the specified value.
 */

export function makeWith(a) {
  return new STMEffect(journal => {
    const value = a();
    const versioned = new Versioned(value);
    const todo = new AtomicReference(emptyTodoMap);
    const tref = new Atomic(versioned, todo);
    journal.set(tref, makeEntry(tref, true));
    return tref;
  });
}
/**
 * Makes a new `XTRef` that is initialized to the specified value.
 */

export function make(a) {
  return new STMEffect(journal => {
    const value = a;
    const versioned = new Versioned(value);
    const todo = new AtomicReference(emptyTodoMap);
    const tref = new Atomic(versioned, todo);
    journal.set(tref, makeEntry(tref, true));
    return tref;
  });
}
/**
 * Unsafely makes a new `XTRef` that is initialized to the specified value.
 */

export function unsafeMake(a) {
  const value = a;
  const versioned = new Versioned(value);
  const todo = new AtomicReference(emptyTodoMap);
  return new Atomic(versioned, todo);
}
/**
 * Makes a new `XTRef` that is initialized to the specified value.
 */

export function makeCommitWith(a) {
  return STM.commit(makeWith(a));
}
/**
 * Makes a new `XTRef` that is initialized to the specified value.
 */

export function makeCommit(a) {
  return STM.commit(make(a));
}
/**
 * Folds over the error and value types of the `XTRef`. This is a highly
 * polymorphic method that is capable of arbitrarily transforming the error
 * and value types of the `XTRef`. For most use cases one of the more
 * specific combinators implemented in terms of `fold` will be more ergonomic
 * but this method is extremely useful for implementing new combinators.
 */

export function fold_(self, ea, eb, ca, bd) {
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

export function fold(ea, eb, ca, bd) {
  return self => fold_(self, ea, eb, ca, bd);
}
/**
 * Folds over the error and value types of the `XTRef`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `fold` but requires unifying the error types.
 */

export function foldAll_(self, ea, eb, ec, ca, bd) {
  return self.foldAll(ea, eb, ec, ca, bd);
}
/**
 * Folds over the error and value types of the `XTRef`, allowing access to
 * the state in transforming the `set` value. This is a more powerful version
 * of `fold` but requires unifying the error types.
 *
 * @ets_data_first foldAll_
 */

export function foldAll(ea, eb, ec, ca, bd) {
  return self => self.foldAll(ea, eb, ec, ca, bd);
}
//# sourceMappingURL=index.mjs.map