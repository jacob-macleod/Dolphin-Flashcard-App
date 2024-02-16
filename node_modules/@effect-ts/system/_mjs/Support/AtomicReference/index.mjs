// ets_tracing: off
import "../../Operator/index.mjs";
export class AtomicReference {
  constructor(initial) {
    this.initial = initial;
    this.current = initial;
  }

  get get() {
    return this.current;
  }

  getAndSet(value) {
    const old = this.current;
    this.set(value);
    return old;
  }

  set(value) {
    this.current = value;
  }

  compareAndSet(old, value) {
    if (this.get === old) {
      this.set(value);
      return true;
    }

    return false;
  }

}
//# sourceMappingURL=index.mjs.map