import { pipe } from "../Function/index.mjs";
import * as core from "./core.mjs";
import { either } from "./either.mjs";
import { fromEither } from "./fromEither.mjs";
/**
 * Returns an effect that effectfully "peeks" at the result of this effect as an `Either`.
 */

export function tapEither_(self, f, __trace) {
  return core.chain_(either(self), exit => core.chain_(f(exit), () => fromEither(() => exit)));
}
/**
 * Returns an effect that effectfully "peeks" at the result of this effect as an `Either`.
 *
 * @ets_data_first tapEither_
 */

export function tapEither(f, __trace) {
  return self => tapEither_(self, f, __trace);
}
//# sourceMappingURL=tapEither.mjs.map