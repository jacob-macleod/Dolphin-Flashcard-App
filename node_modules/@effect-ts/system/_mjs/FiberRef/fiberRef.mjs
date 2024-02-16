// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as E from "../Either/index.mjs";
import { identity, pipe } from "../Function/index.mjs";
import * as T from "./excl-effect.mjs";
export const TypeId = /*#__PURE__*/Symbol();
export class Runtime {
  constructor(initial, fork = identity, join = (_, a) => a) {
    this.initial = initial;
    this.fork = fork;
    this.join = join;
    this._tag = "Runtime";
    this._typeId = TypeId;
  }

  fold(_ea, _eb, ca, bd) {
    return new Derived(f => f(this, bd, ca));
  }

  foldAll(_ea, _eb, _ec, ca, bd) {
    return new DerivedAll(f => f(this, s => bd(s), c => s => ca(c)(s)));
  }

  modify(f) {
    return new T.IFiberRefModify(this, f);
  }

  get get() {
    return this.modify(v => Tp.tuple(v, v));
  }

  locally(a, use) {
    return T.chain_(this.get, oldValue => T.bracket_(this.set(a), () => use, () => this.set(oldValue)));
  }

  set(value) {
    return this.modify(() => Tp.tuple(undefined, value));
  }

}
export class Derived {
  constructor(use) {
    this.use = use;
    this._tag = "Derived";
    this._typeId = TypeId;
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

  locally(a, use) {
    return this.use((value, _getEither, setEither) => T.chain_(value.get, old => E.fold_(setEither(a), e => T.fail(e), s => T.bracket_(value.set(s), () => use, () => value.set(old)))));
  }

  set(a) {
    return this.use((value, _getEither, setEither) => E.fold_(setEither(a), T.fail, s => value.set(s)));
  }

}
export class DerivedAll {
  constructor(use) {
    this.use = use;
    this._tag = "DerivedAll";
    this._typeId = TypeId;
  }

  fold(ea, eb, ca, bd) {
    return this.use((value, getEither, setEither) => new DerivedAll(f => f(value, s => E.fold_(getEither(s), e => E.left(eb(e)), bd), c => s => E.chain_(ca(c), a => E.fold_(setEither(a)(s), e => E.left(ea(e)), E.right)))));
  }

  foldAll(ea, eb, ec, ca, bd) {
    return this.use((value, getEither, setEither) => new DerivedAll(f => f(value, s => E.fold_(getEither(s), e => E.left(eb(e)), bd), c => s => E.chain_(E.fold_(getEither(s), e => E.left(ec(e)), ca(c)), a => E.fold_(setEither(a)(s), e => E.left(ea(e)), E.right)))));
  }

  get get() {
    return this.use((value, getEither) => T.chain_(value.get, s => E.fold_(getEither(s), T.fail, T.succeed)));
  }

  locally(a, use) {
    return this.use((value, _getEither, setEither) => T.chain_(value.get, old => E.fold_(setEither(a)(old), e => T.fail(e), s => T.bracket_(value.set(s), () => use, () => value.set(old)))));
  }

  set(a) {
    return this.use((value, _getEither, setEither) => T.absolve(value.modify(s => E.fold_(setEither(a)(s), e => Tp.tuple(E.leftW(e), s), s => Tp.tuple(E.right(undefined), s)))));
  }

}
/**
 * @ets_optimize identity
 */

export function concrete(_) {
  return _;
}
//# sourceMappingURL=fiberRef.mjs.map