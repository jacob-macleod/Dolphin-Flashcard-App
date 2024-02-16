// ets_tracing: off
import "../Operator/index.mjs";
import { combineSeq, empty } from "../Cause/cause.mjs";
/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/Scope.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */

import * as A from "../Collections/Immutable/Array/index.mjs";
import { cause } from "../Effect/cause.mjs";
import { succeed, succeedWith, suspend } from "../Effect/core.mjs";
import { map_ } from "../Effect/map.mjs";
import { uncause } from "../Effect/uncause.mjs";
import { zipWith_ } from "../Effect/zipWith.mjs";
import * as E from "../Either/index.mjs";
import { AtomicNumber } from "../Support/AtomicNumber/index.mjs";
import { AtomicReference } from "../Support/AtomicReference/index.mjs";
/**
 * Represents a key in a scope, which is associated with a single finalizer.
 */

export class Key {
  constructor(remove) {
    /**
     * Attempts to remove the finalizer associated with this key from the
     * scope. The returned effect will succeed with a boolean, which indicates
     * whether the attempt was successful. A value of `true` indicates the
     * finalizer will not be executed, while a value of `false` indicates the
     * finalizer was already executed.
     */
    this.remove = succeed(false);

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

export class Global {
  constructor() {
    this._tag = "Global";
    this.unsafeEnsureResult = E.right(new Key(succeedWith(() => true)));
    this.ensureResult = succeedWith(() => this.unsafeEnsureResult);
    this.deny = this.deny.bind(this);
    this.ensure = this.ensure.bind(this);
    this.extend = this.extend.bind(this);
    this.unsafeEnsure = this.unsafeEnsure.bind(this);
    this.unsafeExtend = this.unsafeExtend.bind(this);
  }

  get closed() {
    return succeed(false);
  }

  deny(_key) {
    return succeed(true);
  }

  get empty() {
    return succeed(false);
  }

  ensure(_finalizer) {
    return this.ensureResult;
  }

  extend(that) {
    return succeedWith(() => this.unsafeExtend(that));
  }

  get open() {
    return map_(this.closed, c => !c);
  }

  get released() {
    return succeed(false);
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
export class OrderedFinalizer {
  constructor(order, finalizer) {
    this.order = order;
    this.finalizer = finalizer;
  }

}
const noCause = empty;
const noCauseEffect = /*#__PURE__*/succeed(noCause);
export class Local {
  constructor(finalizerCount, exitValue, references, finalizers) {
    this.finalizerCount = finalizerCount;
    this.exitValue = exitValue;
    this.references = references;
    this.finalizers = finalizers;
    this._tag = "Local";
  }

  get closed() {
    return succeedWith(() => this.unsafeClosed);
  }

  get open() {
    return map_(this.closed, c => !c);
  }

  deny(key) {
    return succeedWith(() => this.unsafeDeny(key));
  }

  get empty() {
    return succeedWith(() => this.finalizers.size === 0);
  }

  ensure(finalizer) {
    return succeedWith(() => this.unsafeEnsure(finalizer));
  }

  extend(that) {
    return succeedWith(() => this.unsafeExtend(that));
  }

  get released() {
    return succeedWith(() => this.unsafeReleased());
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
    return suspend(() => {
      const result = this.unsafeRelease();

      if (result != null) {
        return map_(result, () => true);
      } else {
        return succeed(false);
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
      return uncause(A.reduce_(sorted, noCauseEffect, (acc, o) => o != null ? zipWith_(acc, cause(o.finalizer(a)), (a, b) => combineSeq(a, b)) : acc));
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

export const globalScope = /*#__PURE__*/new Global();
/**
 * A tuple that contains an open scope, together with a function that closes
 * the scope.
 */

export class Open {
  constructor(close, scope) {
    this.close = close;
    this.scope = scope;
  }

}
export function unsafeMakeScope() {
  const exitValue = new AtomicReference(null);
  const finalizers = new Map();
  const scope = new Local(new AtomicNumber(Number.MIN_SAFE_INTEGER), exitValue, new AtomicNumber(1), finalizers);
  return new Open(a => {
    return suspend(() => {
      const result = scope.unsafeClose(a);

      if (result != null) {
        return map_(result, () => true);
      } else {
        return succeed(false);
      }
    });
  }, scope);
}
export function makeScope() {
  return succeedWith(() => unsafeMakeScope());
}
//# sourceMappingURL=index.mjs.map