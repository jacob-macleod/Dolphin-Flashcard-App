// ets_tracing: off
import "../../Operator/index.mjs";
import * as Chunk from "../../Collections/Immutable/Chunk/core.mjs";
import { DoublyLinkedList } from "../DoublyLinkedList/index.mjs";
export const EmptyQueue = /*#__PURE__*/Symbol.for("@effect-ts/system/MutableQueue/Empty");
export class Unbounded {
  constructor() {
    this.queue = new DoublyLinkedList();
  }

  get size() {
    return this.queue.length;
  }

  get isEmpty() {
    return this.size === 0;
  }

  get isFull() {
    return false;
  }

  get capacity() {
    return Number.MAX_SAFE_INTEGER;
  }

  offer(a) {
    this.queue.add(a);
    return true;
  }

  offerAll(as) {
    for (const a of as) {
      this.offer(a);
    }

    return Chunk.empty();
  }

  poll(a) {
    if (this.isEmpty) {
      return a;
    }

    return this.queue.shift();
  }

  pollUpTo(n) {
    let result = Chunk.empty();
    let count = 0;

    while (count < n) {
      const elem = this.poll(EmptyQueue);

      if (elem === EmptyQueue) {
        break;
      }

      result = Chunk.append_(result, elem);
      count += 1;
    }

    return result;
  }

}
export class Bounded {
  constructor(n) {
    this.queue = new DoublyLinkedList();
    this.n = n;
  }

  get size() {
    return this.queue.length;
  }

  get isEmpty() {
    return this.size === 0;
  }

  get isFull() {
    return this.size === this.capacity;
  }

  get capacity() {
    return this.n;
  }

  offer(a) {
    if (this.isFull) {
      return false;
    }

    this.queue.add(a);
    return true;
  }

  offerAll(as) {
    const it = as[Symbol.iterator]();
    let next;
    let rem = Chunk.empty();
    let offerig = true;

    while (offerig && (next = it.next()) && !next.done) {
      offerig = this.offer(next.value);
    }

    while (next && !next.done) {
      rem = Chunk.append_(rem, next.value);
      next = it.next();
    }

    return rem;
  }

  poll(a) {
    if (this.isEmpty) {
      return a;
    }

    return this.queue.shift();
  }

  pollUpTo(n) {
    let result = Chunk.empty();
    let count = 0;

    while (count < n) {
      const elem = this.poll(EmptyQueue);

      if (elem === EmptyQueue) {
        break;
      }

      result = Chunk.append_(result, elem);
      count += 1;
    }

    return result;
  }

}
//# sourceMappingURL=index.mjs.map