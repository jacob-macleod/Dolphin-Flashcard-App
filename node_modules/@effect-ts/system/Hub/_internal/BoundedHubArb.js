"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundedHubArb = void 0;

require("../../Operator/index.js");

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _Hub = /*#__PURE__*/require("./Hub.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class BoundedHubArb extends _Hub.Hub {
  constructor(requestedCapacity) {
    super();
    this.publisherIndex = 0;
    this.subscriberCount = 0;
    this.subscribersIndex = 0;
    this.array = Array.from({
      length: requestedCapacity
    });
    this.subscribers = Array.from({
      length: requestedCapacity
    });
    this.capacity = requestedCapacity;
  }

  isEmpty() {
    return this.publisherIndex === this.subscribersIndex;
  }

  isFull() {
    return this.publisherIndex === this.subscribersIndex + this.capacity;
  }

  publish(a) {
    if (this.isFull()) {
      return false;
    }

    if (this.subscriberCount !== 0) {
      const index = this.publisherIndex % this.capacity;
      this.array[index] = a;
      this.subscribers[index] = this.subscriberCount;
      this.publisherIndex += 1;
    }

    return true;
  }

  publishAll(as) {
    const asArray = Chunk.from(as);
    const n = Chunk.size(asArray);
    const size = this.publisherIndex - this.subscribersIndex;
    const available = this.capacity - size;
    const forHub = Math.min(n, available);

    if (forHub === 0) {
      return asArray;
    }

    let iteratorIndex = 0;
    const publishAllIndex = this.publisherIndex + forHub;

    while (this.publisherIndex !== publishAllIndex) {
      const a = Chunk.unsafeGet_(asArray, iteratorIndex++);
      const index = this.publisherIndex % this.capacity;
      this.array[index] = a;
      this.publisherIndex += 1;
    }

    return Chunk.drop_(asArray, iteratorIndex - 1);
  }

  size() {
    return this.publisherIndex - this.subscribersIndex;
  }

  slide() {
    if (this.subscribersIndex !== this.publisherIndex) {
      const index = this.subscribersIndex % this.capacity;
      this.array[index] = null;
      this.subscribers[index] = 0;
      this.subscribersIndex += 1;
    }
  }

  subscribe() {
    this.subscriberCount += 1;
    return new BoundedHubArbSubscription(this, this.publisherIndex, false);
  }

}

exports.BoundedHubArb = BoundedHubArb;

class BoundedHubArbSubscription extends _Hub.Subscription {
  constructor(self, subscriberIndex, unsubscribed) {
    super();
    this.self = self;
    this.subscriberIndex = subscriberIndex;
    this.unsubscribed = unsubscribed;
  }

  isEmpty() {
    return this.unsubscribed || this.self.publisherIndex === this.subscriberIndex || this.self.publisherIndex === this.self.subscribersIndex;
  }

  poll(default_) {
    if (this.unsubscribed) {
      return default_;
    }

    this.subscriberIndex = Math.max(this.subscriberIndex, this.self.subscribersIndex);

    if (this.subscriberIndex !== this.self.publisherIndex) {
      const index = this.subscriberIndex % this.self.capacity;
      const a = this.self.array[index];
      this.self.subscribers[index] -= 1;

      if (this.self.subscribers[index] === 0) {
        this.self.array[index] = null;
        this.self.subscribersIndex += 1;
      }

      this.subscriberIndex += 1;
      return a;
    }

    return default_;
  }

  pollUpTo(n) {
    if (this.unsubscribed) {
      return Chunk.empty();
    }

    this.subscriberIndex = Math.max(this.subscriberIndex, this.self.subscribersIndex);
    const size = this.self.publisherIndex - this.subscriberIndex;
    const toPoll = Math.min(n, size);

    if (toPoll <= 0) {
      return Chunk.empty();
    }

    let builder = Chunk.empty();
    const pollUpToIndex = this.subscriberIndex + toPoll;

    while (this.subscriberIndex !== pollUpToIndex) {
      const index = this.subscriberIndex % this.self.capacity;
      const a = this.self.array[index];
      builder = Chunk.append_(builder, a);
      this.subscriberIndex += 1;
    }

    return builder;
  }

  size() {
    if (this.unsubscribed) {
      return 0;
    }

    return this.self.publisherIndex - Math.max(this.subscriberIndex, this.self.subscribersIndex);
  }

  unsubscribe() {
    if (!this.unsubscribed) {
      this.unsubscribed = true;
      this.self.subscriberCount -= 1;
      this.subscriberIndex = Math.max(this.subscriberIndex, this.self.subscribersIndex);

      while (this.subscriberIndex !== this.self.publisherIndex) {
        const index = this.subscriberIndex % this.self.capacity;
        this.self.subscribers[index] -= 1;

        if (this.self.subscribers[index] === 0) {
          this.self.array[index] = null;
          this.self.subscribersIndex += 1;
        }

        this.subscriberIndex += 1;
      }
    }
  }

}
//# sourceMappingURL=BoundedHubArb.js.map