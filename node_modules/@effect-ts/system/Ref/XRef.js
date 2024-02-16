"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypeId = exports.DerivedAll = exports.Derived = exports.Atomic = void 0;
exports.concrete = concrete;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index3 = /*#__PURE__*/require("../Function/index.js");

var atomic = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./atomic.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./effect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const TypeId = /*#__PURE__*/Symbol();
exports.TypeId = TypeId;

class Atomic {
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

exports.Atomic = Atomic;

class Derived {
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

exports.Derived = Derived;

class DerivedAll {
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


exports.DerivedAll = DerivedAll;

function concrete(self) {
  return self;
}
//# sourceMappingURL=XRef.js.map