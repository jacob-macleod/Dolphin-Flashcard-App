// ets_tracing: off
import * as L from "../../Collections/Immutable/List/index.mjs";
import { NoSuchElementException, PrematureGeneratorExit } from "../../GlobalExceptions/index.mjs";
import { isEither, isOption, isTag } from "../../Utils/index.mjs";
import * as T from "../_internal/effect.mjs";
import { _A, _E, _R } from "../_internal/effect.mjs";
import { chain_ } from "./chain.mjs";
import { Stream } from "./definitions.mjs";
import { fail } from "./fail.mjs";
import { fromEffect } from "./fromEffect.mjs";
import { succeed } from "./succeed.mjs";
import { suspend } from "./suspend.mjs";
export class GenStream {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

const adapter = (_, __) => {
  return new GenStream(() => {
    const x = _();

    if (isOption(x)) {
      return x._tag === "None" ? fail(__ ? __() : new NoSuchElementException()) : succeed(x.value);
    } else if (isEither(x)) {
      return fromEffect(T.fromEither(() => x));
    } else if (x instanceof Stream) {
      return x;
    } else if (isTag(x)) {
      return fromEffect(T.service(x));
    }

    return fromEffect(x);
  });
};

export function gen(...args) {
  function gen_(f) {
    return suspend(() => {
      function run(replayStack) {
        const iterator = f(adapter);
        let state = iterator.next();

        for (const a of replayStack) {
          if (state.done) {
            return fromEffect(T.die(new PrematureGeneratorExit()));
          }

          state = iterator.next(a);
        }

        if (state.done) {
          return succeed(state.value);
        }

        return chain_(state.value["effect"](), val => {
          return run(L.append_(replayStack, val));
        });
      }

      return run(L.empty());
    });
  }

  if (args.length === 0) {
    return f => gen_(f);
  }

  return gen_(args[0]);
}
//# sourceMappingURL=gen.mjs.map