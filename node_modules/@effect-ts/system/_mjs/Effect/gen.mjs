// ets_tracing: off

/**
 * inspired by https://github.com/tusharmath/qio/pull/22 (revised)
 */
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { ManagedImpl } from "../Managed/managed.mjs";
import { makeReleaseMap } from "../Managed/ReleaseMap/makeReleaseMap.mjs";
import { releaseAll } from "../Managed/ReleaseMap/releaseAll.mjs";
import * as Utils from "../Utils/index.mjs";
import { bracketExit_ } from "./bracketExit.mjs";
import { _A, _E, _R } from "./commons.mjs";
import { chain_, succeed, suspend, unit } from "./core.mjs";
import { sequential } from "./ExecutionStrategy.mjs";
import { fail } from "./fail.mjs";
import { fromEither } from "./fromEither.mjs";
import { getOrFail } from "./getOrFail.mjs";
import { service } from "./has.mjs";
import { map_ } from "./map.mjs";
import { provideSome_ } from "./provideSome.mjs";
export class GenEffect {
  constructor(effect, trace) {
    this.effect = effect;
    this.trace = trace;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

function adapter(_, __, ___) {
  if (Utils.isEither(_)) {
    return new GenEffect(fromEither(() => _), __);
  }

  if (Utils.isOption(_)) {
    if (__ && typeof __ === "function") {
      return new GenEffect(_._tag === "None" ? fail(__()) : succeed(_.value), ___);
    }

    return new GenEffect(getOrFail(_), __);
  }

  if (Utils.isTag(_)) {
    return new GenEffect(service(_), __);
  }

  return new GenEffect(_, __);
}

export function genM(f, __trace) {
  return suspend(() => {
    const iterator = f(adapter);
    const state = iterator.next();

    function run(rm, state) {
      if (state.done) {
        return succeed(state.value);
      }

      return chain_(suspend(() => state.value.trace ? state.value["effect"] instanceof ManagedImpl ? map_(provideSome_(state.value["effect"]["effect"], r0 => Tp.tuple(r0, rm)), _ => _.get(1)) : state.value["effect"] : state.value["effect"] instanceof ManagedImpl ? map_(provideSome_(state.value["effect"]["effect"], r0 => Tp.tuple(r0, rm)), _ => _.get(1)) : state.value["effect"], state.value.trace), val => {
        const next = iterator.next(val);
        return run(rm, next);
      });
    }

    return chain_(makeReleaseMap, rm => bracketExit_(unit, () => run(rm, state), (_, e) => releaseAll(e, sequential)(rm)));
  }, __trace);
}
export function gen(f, __trace) {
  return suspend(() => {
    const iterator = f(adapter);
    const state = iterator.next();

    function run(state) {
      if (state.done) {
        return succeed(state.value);
      }

      return chain_(suspend(() => state.value["effect"], state.value.trace), val => run(iterator.next(val)));
    }

    return run(state);
  }, __trace);
}
//# sourceMappingURL=gen.mjs.map