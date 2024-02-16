import * as RunForEach from "./runForEach.mjs";
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */

export function forEach_(self, f) {
  return RunForEach.runForEach_(self, f);
}
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 *
 * @ets_data_first forEach_
 */

export function forEach(f) {
  return self => forEach_(self, f);
}
//# sourceMappingURL=forEach.mjs.map