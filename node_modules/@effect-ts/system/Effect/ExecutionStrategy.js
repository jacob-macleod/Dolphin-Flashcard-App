"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parallel = exports.Sequential = exports.ParallelN = exports.Parallel = void 0;
exports.parallelN = parallelN;
exports.sequential = void 0;

// ets_tracing: off
class Sequential {
  constructor() {
    this._tag = "Sequential";
  }

}

exports.Sequential = Sequential;

class Parallel {
  constructor() {
    this._tag = "Parallel";
  }

}

exports.Parallel = Parallel;

class ParallelN {
  constructor(n) {
    this.n = n;
    this._tag = "ParallelN";
  }

}
/**
 * Sequential execution strategy
 */


exports.ParallelN = ParallelN;
const sequential = /*#__PURE__*/new Sequential();
/**
 * Parallel execution strategy
 */

exports.sequential = sequential;
const parallel = /*#__PURE__*/new Parallel();
/**
 * Parallel (up to N) execution strategy
 */

exports.parallel = parallel;

function parallelN(n) {
  return new ParallelN(n);
}
//# sourceMappingURL=ExecutionStrategy.js.map