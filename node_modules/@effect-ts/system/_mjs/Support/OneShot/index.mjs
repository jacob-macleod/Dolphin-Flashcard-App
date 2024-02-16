// ets_tracing: off
import "../../Operator/index.mjs";
export class OneShot {
  constructor() {
    this.internal = undefined;
  }

  set(a) {
    if (this.internal) {
      throw new Error("OneShot already set");
    }

    if (a == null) {
      throw new Error("Cannot set null to OneShot");
    }

    this.internal = a;
  }

  get() {
    if (this.internal) {
      return this.internal;
    }

    throw new Error("Value not set in OneShot");
  }

  isSet() {
    return this.internal != null;
  }

}
//# sourceMappingURL=index.mjs.map