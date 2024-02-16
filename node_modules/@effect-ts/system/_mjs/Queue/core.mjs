// ets_tracing: off
import * as ChunkFilter from "../Collections/Immutable/Chunk/api/filter.mjs";
import * as Chunk from "../Collections/Immutable/Chunk/core.mjs";
import { EmptyQueue } from "../Support/MutableQueue/index.mjs";
import * as T from "./effect.mjs";
import * as P from "./promise.mjs";
import { concreteQueue } from "./xqueue.mjs";
export class DroppingStrategy {
  handleSurplus(_as, _queue, _takers, _isShutdown) {
    return T.succeed(false);
  }

  unsafeOnQueueEmptySpace(_queue) {//
  }

  get shutdown() {
    return T.unit;
  }

  get surplusSize() {
    return 0;
  }

}
export class SlidingStrategy {
  handleSurplus(as, queue, takers, _isShutdown) {
    return T.succeedWith(() => {
      this.unsafeSlidingOffer(queue, as);
      unsafeCompleteTakers(this, queue, takers);
      return true;
    });
  }

  unsafeOnQueueEmptySpace(_queue) {//
  }

  get shutdown() {
    return T.unit;
  }

  get surplusSize() {
    return 0;
  }

  unsafeSlidingOffer(queue, as) {
    let bs = as;

    while (Chunk.size(bs) > 0) {
      if (queue.capacity === 0) {
        return;
      } // poll 1 and retry


      queue.poll(EmptyQueue);

      if (queue.offer(Chunk.unsafeGet_(bs, 0))) {
        bs = Chunk.drop_(bs, 1);
      }
    }
  }

}
export function unsafeCompletePromise(p, a) {
  return P.unsafeDone(T.succeed(a))(p);
}
export function unsafeCompleteTakers(strategy, queue, takers) {
  let keepPolling = true;

  while (keepPolling && !queue.isEmpty) {
    const taker = takers.poll(EmptyQueue);

    if (taker !== EmptyQueue) {
      const element = queue.poll(EmptyQueue);

      if (element !== EmptyQueue) {
        unsafeCompletePromise(taker, element);
        strategy.unsafeOnQueueEmptySpace(queue, takers);
      } else {
        unsafeOfferAll(takers, Chunk.prepend_(unsafePollAll(takers), taker));
      }

      keepPolling = true;
    } else {
      keepPolling = false;
    }
  }
}
export function unsafeRemove(q, a) {
  unsafeOfferAll(q, ChunkFilter.filter_(unsafePollAll(q), b => a !== b));
}
export function unsafePollN(q, max) {
  return q.pollUpTo(max);
}
export function unsafeOfferAll(q, as) {
  return q.offerAll(as);
}
export function unsafePollAll(q) {
  let as = Chunk.empty();

  while (!q.isEmpty) {
    const elem = q.poll(EmptyQueue);

    if (elem !== EmptyQueue) {
      as = Chunk.append_(as, elem);
    }
  }

  return as;
}
/**
 * Waits until the queue is shutdown.
 * The `IO` returned by this method will not resume until the queue has been shutdown.
 * If the queue is already shutdown, the `IO` will resume right away.
 */

export function awaitShutdown(self) {
  ;
  return self.awaitShutdown;
}
/**
 * How many elements can hold in the queue
 */

export function capacity(self) {
  ;
  return self.capacity;
}
/**
 * `true` if `shutdown` has been called.
 */

export function isShutdown(self) {
  ;
  return self.isShutdown;
}
/**
 * Places one value in the queue.
 *
 * @ets_data_first offer_
 */

export function offer(a) {
  return self => offer_(self, a);
}
/**
 * Places one value in the queue.
 */

export function offer_(self, a) {
  ;
  return self.offer(a);
}
/**
 * Places one value in the queue.
 *
 * @ets_data_first offerTo_
 */

export function offerTo(self) {
  return a => offer_(self, a);
}
/**
 * Places one value in the queue.
 *
 * @ets_data_first offerTo_
 */

export function offerTo_(a, self) {
  return offer_(self, a);
}
/**
 * For Bounded Queue: uses the `BackPressure` Strategy, places the values in the queue and always returns true.
 * If the queue has reached capacity, then
 * the fiber performing the `offerAll` will be suspended until there is room in
 * the queue.
 *
 * For Unbounded Queue:
 * Places all values in the queue and returns true.
 *
 * For Sliding Queue: uses `Sliding` Strategy
 * If there is room in the queue, it places the values otherwise it removes the old elements and
 * enqueues the new ones. Always returns true.
 *
 * For Dropping Queue: uses `Dropping` Strategy,
 * It places the values in the queue but if there is no room it will not enqueue them and return false.
 *
 * @ets_data_first offerAll_
 */

export function offerAll(as) {
  return self => offerAll_(self, as);
}
/**
 * For Bounded Queue: uses the `BackPressure` Strategy, places the values in the queue and always returns true.
 * If the queue has reached capacity, then
 * the fiber performing the `offerAll` will be suspended until there is room in
 * the queue.
 *
 * For Unbounded Queue:
 * Places all values in the queue and returns true.
 *
 * For Sliding Queue: uses `Sliding` Strategy
 * If there is room in the queue, it places the values otherwise it removes the old elements and
 * enqueues the new ones. Always returns true.
 *
 * For Dropping Queue: uses `Dropping` Strategy,
 * It places the values in the queue but if there is no room it will not enqueue them and return false.
 */

export function offerAll_(self, as) {
  ;
  return self.offerAll(as);
}
/**
 * Interrupts any fibers that are suspended on `offer` or `take`.
 * Future calls to `offer*` and `take*` will be interrupted immediately.
 */

export function shutdown(self) {
  ;
  return self.shutdown;
}
/**
 * Retrieves the size of the queue, which is equal to the number of elements
 * in the queue. This may be negative if fibers are suspended waiting for
 * elements to be added to the queue.
 */

export function size(self) {
  ;
  return self.size;
}
/**
 * Removes the oldest value in the queue. If the queue is empty, this will
 * return a computation that resumes when an item has been added to the queue.
 */

export function take(self) {
  ;
  return self.take;
}
/**
 * Removes all the values in the queue and returns the list of the values. If the queue
 * is empty returns empty list.
 */

export function takeAll(self) {
  ;
  return self.takeAll;
}
/**
 * Takes up to max number of values in the queue.
 *
 * @ets_data_first takeAllUpTo_
 */

export function takeAllUpTo(n) {
  return self => takeAllUpTo_(self, n);
}
/**
 * Takes up to max number of values in the queue.
 */

export function takeAllUpTo_(self, n) {
  ;
  return self.takeUpTo(n);
}
//# sourceMappingURL=core.mjs.map