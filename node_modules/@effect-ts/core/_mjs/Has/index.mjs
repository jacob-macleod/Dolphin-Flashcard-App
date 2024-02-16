// ets_tracing: off
import "../Operator/index.mjs";
import * as T from "@effect-ts/system/Effect";
export * from "@effect-ts/system/Has";
export function deriveFunctions(self, ...keys) {
  const res = {};

  for (const k of keys) {
    // @ts-expect-error
    res[k] = (...args) => T.accessServiceM(self)(_ => _[k](...args));
  } // @ts-expect-error


  return res;
}
//# sourceMappingURL=index.mjs.map