// ets_tracing: off

/**
 * inspired by https://github.com/tusharmath/qio/pull/22 (revised)
 */
import { _A, _E, _R } from "../Effect/commons.mjs";
import { identity } from "../Function/index.mjs";
import { NoSuchElementException } from "../GlobalExceptions/index.mjs";
import { isEither, isOption, isTag } from "../Utils/index.mjs";
import { chain_, fail, succeed, suspend } from "./core.mjs";
import { accessService } from "./has.mjs";
export class GenSync {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

const adapter = (_, __) => {
  if (isTag(_)) {
    return new GenSync(accessService(_)(identity));
  }

  if (isEither(_)) {
    return new GenSync(_._tag === "Left" ? fail(_.left) : succeed(_.right));
  }

  if (isOption(_)) {
    return new GenSync(_._tag === "None" ? fail(__ ? __() : new NoSuchElementException()) : succeed(_.value));
  }

  return new GenSync(_);
};

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