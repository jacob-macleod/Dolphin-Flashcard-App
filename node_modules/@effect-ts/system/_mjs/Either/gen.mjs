// ets_tracing: off
import { _A, _E } from "../Effect/commons.mjs";
import { NoSuchElementException } from "../GlobalExceptions/index.mjs";
import * as Utils from "../Utils/index.mjs";
import { chain_, left, right } from "./core.mjs";
export class GenEither {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

function adapter(_, __) {
  return Utils.isOption(_) ? new GenEither(_._tag === "Some" ? right(_.value) : left(__ ? __() : new NoSuchElementException())) : new GenEither(_);
}

export function gen(f) {
  const iterator = f(adapter);
  const state = iterator.next();

  function run(state) {
    if (state.done) {
      return right(state.value);
    }

    return chain_(state.value["effect"], val => {
      const next = iterator.next(val);
      return run(next);
    });
  }

  return run(state);
}
//# sourceMappingURL=gen.mjs.map