// ets_tracing: off
import "../../Operator/index.mjs";
import * as Chunk from "../../Collections/Immutable/Chunk/index.mjs";
import { Hub, Subscription } from "./Hub.mjs";

class Node {
  constructor(value, subscribers, next) {
    this.value = value;
    this.subscribers = subscribers;
    this.next = next;
  }

}

export class UnboundedHub extends Hub {
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

class UnboundedHubSubscription extends Subscription {
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
//# sourceMappingURL=UnboundedHub.mjs.map