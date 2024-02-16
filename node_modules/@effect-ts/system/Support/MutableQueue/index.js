"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Unbounded = exports.EmptyQueue = exports.Bounded = void 0;

require("../../Operator/index.js");

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/core.js"));

var _index2 = /*#__PURE__*/require("../DoublyLinkedList/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const EmptyQueue = /*#__PURE__*/Symbol.for("@effect-ts/system/MutableQueue/Empty");
exports.EmptyQueue = EmptyQueue;

class Unbounded {
  constructor() {
    this.queue = new _index2.DoublyLinkedList();
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

exports.Unbounded = Unbounded;

class Bounded {
  constructor(n) {
    this.queue = new _index2.DoublyLinkedList();
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

exports.Bounded = Bounded;
//# sourceMappingURL=index.js.map