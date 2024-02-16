// ets_tracing: off
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../deps.mjs";
import { makeReleaseMap, releaseAll } from "../ReleaseMap/index.mjs";
export class Allocation {
  constructor(value, release) {
    this.value = value;
    this.release = release;
  }

}
/**
 * Allocates the managed for future usage & release.
 *
 * Note: in case of failures during acquisition resources that
 * have been acquired will be immediately released. In case the
 * managed succeeds in acquiring all the resources an Allocation
 * will be returned and it is up to the caller to ensure invokation
 * of `release`, if that is not done resources will not be released.
 */

export function allocate(self) {
  return T.chain_(makeReleaseMap, rm => T.foldCauseM_(T.provideSome_(self.effect, r => Tp.tuple(r, rm)), cause => T.chain_(releaseAll(T.exitHalt(cause), T.sequential)(rm), () => T.halt(cause)), ({
    tuple: [_, a]
  }) => T.succeed(new Allocation(a, T.descriptorWith(d => releaseAll(T.exitInterrupt(d.id), T.sequential)(rm))))));
}
//# sourceMappingURL=allocate.mjs.map