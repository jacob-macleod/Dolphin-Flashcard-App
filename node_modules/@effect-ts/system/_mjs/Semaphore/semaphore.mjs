// ets_tracing: off
import * as L from "../Collections/Immutable/List/index.mjs";
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as E from "../Either/index.mjs";
import { identity } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import * as R from "../Ref/index.mjs";
import { ImmutableQueue } from "../Support/ImmutableQueue/index.mjs";
import * as T from "./effect.mjs";
import * as M from "./managed.mjs";
import * as P from "./promise.mjs";
import { Acquisition, assertNonNegative } from "./state.mjs";
/**
 * An asynchronous semaphore, which is a generalization of a mutex. Semaphores
 * have a certain number of permits, which can be held and released
 * concurrently by different parties. Attempts to acquire more permits than
 * available result in the acquiring fiber being suspended until the specified
 * number of permits become available.
 **/

export class Semaphore {
  constructor(state) {
    this.state = state;
    this.loop = this.loop.bind(this);
    this.restore = this.restore.bind(this);
    this.releaseN = this.releaseN.bind(this);
    this.restore = this.restore.bind(this);
  }

  get available() {
    return T.map_(this.state.get, E.fold(() => 0, identity));
  }

  loop(n, state, acc) {
    // eslint-disable-next-line no-constant-condition
    while (1) {
      switch (state._tag) {
        case "Right":
          {
            return Tp.tuple(acc, E.right(n + state.right));
          }

        case "Left":
          {
            const d = state.left.dequeue();

            if (O.isNone(d)) {
              return Tp.tuple(acc, E.right(n));
            } else {
              const {
                tuple: [{
                  tuple: [p, m]
                }, q]
              } = d.value;

              if (n > m) {
                n = n - m;
                state = E.left(q);
                acc = T.zipLeft_(acc, P.succeed_(p, undefined));
              } else if (n === m) {
                return Tp.tuple(T.zipLeft_(acc, P.succeed_(p, undefined)), E.left(q));
              } else {
                return Tp.tuple(acc, E.left(q.prepend(Tp.tuple(p, m - n))));
              }
            }

            break;
          }
      }
    }

    throw new Error("Bug: we should never get here");
  }

  releaseN(toRelease) {
    return T.uninterruptible(T.flatten(T.chain_(assertNonNegative(toRelease), () => R.modify_(this.state, s => this.loop(toRelease, s, T.unit)))));
  }

  restore(p, n) {
    return T.flatten(R.modify_(this.state, E.fold(q => O.fold_(q.find(({
      tuple: [a]
    }) => a === p), () => Tp.tuple(this.releaseN(n), E.left(q)), x => Tp.tuple(this.releaseN(n - x[1]), E.left(q.filter(({
      tuple: [a]
    }) => a !== p)))), m => Tp.tuple(T.unit, E.right(n + m)))));
  }

  prepare(n) {
    if (n === 0) {
      return T.succeed(new Acquisition(T.unit, T.unit));
    } else {
      return T.chain_(P.make(), p => R.modify_(this.state, E.fold(q => Tp.tuple(new Acquisition(P.await(p), this.restore(p, n)), E.left(q.push(Tp.tuple(p, n)))), m => {
        if (m >= n) {
          return Tp.tuple(new Acquisition(T.unit, this.releaseN(n)), E.right(m - n));
        }

        return Tp.tuple(new Acquisition(P.await(p), this.restore(p, n)), E.left(new ImmutableQueue(L.of(Tp.tuple(p, n - m)))));
      })));
    }
  }

}
/**
 * Acquires `n` permits, executes the action and releases the permits right after.
 */

export function withPermits_(e, s, n) {
  return T.bracket_(s.prepare(n), a => T.chain_(a.waitAcquire, () => e), a => a.release);
}
/**
 * Acquires `n` permits, executes the action and releases the permits right after.
 *
 * @ets_data_first withPermits_
 */

export function withPermits(s, n) {
  return e => T.bracket_(s.prepare(n), a => T.chain_(a.waitAcquire, () => e), a => a.release);
}
/**
 * Acquires a permit, executes the action and releases the permit right after.
 */

export function withPermit_(self, s) {
  return withPermits_(self, s, 1);
}
/**
 * Acquires a permit, executes the action and releases the permit right after.
 *
 * @ets_data_first withPermit_
 */

export function withPermit(s) {
  return self => withPermit_(self, s);
}
/**
 * Acquires `n` permits in a `Managed` and releases the permits in the finalizer.
 */

export function withPermitsManaged(s, n) {
  return M.makeReserve(T.map_(s.prepare(n), a => M.makeReservation_(a.waitAcquire, () => a.release)));
}
/**
 * Acquires a permit in a `Managed` and releases the permit in the finalizer.
 */

export function withPermitManaged(s) {
  return withPermitsManaged(s, 1);
}
/**
 * The number of permits currently available.
 */

export function available(s) {
  return s.available;
}
/**
 * Creates a new `Sempahore` with the specified number of permits.
 */

export function makeSemaphore(permits) {
  return T.map_(R.makeRef(E.right(permits)), state => new Semaphore(state));
}
/**
 * Creates a new `Sempahore` with the specified number of permits.
 */

export function unsafeMakeSemaphore(permits) {
  const state = R.unsafeMakeRef(E.right(permits));
  return new Semaphore(state);
}
//# sourceMappingURL=semaphore.mjs.map