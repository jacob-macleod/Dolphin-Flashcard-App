// ets_tracing: off
import { collect_ } from "../Collections/Immutable/Chunk/api/collect.mjs";
import { filterEffect_ } from "../Collections/Immutable/Chunk/api/filterEffect.mjs";
import { mapEffect_ } from "../Collections/Immutable/Chunk/api/mapEffect.mjs";
import { zip_ } from "../Collections/Immutable/Chunk/api/zip.mjs";
import * as Chunk from "../Collections/Immutable/Chunk/core.mjs";
import { succeed } from "../Effect/core.mjs";
import * as exclForEach from "../Effect/excl-forEach.mjs";
import { BackPressureStrategy, createQueue, makeBoundedQueue as makeBounded, unsafeCreateQueue as unsafeCreate } from "../Effect/excl-forEach.mjs";
import { identity, pipe, tuple } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import { Bounded, Unbounded } from "../Support/MutableQueue/index.mjs";
import { DroppingStrategy, SlidingStrategy } from "./core.mjs";
import * as T from "./effect-api.mjs";
import { concreteQueue, XQueueInternal } from "./xqueue.mjs";
export { createQueue, makeBounded, unsafeCreate, BackPressureStrategy };
/**
 * Creates a sliding queue
 */

export function makeSliding(capacity) {
  return T.chain_(T.succeedWith(() => new Bounded(capacity)), exclForEach.createQueue(new SlidingStrategy()));
}
/**
 * Creates a unbouded queue
 */

export function makeUnbounded() {
  return T.chain_(T.succeedWith(() => new Unbounded()), exclForEach.createQueue(new DroppingStrategy()));
}
/**
 * Creates a dropping queue
 */

export function makeDropping(capacity) {
  return T.chain_(T.succeedWith(() => new Bounded(capacity)), exclForEach.createQueue(new DroppingStrategy()));
}

function takeRemainderLoop(self, n) {
  ;

  if (n <= 0) {
    return T.succeed(Chunk.empty());
  } else {
    return T.chain_(self.take, a => T.map_(takeRemainderLoop(self, n - 1), _ => Chunk.append_(_, a)));
  }
}
/**
 * Takes between min and max number of values from the queue. If there
 * is less than min items available, it'll block until the items are
 * collected.
 *
 * @ets_data_first takeBetween_
 */


export function takeBetween(min, max) {
  return self => takeBetween_(self, min, max);
}
/**
 * Takes between min and max number of values from the queue. If there
 * is less than min items available, it'll block until the items are
 * collected.
 */

export function takeBetween_(self, min, max) {
  ;

  if (max < min) {
    return T.succeed(Chunk.empty());
  } else {
    return T.chain_(self.takeUpTo(max), bs => {
      const remaining = min - Chunk.size(bs);

      if (remaining === 1) {
        return T.map_(self.take, b => Chunk.append_(bs, b));
      } else if (remaining > 1) {
        return T.map_(takeRemainderLoop(self, remaining), list => Chunk.concat_(bs, list));
      } else {
        return T.succeed(bs);
      }
    });
  }
}
/**
 * Creates a new queue from this queue and another. Offering to the composite queue
 * will broadcast the elements to both queues; taking from the composite queue
 * will dequeue elements from both queues and apply the function point-wise.
 *
 * Note that using queues with different strategies may result in surprising behavior.
 * For example, a dropping queue and a bounded queue composed together may apply `f`
 * to different elements.
 *
 * @ets_data_first bothWithM_
 */

export function bothWithM(that, f) {
  return self => bothWithM_(self, that, f);
}
/**
 * Creates a new queue from this queue and another. Offering to the composite queue
 * will broadcast the elements to both queues; taking from the composite queue
 * will dequeue elements from both queues and apply the function point-wise.
 *
 * Note that using queues with different strategies may result in surprising behavior.
 * For example, a dropping queue and a bounded queue composed together may apply `f`
 * to different elements.
 */

export function bothWithM_(self, that, f) {
  ;
  ;
  return new BothWithM(self, that, f);
}

class BothWithM extends XQueueInternal {
  constructor(self, that, f) {
    super();
    this.self = self;
    this.that = that;
    this.f = f;
    this.awaitShutdown = T.chain_(this.self.awaitShutdown, () => this.that.awaitShutdown);
    this.capacity = Math.min(this.self.capacity, this.that.capacity);
    this.isShutdown = this.self.isShutdown;
    this.shutdown = T.zipWithPar_(this.self.shutdown, this.that.shutdown, () => undefined);
    this.size = T.zipWithPar_(this.self.size, this.that.size, (x, y) => Math.max(x, y));
    this.take = T.chain_(T.zipPar_(this.self.take, this.that.take), ({
      tuple: [b, c]
    }) => this.f(b, c));
    this.takeAll = T.chain_(T.zipPar_(this.self.takeAll, this.that.takeAll), ({
      tuple: [bs, cs]
    }) => mapEffect_(zip_(bs, cs), ({
      tuple: [b, c]
    }) => this.f(b, c)));
  }

  offer(a) {
    return T.zipWithPar_(this.self.offer(a), this.that.offer(a), (x, y) => x && y);
  }

  offerAll(as) {
    return T.zipWithPar_(this.self.offerAll(as), this.that.offerAll(as), (x, y) => x && y);
  }

  takeUpTo(max) {
    return T.chain_(T.zipPar_(this.self.takeUpTo(max), this.that.takeUpTo(max)), ({
      tuple: [bs, cs]
    }) => mapEffect_(zip_(bs, cs), ({
      tuple: [b, c]
    }) => this.f(b, c)));
  }

}
/**
 * Like `bothWithM`, but uses a pure function.
 *
 * @ets_data_first bothWith_
 */


export function bothWith(that, f) {
  return self => bothWithM_(self, that, (b, c) => T.succeed(f(b, c)));
}
/**
 * Like `bothWithM`, but uses a pure function.
 */

export function bothWith_(self, that, f) {
  return bothWithM_(self, that, (b, c) => T.succeed(f(b, c)));
}
/**
 * Like `bothWith`, but tuples the elements instead of applying a function.
 *
 * @ets_data_first both_
 */

export function both(that) {
  return self => bothWith_(self, that, (b, c) => tuple(b, c));
}
/**
 * Like `bothWith`, but tuples the elements instead of applying a function.
 */

export function both_(self, that) {
  return bothWith_(self, that, (b, c) => tuple(b, c));
}
/**
 * Transforms elements enqueued into and dequeued from this queue with the
 * specified effectual functions.
 *
 * @ets_data_first dimap_
 */

export function dimap(f, g) {
  return self => dimap_(self, f, g);
}
/**
 * Transforms elements enqueued into and dequeued from this queue with the
 * specified effectual functions.
 */

export function dimap_(self, f, g) {
  return dimapM_(self, c => succeed(f(c)), b => succeed(g(b)));
}
/**
 * Transforms elements enqueued into and dequeued from this queue with the
 * specified effectual functions.
 *
 * @ets_data_first dimapM_
 */

export function dimapM(f, g) {
  return self => dimapM_(self, f, g);
}
/**
 * Transforms elements enqueued into and dequeued from this queue with the
 * specified effectual functions.
 */

export function dimapM_(self, f, g) {
  ;
  return new DimapM(self, f, g);
}

class DimapM extends XQueueInternal {
  constructor(self, f, g) {
    super();
    this.self = self;
    this.f = f;
    this.g = g;
    this.awaitShutdown = this.self.awaitShutdown;
    this.capacity = this.self.capacity;
    this.isShutdown = this.self.isShutdown;
    this.shutdown = this.self.shutdown;
    this.size = this.self.size;
    this.take = T.chain_(this.self.take, this.g);
    this.takeAll = T.chain_(this.self.takeAll, a => mapEffect_(a, this.g));
  }

  offer(a) {
    return T.chain_(this.f(a), a => this.self.offer(a));
  }

  offerAll(as) {
    return T.chain_(T.forEach_(as, this.f), as => this.self.offerAll(as));
  }

  takeUpTo(n) {
    return T.chain_(this.self.takeUpTo(n), bs => mapEffect_(bs, this.g));
  }

}
/**
 * Transforms elements enqueued into this queue with an effectful function.
 */


export function contramapM_(self, f) {
  return dimapM_(self, f, succeed);
}
/**
 * Transforms elements enqueued into this queue with an effectful function.
 *
 * @ets_data_first contramapM_
 */

export function contramapM(f) {
  return self => contramapM_(self, f);
}
/**
 * Transforms elements enqueued into this queue with a pure function.
 */

export function contramap_(self, f) {
  return dimapM_(self, c => succeed(f(c)), succeed);
}
/**
 * Transforms elements enqueued into this queue with a pure function.
 *
 * @ets_data_first contramap_
 */

export function contramap(f) {
  return self => contramap_(self, f);
}
/**
 * Like `filterInput`, but uses an effectful function to filter the elements.
 *
 * @ets_data_first filterInputM_
 */

export function filterInputM(f) {
  return self => filterInputM_(self, f);
}
/**
 * Like `filterInput`, but uses an effectful function to filter the elements.
 */

export function filterInputM_(self, f) {
  ;
  return new FilterInputM(self, f);
}

class FilterInputM extends XQueueInternal {
  constructor(self, f) {
    super();
    this.self = self;
    this.f = f;
    this.awaitShutdown = this.self.awaitShutdown;
    this.capacity = this.self.capacity;
    this.isShutdown = this.self.isShutdown;
    this.shutdown = this.self.shutdown;
    this.size = this.self.size;
    this.take = this.self.take;
    this.takeAll = this.self.takeAll;
  }

  offer(a) {
    return T.chain_(this.f(a), b => b ? this.self.offer(a) : T.succeed(false));
  }

  offerAll(as) {
    return T.chain_(T.forEach_(as, a => T.map_(this.f(a), b => b ? O.some(a) : O.none)), maybeAs => {
      const filtered = collect_(maybeAs, identity);

      if (Chunk.isEmpty(filtered)) {
        return T.succeed(false);
      } else {
        return this.self.offerAll(filtered);
      }
    });
  }

  takeUpTo(n) {
    return this.self.takeUpTo(n);
  }

}
/**
 * Filters elements dequeued from the queue using the specified effectual
 * predicate.
 */


export function filterOutputM_(self, f) {
  ;
  return new FilterOutputM(self, f);
}

class FilterOutputM extends XQueueInternal {
  constructor(self, f) {
    super();
    this.self = self;
    this.f = f;
    this.awaitShutdown = this.self.awaitShutdown;
    this.capacity = this.self.capacity;
    this.isShutdown = this.self.isShutdown;
    this.shutdown = this.self.shutdown;
    this.size = this.self.size;
    this.take = T.chain_(this.self.take, b => {
      return T.chain_(this.f(b), p => {
        return p ? T.succeed(b) : this.take;
      });
    });
    this.takeAll = T.chain_(this.self.takeAll, bs => filterEffect_(bs, this.f));
  }

  offer(a) {
    return this.self.offer(a);
  }

  offerAll(as) {
    return this.self.offerAll(as);
  }

  loop(max, acc) {
    return T.chain_(this.self.takeUpTo(max), bs => {
      if (Chunk.isEmpty(bs)) {
        return T.succeed(acc);
      }

      return T.chain_(filterEffect_(bs, this.f), filtered => {
        const length = Chunk.size(filtered);

        if (length === max) {
          return T.succeed(Chunk.concat_(acc, filtered));
        } else {
          return this.loop(max - length, Chunk.concat_(acc, filtered));
        }
      });
    });
  }

  takeUpTo(n) {
    return T.suspend(() => {
      return this.loop(n, Chunk.empty());
    });
  }

}
/**
 * Filters elements dequeued from the queue using the specified effectual
 * predicate.
 *
 * @ets_data_first filterOutputM_
 */


export function filterOutputM(f) {
  return self => filterOutputM_(self, f);
}
/**
 * Filters elements dequeued from the queue using the specified predicate.
 */

export function filterOutput_(self, f) {
  return filterOutputM_(self, b => T.succeed(f(b)));
}
/**
 * Filters elements dequeued from the queue using the specified predicate.
 *
 * @ets_data_first filterOutput_
 */

export function filterOutput(f) {
  return self => filterOutput_(self, f);
}
/**
 * Applies a filter to elements enqueued into this queue. Elements that do not
 * pass the filter will be immediately dropped.
 *
 * @ets_data_first filterInput_
 */

export function filterInput(f) {
  return self => filterInput_(self, f);
}
/**
 * Applies a filter to elements enqueued into this queue. Elements that do not
 * pass the filter will be immediately dropped.
 */

export function filterInput_(self, f) {
  return filterInputM_(self, a => T.succeed(f(a)));
}
/**
 * Transforms elements dequeued from this queue with a function.
 */

export function map_(self, f) {
  return mapM_(self, _ => T.succeed(f(_)));
}
/**
 * Transforms elements dequeued from this queue with a function.
 *
 * @ets_data_first map_
 */

export function map(f) {
  return self => map_(self, f);
}
/**
 * Transforms elements dequeued from this queue with an effectful function.
 *
 * @ets_data_first mapM_
 */

export function mapM(f) {
  return self => mapM_(self, f);
}
/**
 * Transforms elements dequeued from this queue with an effectful function.
 */

export function mapM_(self, f) {
  return dimapM_(self, a => T.succeed(a), f);
}
/**
 * Take the head option of values in the queue.
 */

export function poll(self) {
  ;
  return T.map_(self.takeUpTo(1), x => Chunk.unsafeGet_(x, 0));
}
//# sourceMappingURL=api.mjs.map