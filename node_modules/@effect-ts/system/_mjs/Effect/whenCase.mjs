import { asUnit } from "./asUnit.mjs";
import { suspend, unit } from "./core.mjs";
/**
 * Runs an effect when the supplied `PartialFunction` matches for the given value, otherwise does nothing.
 */

export function whenCase_(a, pf, __trace) {
  return suspend(() => {
    const p = pf(a);

    if (p._tag === "None") {
      return unit;
    }

    return asUnit(p.value);
  }, __trace);
}
/**
 * Runs an effect when the supplied `PartialFunction` matches for the given value, otherwise does nothing.
 *
 * @dateFirst whenCase_
 */

export function whenCase(pf, __trace) {
  return a => whenCase_(a, pf, __trace);
}
//# sourceMappingURL=whenCase.mjs.map