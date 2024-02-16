// ets_tracing: off
export class Sequential {
  constructor() {
    this._tag = "Sequential";
  }

}
export class Parallel {
  constructor() {
    this._tag = "Parallel";
  }

}
export class ParallelN {
  constructor(n) {
    this.n = n;
    this._tag = "ParallelN";
  }

}
/**
 * Sequential execution strategy
 */

export const sequential = /*#__PURE__*/new Sequential();
/**
 * Parallel execution strategy
 */

export const parallel = /*#__PURE__*/new Parallel();
/**
 * Parallel (up to N) execution strategy
 */

export function parallelN(n) {
  return new ParallelN(n);
}
//# sourceMappingURL=ExecutionStrategy.mjs.map