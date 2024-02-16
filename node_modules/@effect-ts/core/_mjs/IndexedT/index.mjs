// ets_tracing: off
import "../Operator/index.mjs";
import { pipe } from "../Function/index.mjs";
import { chainF, succeedF } from "../Prelude/DSL/index.mjs";
import * as HKT from "../Prelude/HKT/index.mjs";
export class Ix {
  constructor(value) {
    this.value = value;
  }

}
export function makeIx() {
  return a => new Ix(a);
}
export function indexedF() {
  return F => indexed_(F);
}

function indexed_(F) {
  return {
    iof: () => a => makeIx()(succeedF(F)(a)),
    ichain: f => fa => makeIx()(chainF(F)(a => f(a).value)(fa.value)),
    lift: () => fa => makeIx()(fa),
    lower: () => fa => fa.value,
    chain: f => fa => makeIx()(chainF(F)(a => f(a).value)(fa.value)),
    chainLower: f => fa => makeIx()(chainF(F)(f)(fa.value))
  };
}
//# sourceMappingURL=index.mjs.map