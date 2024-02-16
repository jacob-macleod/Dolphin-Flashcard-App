"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenSTM = void 0;
exports.gen = gen;

var _commons = /*#__PURE__*/require("../../Effect/commons.js");

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * inspired by https://github.com/tusharmath/qio/pull/22 (revised)
 */
class GenSTM {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

exports.GenSTM = GenSTM;

const adapter = (_, __) => {
  return new GenSTM(_);
};
/**
 * Do simulation using Generators
 */


function gen(f) {
  return (0, _core.suspend)(() => {
    const iterator = f(adapter);
    const state = iterator.next();

    function run(state) {
      if (state.done) {
        return (0, _core.succeed)(state.value);
      }

      return (0, _core.chain_)(state.value["effect"], val => {
        const next = iterator.next(val);
        return run(next);
      });
    }

    return run(state);
  });
}
//# sourceMappingURL=gen.js.map