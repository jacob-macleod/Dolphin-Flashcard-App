// ets_tracing: off
import * as L from "@effect-ts/system/Collections/Immutable/List";
import { PrematureGeneratorExit } from "@effect-ts/system/GlobalExceptions";
import { pipe } from "../../Function/index.mjs";
import { chainF } from "./chain.mjs";
import { succeedF } from "./succeed.mjs";
export class GenHKT {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}
export class GenLazyHKT {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

const adapter = _ => {
  return new GenHKT(_);
};

const adapterLazy = _ => {
  return new GenHKT(_);
};

export function genWithHistoryF(F, config) {
  const chain = chainF(F);
  const succeed = succeedF(F);
  return f => {
    return chain(() => {
      function run(replayStack) {
        const iterator = f((config === null || config === void 0 ? void 0 : config.adapter) ? config.adapter : adapterLazy);
        let state = iterator.next();

        for (const a of replayStack) {
          if (state.done) {
            throw new PrematureGeneratorExit();
          }

          state = iterator.next(a);
        }

        if (state.done) {
          return succeed(state.value);
        }

        return chain(val => {
          return run(L.append_(replayStack, val));
        })(state.value["effect"]());
      }

      return run(L.empty());
    })(succeed({}));
  };
}
export function genF(F, config) {
  const chain = chainF(F);
  const succeed = succeedF(F);
  return f => {
    return chain(() => {
      const iterator = f((config === null || config === void 0 ? void 0 : config.adapter) ? config.adapter : adapter);
      const state = iterator.next();

      function run(state) {
        if (state.done) {
          return succeed(state.value);
        }

        return chain(val => {
          const next = iterator.next(val);
          return run(next);
        })(state.value["effect"]);
      }

      return run(state);
    })(succeed({}));
  };
}
//# sourceMappingURL=gen.mjs.map