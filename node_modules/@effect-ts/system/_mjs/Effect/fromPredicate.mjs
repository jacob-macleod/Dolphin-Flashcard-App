import * as core from "./core.mjs";
import * as fail from "./fail.mjs";
export function fromPredicate(predicate, onFalse) {
  return a => core.suspend(() => predicate(a) ? core.succeed(a) : fail.fail(onFalse(a)));
}
//# sourceMappingURL=fromPredicate.mjs.map