// ets_tracing: off

/**
 * inspired by https://github.com/tusharmath/qio/pull/22 (revised)
 */
import { _A, _E, _R } from "../../Effect/commons.mjs";
import { chain_, succeed, suspend } from "./core.mjs";
export class GenSTM {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

const adapter = (_, __) => {
  return new GenSTM(_);
};
/**
 * Do simulation using Generators
 */


export function gen(f) {
  return suspend(() => {
    const iterator = f(adapter);
    const state = iterator.next();

    function run(state) {
      if (state.done) {
        return succeed(state.value);
      }

      return chain_(state.value["effect"], val => {
        const next = iterator.next(val);
        return run(next);
      });
    }

    return run(state);
  });
}
//# sourceMappingURL=gen.mjs.map