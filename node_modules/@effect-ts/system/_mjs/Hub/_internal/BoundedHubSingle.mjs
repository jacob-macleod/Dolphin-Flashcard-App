// ets_tracing: off
import "../../Operator/index.mjs";
import * as Chunk from "../../Collections/Immutable/Chunk/index.mjs";
import { Hub, Subscription } from "./Hub.mjs";
export class BoundedHubSingle extends Hub {
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

class BoundedHubSingleSubscription extends Subscription {
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
//# sourceMappingURL=BoundedHubSingle.mjs.map