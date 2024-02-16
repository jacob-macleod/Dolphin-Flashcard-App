import { fromEither } from "../../Effect/fromEither.mjs";
import { getOrFail } from "../../Effect/getOrFail.mjs";
import { _A, _E, _R, accessService } from "../../Effect/index.mjs";
import { identity } from "../../Function/index.mjs";
import { isEither, isOption, isTag } from "../../Utils/index.mjs";
import { chain_, fail } from "../core.mjs";
import { fromEffect } from "../fromEffect.mjs";
import { ManagedImpl } from "../managed.mjs";
import { succeed } from "../succeed.mjs";
import { suspend } from "./suspend.mjs";
export class GenManaged {
  constructor(effect, trace) {
    this.effect = effect;
    this.trace = trace;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

const adapter = (_, __, ___) => {
  if (isTag(_)) {
    return new GenManaged(fromEffect(accessService(_)(identity)), __);
  }

  if (isEither(_)) {
    return new GenManaged(fromEffect(fromEither(() => _)), __);
  }

  if (isOption(_)) {
    if (typeof __ === "function") {
      return new GenManaged(__ ? _._tag === "None" ? fail(__()) : succeed(_.value) : fromEffect(getOrFail(_)), ___);
    }

    return new GenManaged(fromEffect(getOrFail(_)), __);
  }

  if (_ instanceof ManagedImpl) {
    return new GenManaged(_, __);
  }

  return new GenManaged(fromEffect(_), __);
};

export function gen(f) {
  return suspend(() => {
    const iterator = f(adapter);
    const state = iterator.next();

    function run(state) {
      if (state.done) {
        return succeed(state.value);
      }

      return chain_(suspend(() => state.value["effect"], state.value.trace), val => {
        const next = iterator.next(val);
        return run(next);
      });
    }

    return run(state);
  });
}
//# sourceMappingURL=gen.mjs.map