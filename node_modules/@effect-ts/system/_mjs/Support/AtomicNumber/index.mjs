// ets_tracing: off
import "../../Operator/index.mjs";
import { AtomicReference } from "../AtomicReference/index.mjs";
export class AtomicNumber extends AtomicReference {
  constructor(n) {
    super(n);
    this.incrementAndGet = this.incrementAndGet.bind(this);
    this.decrementAndGet = this.decrementAndGet.bind(this);
  }

  incrementAndGet() {
    this.set(this.get + 1);
    return this.get;
  }

  decrementAndGet() {
    this.set(this.get - 1);
    return this.get;
  }

  getAndIncrement() {
    const ret = this.get;
    this.set(this.get + 1);
    return ret;
  }

}
//# sourceMappingURL=index.mjs.map