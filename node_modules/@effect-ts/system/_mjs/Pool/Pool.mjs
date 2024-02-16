// ets_tracing: off
import * as CS from "../Cause/index.mjs";
import * as HS from "../Collections/Immutable/HashSet/index.mjs";
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as T from "../Effect/index.mjs";
import * as Ex from "../Exit/index.mjs";
import * as F from "../Fiber/index.mjs";
import { pipe } from "../Function/index.mjs";
import * as M from "../Managed/index.mjs";
import * as Q from "../Queue/index.mjs";
import * as Ref from "../Ref/index.mjs";
import * as AT from "./Attempted.mjs";
import * as STR from "./Strategy.mjs";

class Pool {}

T._E, T._A;

class PoolInternal extends Pool {}

T._E, T._A;

function concrete(pool) {//
}

export function get(self) {
  concrete(self);
  return self.get();
}
export function invalidate_(self, item) {
  concrete(self);
  return self.invalidate(item);
}
export function invalidate(item) {
  return self => invalidate_(self, item);
}
export class DefaultPool extends PoolInternal {
  constructor(creator, range, isShuttingDown, state, items, invalidated, track) {
    super();
    this.creator = creator;
    this.range = range;
    this.isShuttingDown = isShuttingDown;
    this.state = state;
    this.items = items;
    this.invalidated = invalidated;
    this.track = track;
    this.excess = this.excess.bind(this);
    this.get = this.get.bind(this);
    this.initialize = this.initialize.bind(this);
    this.invalidate = this.invalidate.bind(this);
    this.shrink = this.shrink.bind(this);
    this.allocate = this.allocate.bind(this);
    this.getAndShutdown = this.getAndShutdown.bind(this);
    this.shutdown = this.shutdown.bind(this);
  }
  /**
   * Returns the number of items in the pool in excess of the minimum size.
   */


  excess() {
    return T.map_(this.state.get, ({
      free,
      size
    }) => size - Math.min(Tp.get_(this.range, 0), free));
  }

  get() {
    const acquire = T.chain_(this.isShuttingDown.get, down => {
      if (down) {
        return T.interrupt;
      } else {
        return T.flatten(Ref.modify_(this.state, ({
          free,
          size
        }) => {
          if (free > 0 || size >= Tp.get_(this.range, 1)) {
            return Tp.tuple(T.chain_(Q.take(this.items), acquired => {
              if (acquired.result._tag === "Success") {
                const item = acquired.result.value;
                return T.chain_(this.invalidated.get, set => {
                  if (HS.has_(set, item)) {
                    return T.zipRight_(T.zipRight_(Ref.update_(this.state, state => ({ ...state,
                      free: state.free + 1
                    })), this.allocate()), acquire);
                  } else {
                    return T.succeed(acquired);
                  }
                });
              } else {
                return T.succeed(acquired);
              }
            }), {
              size,
              free: free - 1
            });
          } else if (size >= 0) {
            return Tp.tuple(T.zipRight_(this.allocate(), acquire), {
              size: size + 1,
              free: free + 1
            });
          } else {
            return Tp.tuple(T.interrupt, {
              size,
              free
            });
          }
        }));
      }
    });

    const release = attempted => {
      if (AT.isFailure(attempted)) {
        return T.flatten(Ref.modify_(this.state, ({
          free,
          size
        }) => {
          if (size <= Tp.get_(this.range, 0)) {
            return Tp.tuple(this.allocate(), {
              size,
              free: free + 1
            });
          } else {
            return Tp.tuple(T.unit, {
              size: size - 1,
              free
            });
          }
        }));
      } else {
        return T.zipRight_(T.zipRight_(T.zipRight_(Ref.update_(this.state, state => ({ ...state,
          free: state.free + 1
        })), Q.offer_(this.items, attempted)), this.track(attempted.result)), T.whenM_(this.getAndShutdown(), this.isShuttingDown.get));
      }
    };

    return M.chain_(M.make_(acquire, release), AT.toManaged);
  }
  /**
   * Begins pre-allocating pool entries based on minimum pool size.
   */


  initialize() {
    return T.replicateMUnit_(T.uninterruptibleMask(({
      restore
    }) => T.flatten(Ref.modify_(this.state, ({
      free,
      size
    }) => {
      if (size < Tp.get_(this.range, 0) && size >= 0) {
        return Tp.tuple(T.map_(T.tap_(T.tap_(T.tap_(T.bind_(T.bind_(T.bind_(T.do, "reservation", () => M.managedReserve(this.creator)), "exit", ({
          reservation
        }) => T.result(restore(reservation.acquire))), "attempted", ({
          exit,
          reservation
        }) => T.succeed(new AT.Attempted(exit, reservation.release(Ex.succeed(undefined))))), ({
          attempted
        }) => Q.offer_(this.items, attempted)), ({
          attempted
        }) => this.track(attempted.result)), () => T.whenM_(this.getAndShutdown(), this.isShuttingDown.get)), ({
          attempted
        }) => attempted), {
          size: size + 1,
          free: free + 1
        });
      } else {
        return Tp.tuple(T.unit, {
          size,
          free
        });
      }
    }))), Tp.get_(this.range, 0));
  }

  invalidate(item) {
    return Ref.update_(this.invalidated, _ => HS.add_(_, item));
  }
  /**
   * Shrinks the pool down, but never to less than the minimum size.
   */


  shrink() {
    return T.uninterruptible(T.flatten(Ref.modify_(this.state, ({
      free,
      size
    }) => {
      if (size > Tp.get_(this.range, 0) && free > 0) {
        return Tp.tuple(T.chain_(Q.take(this.items), attempted => T.zipRight_(T.zipRight_(AT.forEachUnit(a => Ref.update_(this.invalidated, _ => HS.remove_(_, a)))(attempted), attempted.finalizer), Ref.update_(this.state, state => ({ ...state,
          size: state.size - 1
        })))), {
          size,
          free: free - 1
        });
      } else {
        return Tp.tuple(T.unit, {
          size,
          free
        });
      }
    })));
  }

  allocate() {
    return T.uninterruptibleMask(({
      restore
    }) => T.map_(T.tap_(T.tap_(T.tap_(T.bind_(T.bind_(T.bind_(T.do, "reservation", () => M.managedReserve(this.creator)), "exit", ({
      reservation
    }) => T.result(restore(reservation.acquire))), "attempted", ({
      exit,
      reservation
    }) => T.succeed(new AT.Attempted(exit, reservation.release(Ex.succeed(undefined))))), ({
      attempted
    }) => Q.offer_(this.items, attempted)), ({
      attempted
    }) => this.track(attempted.result)), () => T.whenM_(this.getAndShutdown(), this.isShuttingDown.get)), ({
      attempted
    }) => attempted));
  }
  /**
   * Gets items from the pool and shuts them down as long as there are items
   * free, signalling shutdown of the pool if the pool is empty.
   */


  getAndShutdown() {
    return T.flatten(Ref.modify_(this.state, ({
      free,
      size
    }) => {
      if (free > 0) {
        return Tp.tuple(T.foldCauseM_(Q.take(this.items), _ => T.unit, attempted => T.zipRight_(T.zipRight_(T.zipRight_(AT.forEachUnit(a => Ref.update_(this.invalidated, _ => HS.remove_(_, a)))(attempted), attempted.finalizer), Ref.update_(this.state, state => ({ ...state,
          size: state.size - 1
        }))), this.getAndShutdown())), {
          size,
          free: free - 1
        });
      } else if (size > 0) {
        return Tp.tuple(T.unit, {
          size,
          free
        });
      } else {
        return Tp.tuple(Q.shutdown(this.items), {
          size: size - 1,
          free
        });
      }
    }));
  }

  shutdown() {
    return T.flatten(Ref.modify_(this.isShuttingDown, down => {
      if (down) {
        return Tp.tuple(Q.awaitShutdown(this.items), true);
      } else {
        return Tp.tuple(T.zipRight_(this.getAndShutdown(), Q.awaitShutdown(this.items)), true);
      }
    }));
  }

}
/**
 * Creates a pool from a fixed number of pre-allocated items. This method
 * should only be used when there is no cleanup or release operation
 * associated with items in the pool. If cleanup or release is required,
 * then the `make` constructor should be used instead.
 */

export function fromIterable(iterable0) {
  return M.map_(M.bind_(M.let_(M.bind_(M.bind_(M.do, "iterable", () => M.succeed(Array.from(iterable0))), "source", ({
    iterable
  }) => T.toManaged(Ref.makeRef(iterable))), "get", ({
    iterable,
    source
  }) => {
    if (!iterable.length) {
      return T.never;
    } else {
      return Ref.modify_(source, a => {
        if (a.length > 0) {
          return Tp.tuple(a[0], a.slice(1));
        }

        throw new CS.IllegalArgumentException("No item in array");
      });
    }
  }), "pool", ({
    get,
    iterable
  }) => makeFixed(M.fromEffect(get), iterable.length)), ({
    pool
  }) => pool);
}
/**
 * Makes a new pool of the specified fixed size. The pool is returned in a
 * `Managed`, which governs the lifetime of the pool. When the pool is
 * shutdown because the `Managed` is used, the individual items allocated by
 * the pool will be released in some unspecified order.
 */

export function makeFixed(get, min) {
  return makeWith(get, Tp.tuple(min, min), new STR.None());
}
/**
 * Makes a new pool with the specified minimum and maximum sizes and time to
 * live before a pool whose excess items are not being used will be shrunk
 * down to the minimum size. The pool is returned in a `Managed`, which
 * governs the lifetime of the pool. When the pool is shutdown because the
 * `Managed` is used, the individual items allocated by the pool will be
 * released in some unspecified order.
 */

export function make(get, range, timeToLive) {
  return makeWith(get, range, new STR.TimeToLive(timeToLive));
}
/**
 * A more powerful variant of `make` that allows specifying a `Strategy` that
 * describes how a pool whose excess items are not being used will be shrunk
 * down to the minimum size.
 */

export function makeWith(get, range, strategy) {
  return M.map_(M.tap_(M.bind_(M.bind_(M.let_(M.bind_(M.bind_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "env", () => M.environment()), "down", () => T.toManaged(Ref.makeRef(false))), "state", () => T.toManaged(Ref.makeRef({
    size: 0,
    free: 0
  }))), "items", () => T.toManaged(Q.makeBounded(Tp.get_(range, 1)))), "inv", () => T.toManaged(Ref.makeRef(HS.make()))), "initial", () => T.toManaged(strategy.initial())), "pool", ({
    down,
    env,
    initial,
    inv,
    items,
    state
  }) => new DefaultPool(M.provideAll_(get, env), range, down, state, items, inv, strategy.track(initial))), "fiber", ({
    pool
  }) => T.toManaged(T.forkDaemon(pool.initialize()))), "shrink", ({
    initial,
    pool
  }) => T.toManaged(T.forkDaemon(strategy.run(initial, pool.excess(), pool.shrink())))), ({
    fiber,
    pool,
    shrink
  }) => M.finalizer(T.zipRight_(T.zipRight_(F.interrupt(fiber), F.interrupt(shrink)), pool.shutdown()))), ({
    pool
  }) => pool);
}
//# sourceMappingURL=Pool.mjs.map