import * as semaphore from "../Semaphore/index.mjs";
import * as T from "./effect.mjs";
export class AtomicM {
  constructor(ref, semaphore) {
    this.ref = ref;
    this.semaphore = semaphore;
    this._tag = "AtomicM";
    this.foldM = this.foldM.bind(this);
    this.foldAllM = this.foldAllM.bind(this);
    this.set = this.set.bind(this);
  }

  foldM(_ea, _eb, ca, bd) {
    return new DerivedM(f => f(this, s => bd(s), a => ca(a)));
  }

  foldAllM(_ea, _eb, _ec, ca, bd) {
    return new DerivedAllM(f => f(this, s => bd(s), a => s => ca(a)(s)));
  }

  get get() {
    return this.ref.get;
  }

  set(a) {
    return semaphore.withPermit_(this.ref.set(a), this.semaphore);
  }

}
export class DerivedM {
  constructor(use) {
    this.use = use;
    this._tag = "DerivedM";
    this.foldM = this.foldM.bind(this);
    this.foldAllM = this.foldAllM.bind(this);
    this.set = this.set.bind(this);
  }

  foldM(ea, eb, ca, bd) {
    return this.use((value, getEither, setEither) => new DerivedM(f => f(value, s => T.foldM_(getEither(s), e => T.fail(eb(e)), a => bd(a)), a => T.chain_(ca(a), a => T.mapError_(setEither(a), ea)))));
  }

  foldAllM(ea, eb, ec, ca, bd) {
    return this.use((value, getEither, setEither) => new DerivedAllM(f => f(value, s => T.foldM_(getEither(s), e => T.fail(eb(e)), a => bd(a)), c => s => T.chain_(T.foldM_(getEither(s), e => T.fail(ec(e)), ca(c)), a => T.mapError_(setEither(a), ea)))));
  }

  get get() {
    return this.use((value, getEither) => T.chain_(value.get, a => getEither(a)));
  }

  set(a) {
    return this.use((value, _, setEither) => semaphore.withPermit_(T.chain_(setEither(a), a => value.set(a)), value.semaphore));
  }

}
export class DerivedAllM {
  constructor(use) {
    this.use = use;
    this._tag = "DerivedAllM";
    this.foldM = this.foldM.bind(this);
    this.foldAllM = this.foldAllM.bind(this);
    this.set = this.set.bind(this);
  }

  foldM(ea, eb, ca, bd) {
    return this.use((value, getEither, setEither) => new DerivedAllM(f => f(value, s => T.foldM_(getEither(s), e => T.fail(eb(e)), a => bd(a)), a => s => T.chain_(ca(a), a => T.mapError_(setEither(a)(s), ea)))));
  }

  foldAllM(ea, eb, ec, ca, bd) {
    return this.use((value, getEither, setEither) => new DerivedAllM(f => f(value, s => T.foldM_(getEither(s), e => T.fail(eb(e)), a => bd(a)), c => s => T.chain_(T.foldM_(getEither(s), e => T.fail(ec(e)), ca(c)), a => T.mapError_(setEither(a)(s), ea)))));
  }

  get get() {
    return this.use((value, getEither) => T.chain_(value.get, a => getEither(a)));
  }

  set(a) {
    return this.use((value, _, setEither) => semaphore.withPermit_(T.chain_(T.chain_(value.get, setEither(a)), a => value.set(a)), value.semaphore));
  }

}
export const concrete = _ => _;
//# sourceMappingURL=XRefM.mjs.map