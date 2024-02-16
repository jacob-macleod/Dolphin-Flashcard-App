import * as O from "../../../../Option/index.mjs";
import * as Chain from "./chain.mjs";
import * as Empty from "./empty.mjs";
import * as FromEffect from "./fromEffect.mjs";
/**
 * Returns the resulting stream when the given `PartialFunction` is defined for the given effectful value, otherwise returns an empty stream.
 */

export function whenCaseEffect_(a, pf) {
  return Chain.chain_(FromEffect.fromEffect(a), _ => O.fold_(pf(_), () => Empty.empty, s => s));
}
/**
 * Returns the resulting stream when the given `PartialFunction` is defined for the given effectful value, otherwise returns an empty stream.
 *
 * @ets_data_first whenCaseEffect_
 */

export function whenCaseEffect(pf) {
  return a => whenCaseEffect_(a, pf);
}
//# sourceMappingURL=whenCaseEffect.mjs.map