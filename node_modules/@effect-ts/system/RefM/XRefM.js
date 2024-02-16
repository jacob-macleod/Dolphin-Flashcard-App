"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concrete = exports.DerivedM = exports.DerivedAllM = exports.AtomicM = void 0;

var semaphore = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Semaphore/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./effect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class AtomicM {
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

exports.AtomicM = AtomicM;

class DerivedM {
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

exports.DerivedM = DerivedM;

class DerivedAllM {
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

exports.DerivedAllM = DerivedAllM;

const concrete = _ => _;

exports.concrete = concrete;
//# sourceMappingURL=XRefM.js.map