// ets_tracing: off
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Provides the stream with its required environment, which eliminates
 * its dependency on `R`.
 */

export function provideAll_(self, r) {
  return new C.Stream(CH.provideAll_(self.channel, r));
}
/**
 * Provides the stream with its required environment, which eliminates
 * its dependency on `R`.
 *
 * @ets_data_first provideAll_
 */

export function provideAll(r) {
  return self => provideAll_(self, r);
}
//# sourceMappingURL=provideAll.mjs.map