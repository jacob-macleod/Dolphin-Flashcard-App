"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globalScope = exports.OrderedFinalizer = exports.Open = exports.Local = exports.Key = exports.Global = void 0;
exports.makeScope = makeScope;
exports.unsafeMakeScope = unsafeMakeScope;

require("../Operator/index.js");

var _cause = /*#__PURE__*/require("../Cause/cause.js");

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Array/index.js"));

var _cause2 = /*#__PURE__*/require("../Effect/cause.js");

var _core = /*#__PURE__*/require("../Effect/core.js");

var _map = /*#__PURE__*/require("../Effect/map.js");

var _uncause = /*#__PURE__*/require("../Effect/uncause.js");

var _zipWith = /*#__PURE__*/require("../Effect/zipWith.js");

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index4 = /*#__PURE__*/require("../Support/AtomicNumber/index.js");

var _index5 = /*#__PURE__*/require("../Support/AtomicReference/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/Scope.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */

/**
 * Represents a key in a scope, which is associated with a single finalizer.
 */
class Key {
  constructor(remove) {
    /**
     * Attempts to remove the finalizer associated with this key from the
     * scope. The returned effect will succeed with a boolean, which indicates
     * whether the attempt was successful. A value of `true` indicates the
     * finalizer will not be executed, while a value of `false` indicates the
     * finalizer was already executed.
     */
    this.remove = (0, _core.succeed)(false);

    if (remove) {
      this.remove = remove;
    }
  }

  setRemove(remove) {
    this.remove = remove;
  }

}
/**
 * The global scope, which is entirely stateless. Finalizers added to the
 * global scope will never be executed (nor kept in memory).
 */


exports.Key = Key;

class Global {
  constructor() {
    this._tag = "Global";
    this.unsafeEnsureResult = E.right(new Key((0, _core.succeedWith)(() => true)));
    this.ensureResult = (0, _core.succeedWith)(() => this.unsafeEnsureResult);
    this.deny = this.deny.bind(this);
    this.ensure = this.ensure.bind(this);
    this.extend = this.extend.bind(this);
    this.unsafeEnsure = this.unsafeEnsure.bind(this);
    this.unsafeExtend = this.unsafeExtend.bind(this);
  }

  get closed() {
    return (0, _core.succeed)(false);
  }

  deny(_key) {
    return (0, _core.succeed)(true);
  }

  get empty() {
    return (0, _core.succeed)(false);
  }

  ensure(_finalizer) {
    return this.ensureResult;
  }

  extend(that) {
    return (0, _core.succeedWith)(() => this.unsafeExtend(that));
  }

  get open() {
    return (0, _map.map_)(this.closed, c => !c);
  }

  get released() {
    return (0, _core.succeed)(false);
  }

  unsafeEnsure(_finalizer) {
    return this.unsafeEnsureResult;
  }

  unsafeExtend(that) {
    switch (that._tag) {
      case "Global":
        return true;

      case "Local":
        return that.unsafeAddRef();
    }
  }

  unsafeDeny() {
    return true;
  }

}

exports.Global = Global;

class OrderedFinalizer {
  constructor(order, finalizer) {
    this.order = order;
    this.finalizer = finalizer;
  }

}

exports.OrderedFinalizer = OrderedFinalizer;
const noCause = _cause.empty;
const noCauseEffect = /*#__PURE__*/(0, _core.succeed)(noCause);

class Local {
  constructor(finalizerCount, exitValue, references, finalizers) {
    this.finalizerCount = finalizerCount;
    this.exitValue = exitValue;
    this.references = references;
    this.finalizers = finalizers;
    this._tag = "Local";
  }

  get closed() {
    return (0, _core.succeedWith)(() => this.unsafeClosed);
  }

  get open() {
    return (0, _map.map_)(this.closed, c => !c);
  }

  deny(key) {
    return (0, _core.succeedWith)(() => this.unsafeDeny(key));
  }

  get empty() {
    return (0, _core.succeedWith)(() => this.finalizers.size === 0);
  }

  ensure(finalizer) {
    return (0, _core.succeedWith)(() => this.unsafeEnsure(finalizer));
  }

  extend(that) {
    return (0, _core.succeedWith)(() => this.unsafeExtend(that));
  }

  get released() {
    return (0, _core.succeedWith)(() => this.unsafeReleased());
  }

  unsafeExtend(that) {
    if (this === that) {
      return true;
    }

    switch (that._tag) {
      case "Global":
        return true;

      case "Local":
        if (!this.unsafeClosed && !that.unsafeClosed) {
          that.unsafeAddRef();
          this.unsafeEnsure(_ => that.release);
          return true;
        } else {
          return false;
        }

    }
  }

  get release() {
    return (0, _core.suspend)(() => {
      const result = this.unsafeRelease();

      if (result != null) {
        return (0, _map.map_)(result, () => true);
      } else {
        return (0, _core.succeed)(false);
      }
    });
  }

  unsafeReleased() {
    return this.references.get <= 0;
  }

  unsafeEnsure(finalizer) {
    if (this.unsafeClosed) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return E.left(this.exitValue.get);
    }

    const key = new Key();
    key.setRemove(this.deny(key));
    this.finalizers.set(key, new OrderedFinalizer(this.finalizerCount.incrementAndGet(), finalizer));
    return E.right(key);
  }

  unsafeAddRef() {
    if (this.unsafeClosed) {
      return false;
    }

    this.references.incrementAndGet();
    return true;
  }

  get unsafeClosed() {
    return this.exitValue.get != null;
  }

  unsafeDeny(key) {
    if (this.unsafeClosed) {
      return false;
    } else {
      return this.finalizers.delete(key);
    }
  }

  unsafeClose(a) {
    this.exitValue.compareAndSet(null, a);
    return this.unsafeRelease();
  }

  unsafeRelease() {
    if (this.references.decrementAndGet() === 0) {
      const totalSize = this.finalizers.size;

      if (totalSize === 0) {
        return null;
      }

      const array = Array.from(this.finalizers.values());
      const sorted = array.sort((l, r) => l == null ? -1 : r == null ? 1 : l.order - r.order);
      const a = this.exitValue.get;
      return (0, _uncause.uncause)(A.reduce_(sorted, noCauseEffect, (acc, o) => o != null ? (0, _zipWith.zipWith_)(acc, (0, _cause2.cause)(o.finalizer(a)), (a, b) => (0, _cause.combineSeq)(a, b)) : acc));
    } else {
      return null;
    }
  }

  get unsafeEmpty() {
    return this.finalizers.size === 0;
  }

}
/**
 * The global scope, which is entirely stateless. Finalizers added to the
 * global scope will never be executed (nor kept in memory).
 */


exports.Local = Local;
const globalScope = /*#__PURE__*/new Global();
/**
 * A tuple that contains an open scope, together with a function that closes
 * the scope.
 */

exports.globalScope = globalScope;

class Open {
  constructor(close, scope) {
    this.close = close;
    this.scope = scope;
  }

}

exports.Open = Open;

function unsafeMakeScope() {
  const exitValue = new _index5.AtomicReference(null);
  const finalizers = new Map();
  const scope = new Local(new _index4.AtomicNumber(Number.MIN_SAFE_INTEGER), exitValue, new _index4.AtomicNumber(1), finalizers);
  return new Open(a => {
    return (0, _core.suspend)(() => {
      const result = scope.unsafeClose(a);

      if (result != null) {
        return (0, _map.map_)(result, () => true);
      } else {
        return (0, _core.succeed)(false);
      }
    });
  }, scope);
}

function makeScope() {
  return (0, _core.succeedWith)(() => unsafeMakeScope());
}
//# sourceMappingURL=index.js.map