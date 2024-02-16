"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnboundedHub = void 0;

require("../../Operator/index.js");

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _Hub = /*#__PURE__*/require("./Hub.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class Node {
  constructor(value, subscribers, next) {
    this.value = value;
    this.subscribers = subscribers;
    this.next = next;
  }

}

class UnboundedHub extends _Hub.Hub {
  constructor() {
    super();
    this.publisherHead = new Node(null, 0, null);
    this.publisherIndex = 0;
    this.subscribersIndex = 0;
    this.capacity = Number.MAX_SAFE_INTEGER;
    this.publisherTail = this.publisherHead;
  }

  isEmpty() {
    return this.publisherHead === this.publisherTail;
  }

  isFull() {
    return false;
  }

  publish(a) {
    const subscribers = this.publisherTail.subscribers;

    if (subscribers !== 0) {
      this.publisherTail.next = new Node(a, subscribers, null);
      this.publisherTail = this.publisherTail.next;
      this.publisherIndex += 1;
    }

    return true;
  }

  publishAll(as) {
    for (const a of as) {
      this.publish(a);
    }

    return Chunk.empty();
  }

  size() {
    return this.publisherIndex - this.subscribersIndex;
  }

  slide() {
    if (this.publisherHead !== this.publisherTail) {
      this.publisherHead = this.publisherHead.next;
      this.publisherHead.value = null;
      this.subscribersIndex += 1;
    }
  }

  subscribe() {
    this.publisherTail.subscribers += 1;
    return new UnboundedHubSubscription(this, this.publisherTail, this.publisherIndex, false);
  }

}

exports.UnboundedHub = UnboundedHub;

class UnboundedHubSubscription extends _Hub.Subscription {
  constructor(self, subscriberHead, subscriberIndex, unsubscribed) {
    super();
    this.self = self;
    this.subscriberHead = subscriberHead;
    this.subscriberIndex = subscriberIndex;
    this.unsubscribed = unsubscribed;
  }

  isEmpty() {
    if (this.unsubscribed) {
      return true;
    }

    let empty = true;
    let loop = true;

    while (loop) {
      if (this.subscriberHead === this.self.publisherTail) {
        loop = false;
      } else {
        if (this.subscriberHead.next.value !== null) {
          empty = false;
          loop = false;
        } else {
          this.subscriberHead = this.subscriberHead.next;
          this.subscriberIndex += 1;
        }
      }
    }

    return empty;
  }

  poll(default_) {
    if (this.unsubscribed) {
      return default_;
    }

    let loop = true;
    let polled = default_;

    while (loop) {
      if (this.subscriberHead === this.self.publisherTail) {
        loop = false;
      } else {
        const a = this.subscriberHead.next.value;

        if (a !== null) {
          polled = a;
          this.subscriberHead.subscribers -= 1;

          if (this.subscriberHead.subscribers === 0) {
            this.self.publisherHead = this.self.publisherHead.next;
            this.self.publisherHead.value = null;
            this.self.subscribersIndex += 1;
          }

          loop = false;
        }

        this.subscriberHead = this.subscriberHead.next;
        this.subscriberIndex += 1;
      }
    }

    return polled;
  }

  pollUpTo(n) {
    let builder = Chunk.empty();
    const default_ = null;
    let i = 0;

    while (i !== n) {
      const a = this.poll(default_);

      if (a === default_) {
        i = n;
      } else {
        builder = Chunk.append_(builder, a);
        i += 1;
      }
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
      this.self.publisherTail.subscribers -= 1;

      while (this.subscriberHead !== this.self.publisherTail) {
        if (this.subscriberHead.next.value !== null) {
          this.subscriberHead.subscribers -= 1;

          if (this.subscriberHead.subscribers === 0) {
            this.self.publisherHead = this.self.publisherHead.next;
            this.self.publisherHead.value = null;
            this.self.subscribersIndex += 1;
          }
        }

        this.subscriberHead = this.subscriberHead.next;
      }
    }
  }

}
//# sourceMappingURL=UnboundedHub.js.map