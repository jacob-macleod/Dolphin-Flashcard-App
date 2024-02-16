"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoundedHubSingle = void 0;

require("../../Operator/index.js");

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _Hub = /*#__PURE__*/require("./Hub.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class BoundedHubSingle extends _Hub.Hub {
  constructor() {
    super();
    this.publisherIndex = 0;
    this.subscriberCount = 0;
    this.subscribers = 0;
    this.value = null;
    this.capacity = 1;
  }

  isEmpty() {
    return this.subscribers === 0;
  }

  isFull() {
    return !this.isEmpty();
  }

  publish(a) {
    if (this.isFull()) {
      return false;
    }

    if (this.subscriberCount !== 0) {
      this.value = a;
      this.subscribers = this.subscriberCount;
      this.publisherIndex += 1;
    }

    return true;
  }

  publishAll(as) {
    const list = Chunk.from(as);

    if (Chunk.isEmpty(list)) {
      return Chunk.empty();
    }

    if (this.publish(Chunk.unsafeHead(list))) {
      return Chunk.drop_(list, 1);
    } else {
      return list;
    }
  }

  size() {
    return this.isEmpty() ? 0 : 1;
  }

  slide() {
    if (this.isFull()) {
      this.subscribers = 0;
      this.value = null;
    }
  }

  subscribe() {
    this.subscriberCount += 1;
    return new BoundedHubSingleSubscription(this, this.publisherIndex, false);
  }

}

exports.BoundedHubSingle = BoundedHubSingle;

class BoundedHubSingleSubscription extends _Hub.Subscription {
  constructor(self, subscriberIndex, unsubscribed) {
    super();
    this.self = self;
    this.subscriberIndex = subscriberIndex;
    this.unsubscribed = unsubscribed;
  }

  isEmpty() {
    return this.unsubscribed || this.self.subscribers === 0 || this.subscriberIndex === this.self.publisherIndex;
  }

  poll(default_) {
    if (this.isEmpty()) {
      return default_;
    }

    const a = this.self.value;
    this.self.subscribers -= 1;

    if (this.self.subscribers === 0) {
      this.self.value = null;
    }

    this.subscriberIndex += 1;
    return a;
  }

  pollUpTo(n) {
    if (this.isEmpty() || n < 1) {
      return Chunk.empty();
    }

    const a = this.self.value;
    this.self.subscribers -= 1;

    if (this.self.subscribers === 0) {
      this.self.value = null;
    }

    this.subscriberIndex += 1;
    return Chunk.single(a);
  }

  size() {
    return this.isEmpty() ? 0 : 1;
  }

  unsubscribe() {
    if (!this.unsubscribed) {
      this.unsubscribed = true;
      this.self.subscriberCount -= 1;

      if (this.subscriberIndex !== this.self.publisherIndex) {
        this.self.subscribers -= 1;

        if (this.self.subscribers === 0) {
          this.self.value = null;
        }
      }
    }
  }

}
//# sourceMappingURL=BoundedHubSingle.js.map