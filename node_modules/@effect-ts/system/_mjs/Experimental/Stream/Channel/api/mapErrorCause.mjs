import * as C from "../core.mjs";
/**
 * A more powerful version of `mapError` which also surfaces the `Cause` of the channel failure
 */

export function mapErrorCause_(self, f) {
  return C.catchAllCause_(self, cause => C.failCause(f(cause)));
}
/**
 * A more powerful version of `mapError` which also surfaces the `Cause` of the channel failure
 *
 * @ets_data_first mapErrorCause_
 */

export function mapErrorCause(f) {
  return self => mapErrorCause_(self, f);
}
//# sourceMappingURL=mapErrorCause.mjs.map