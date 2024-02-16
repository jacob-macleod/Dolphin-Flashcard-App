// ets_tracing: off
import * as C from "../core.mjs";
/**
 * Returns a new channel whose outputs are fed to the specified factory function, which creates
 * new channels in response. These new channels are sequentially concatenated together, and all
 * their outputs appear as outputs of the newly returned channel.
 */

export function concatMap_(self, f) {
  return C.concatMapWith_(self, f, () => void 0, () => void 0);
}
/**
 * Returns a new channel whose outputs are fed to the specified factory function, which creates
 * new channels in response. These new channels are sequentially concatenated together, and all
 * their outputs appear as outputs of the newly returned channel.
 *
 * @ets_data_first concatMap_
 */

export function concatMap(f) {
  return self => concatMap_(self, f);
}
//# sourceMappingURL=concatMap.mjs.map