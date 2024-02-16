import * as T from "./effect.mjs";
export const assertNonNegative = n => n < 0 ? T.die(`Unexpected negative value ${n} passed to acquireN or releaseN.`) : T.unit;
export class Acquisition {
  constructor(waitAcquire, release) {
    this.waitAcquire = waitAcquire;
    this.release = release;
  }

}
//# sourceMappingURL=state.mjs.map