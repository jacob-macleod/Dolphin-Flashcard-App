"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Semaphore = void 0;
exports.available = available;
exports.makeSemaphore = makeSemaphore;
exports.unsafeMakeSemaphore = unsafeMakeSemaphore;
exports.withPermit = withPermit;
exports.withPermitManaged = withPermitManaged;
exports.withPermit_ = withPermit_;
exports.withPermits = withPermits;
exports.withPermitsManaged = withPermitsManaged;
exports.withPermits_ = withPermits_;

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/List/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index4 = /*#__PURE__*/require("../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Ref/index.js"));

var _index7 = /*#__PURE__*/require("../Support/ImmutableQueue/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./managed.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./promise.js"));

var _state = /*#__PURE__*/require("./state.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * An asynchronous semaphore, which is a generalization of a mutex. Semaphores
 * have a certain number of permits, which can be held and released
 * concurrently by different parties. Attempts to acquire more permits than
 * available result in the acquiring fiber being suspended until the specified
 * number of permits become available.
 **/
class Semaphore {
  constructor(state) {
    this.state = state;
    this.loop = this.loop.bind(this);
    this.restore = this.restore.bind(this);
    this.releaseN = this.releaseN.bind(this);
    this.restore = this.restore.bind(this);
  }

  get available() {
    return T.map_(this.state.get, E.fold(() => 0, _index4.identity));
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
    return T.uninterruptible(T.flatten(T.chain_((0, _state.assertNonNegative)(toRelease), () => R.modify_(this.state, s => this.loop(toRelease, s, T.unit)))));
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
      return T.succeed(new _state.Acquisition(T.unit, T.unit));
    } else {
      return T.chain_(P.make(), p => R.modify_(this.state, E.fold(q => Tp.tuple(new _state.Acquisition(P.await(p), this.restore(p, n)), E.left(q.push(Tp.tuple(p, n)))), m => {
        if (m >= n) {
          return Tp.tuple(new _state.Acquisition(T.unit, this.releaseN(n)), E.right(m - n));
        }

        return Tp.tuple(new _state.Acquisition(P.await(p), this.restore(p, n)), E.left(new _index7.ImmutableQueue(L.of(Tp.tuple(p, n - m)))));
      })));
    }
  }

}
/**
 * Acquires `n` permits, executes the action and releases the permits right after.
 */


exports.Semaphore = Semaphore;

function withPermits_(e, s, n) {
  return T.bracket_(s.prepare(n), a => T.chain_(a.waitAcquire, () => e), a => a.release);
}
/**
 * Acquires `n` permits, executes the action and releases the permits right after.
 *
 * @ets_data_first withPermits_
 */


function withPermits(s, n) {
  return e => T.bracket_(s.prepare(n), a => T.chain_(a.waitAcquire, () => e), a => a.release);
}
/**
 * Acquires a permit, executes the action and releases the permit right after.
 */


function withPermit_(self, s) {
  return withPermits_(self, s, 1);
}
/**
 * Acquires a permit, executes the action and releases the permit right after.
 *
 * @ets_data_first withPermit_
 */


function withPermit(s) {
  return self => withPermit_(self, s);
}
/**
 * Acquires `n` permits in a `Managed` and releases the permits in the finalizer.
 */


function withPermitsManaged(s, n) {
  return M.makeReserve(T.map_(s.prepare(n), a => M.makeReservation_(a.waitAcquire, () => a.release)));
}
/**
 * Acquires a permit in a `Managed` and releases the permit in the finalizer.
 */


function withPermitManaged(s) {
  return withPermitsManaged(s, 1);
}
/**
 * The number of permits currently available.
 */


function available(s) {
  return s.available;
}
/**
 * Creates a new `Sempahore` with the specified number of permits.
 */


function makeSemaphore(permits) {
  return T.map_(R.makeRef(E.right(permits)), state => new Semaphore(state));
}
/**
 * Creates a new `Sempahore` with the specified number of permits.
 */


function unsafeMakeSemaphore(permits) {
  const state = R.unsafeMakeRef(E.right(permits));
  return new Semaphore(state);
}
//# sourceMappingURL=semaphore.js.map