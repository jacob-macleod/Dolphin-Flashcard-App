// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as E from "../Either/index.mjs";
import { pipe } from "../Function/index.mjs";
import * as atomic from "./atomic.mjs";
import * as T from "./effect.mjs";
export const TypeId = /*#__PURE__*/Symbol();
export class Atomic {
  constructor(value) {
    this.value = value;
    this._tag = "Atomic";
    this._typeId = TypeId;
    this.fold = this.fold.bind(this);
    this.foldAll = this.foldAll.bind(this);
    this.set = this.set.bind(this);
  }

  fold(_ea, _eb, ca, bd) {
    return new Derived(f => f(this, s => bd(s), c => ca(c)));
  }

  foldAll(_ea, _eb, _ec, ca, bd) {
    return new DerivedAll(f => f(this, s => bd(s), c => s => ca(c)(s)));
  }

  get get() {
    return T.succeedWith(() => this.value.get);
  }

  set(a) {
    return T.succeedWith(() => {
      this.value.set(a);
    });
  }

}
export class Derived {
  constructor(use) {
    this.use = use;
    this._tag = "Derived";
    this._typeId = TypeId;
    this.fold = this.fold.bind(this);
    this.foldAll = this.foldAll.bind(this);
    this.set = this.set.bind(this);
  }

  fold(ea, eb, ca, bd) {
    return this.use((value, getEither, setEither) => new Derived(f => f(value, s => E.fold_(getEither(s), e => E.left(eb(e)), bd), c => E.chain_(ca(c), a => E.fold_(setEither(a), e => E.left(ea(e)), E.right)))));
  }

  foldAll(ea, eb, ec, ca, _bd) {
    return this.use((value, getEither, setEither) => new DerivedAll(f => f(value, s => E.fold_(getEither(s), e => E.left(eb(e)), E.right), c => s => E.chain_(E.fold_(getEither(s), e => E.left(ec(e)), ca(c)), a => E.fold_(setEither(a), e => E.left(ea(e)), E.right)))));
  }

  get get() {
    return this.use((value, getEither) => T.chain_(value.get, s => E.fold_(getEither(s), T.fail, T.succeed)));
  }

  set(a) {
    return this.use((value, _, setEither) => E.fold_(setEither(a), T.fail, value.set));
  }

}
export class DerivedAll {
  constructor(use) {
    this.use = use;
    this._tag = "DerivedAll";
    this._typeId = TypeId;
    this.fold = this.fold.bind(this);
    this.foldAll = this.foldAll.bind(this);
    this.set = this.set.bind(this);
  }

  fold(ea, eb, ca, bd) {
    return this.use((value, getEither, setEither) => new DerivedAll(f => f(value, s => E.fold_(getEither(s), e => E.left(eb(e)), bd), c => s => E.chain_(ca(c), a => E.fold_(setEither(a)(s), e => E.left(ea(e)), E.right)))));
  }

  foldAll(ea, eb, ec, ca, bd) {
    return this.use((value, getEither, setEither) => new DerivedAll(f => f(value, s => E.fold_(getEither(s), e => E.left(eb(e)), bd), c => s => E.chain_(E.fold_(getEither(s), e => E.left(ec(e)), ca(c)), a => E.fold_(setEither(a)(s), e => E.left(ea(e)), E.right)))));
  }

  get get() {
    return this.use((value, getEither) => T.chain_(value.get, a => E.fold_(getEither(a), T.fail, T.succeed)));
  }

  set(a) {
    return this.use((value, _, setEither) => T.absolve(atomic.modify(value, s => E.fold_(setEither(a)(s), e => Tp.tuple(E.leftW(e), s), s => Tp.tuple(E.right(undefined), s)))));
  }

}
/**
 * Cast to a sealed union in case of ERef (where it make sense)
 *
 * @ets_optimize identity
 */

export function concrete(self) {
  return self;
}
//# sourceMappingURL=XRef.mjs.map