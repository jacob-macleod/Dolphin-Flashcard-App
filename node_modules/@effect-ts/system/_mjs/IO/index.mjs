// ets_tracing: off

/* eslint-disable prefer-const */
import "../Operator/index.mjs";
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { _A, _U } from "../Effect/commons.mjs";
import { Stack } from "../Stack/index.mjs";
import { unifyIndex } from "../Utils/index.mjs";
export const IoURI = /*#__PURE__*/Symbol();

class Base {}

class Succeed extends Base {
  constructor(a) {
    super();
    this.a = a;
    this._iotag = "Succeed";
  }

}

class Suspend extends Base {
  constructor(f) {
    super();
    this.f = f;
    this._iotag = "Suspend";
  }

}

class FlatMap extends Base {
  constructor(value, cont) {
    super();
    this.value = value;
    this.cont = cont;
    this._iotag = "FlatMap";
  }

}
/**
 * Runs this computation
 */


export function run(self) {
  let stack = undefined;
  let a = undefined;
  let curIO = self;

  while (curIO != null) {
    switch (curIO._iotag) {
      case "FlatMap":
        {
          switch (curIO.value._iotag) {
            case "Succeed":
              {
                curIO = curIO.cont(curIO.value.a);
                break;
              }

            default:
              {
                stack = new Stack(curIO.cont, stack);
                curIO = curIO.value;
              }
          }

          break;
        }

      case "Suspend":
        {
          curIO = curIO.f();
          break;
        }

      case "Succeed":
        {
          a = curIO.a;

          if (stack) {
            curIO = stack.value(a);
            stack = stack.previous;
          } else {
            curIO = undefined;
          }

          break;
        }
    }
  }

  return a;
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first chain_
 */

export function chain(f) {
  return self => new FlatMap(self, f);
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */

export function chain_(self, f) {
  return new FlatMap(self, f);
}
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 *
 * @ets_data_first tap_
 */

export function tap(f) {
  return self => tap_(self, f);
}
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */

export function tap_(self, f) {
  return chain_(self, a => map_(f(a), () => a));
}
/**
 * Constructs a computation that always succeeds with the specified value.
 */

export function succeed(a) {
  return new Succeed(a);
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */

export function map_(self, f) {
  return chain_(self, a => succeed(f(a)));
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first map_
 */

export function map(f) {
  return self => map_(self, f);
}
/**
 * Constructs a computation that always returns the `Unit` value.
 */

export const unit = /*#__PURE__*/new Succeed(undefined);
/**
 * Combines this computation with the specified computation combining the
 * results of both using the specified function.
 *
 * @ets_data_first zipWith_
 */

export function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
/**
 * Combines this computation with the specified computation combining the
 * results of both using the specified function.
 */

export function zipWith_(self, that, f) {
  return chain_(self, a => map_(that, b => f(a, b)));
}
/**
 * Combines this computation with the specified computation, combining the
 * results of both into a tuple.
 *
 * @ets_data_first zip_
 */

export function zip(that) {
  return self => zip_(self, that);
}
/**
 * Combines this computation with the specified computation combining the
 * results of both into a tuple.
 */

export function zip_(self, that) {
  return zipWith_(self, that, Tp.tuple);
}
/**
 * Suspend a computation, useful in recursion
 */

export function suspend(f) {
  return new Suspend(f);
}
/**
 * Lift a sync (non failable) computation
 */

export function succeedWith(f) {
  return suspend(() => succeed(f()));
}
export class GenIO {
  constructor(effect) {
    this.effect = effect;
  }

  *[Symbol.iterator]() {
    return yield this;
  }

}

function adapter(_) {
  return new GenIO(_);
}

function run_(state, iterator) {
  if (state.done) {
    return succeed(state.value);
  }

  return chain_(state.value["effect"], val => {
    const next = iterator.next(val);
    return run_(next, iterator);
  });
}
/**
 * Generator
 */


export function gen(f) {
  return suspend(() => {
    const iterator = f(adapter);
    const state = iterator.next();
    return run_(state, iterator);
  });
}
//# sourceMappingURL=index.mjs.map