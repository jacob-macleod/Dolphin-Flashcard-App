// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import * as Ex from "../Exit/index.mjs";
import * as F from "../Fiber/index.mjs";
import { releaseAll, ReleaseMap, Running } from "../Managed/ReleaseMap/index.mjs";
import * as P from "../Promise/index.mjs";
import * as Ref from "../Ref/index.mjs";
import * as L from "./core.mjs";
import * as T from "./deps-effect.mjs";
export class MainProvider {
  constructor(allocate, release, provide) {
    this.allocate = allocate;
    this.release = release;
    this.provide = provide;
  }

}
/**
 * Unsafely returns a `MainProvider` to be used in frontend-like
 * contexts where initialization needs to be global and sync
 */

export function unsafeMainProvider(self) {
  const promise = P.unsafeMake(F.None);
  const relMap = new ReleaseMap(Ref.unsafeMakeRef(new Running(0, new Map())));
  return new MainProvider(T.foldCauseM_(T.map_(T.provideSome_(L.build(self["+++"](L.identity())).effect, r => Tp.tuple(r, relMap)), _ => _.get(1)), cause => T.chain_(P.halt_(promise, cause), () => T.halt(cause)), r => P.succeed(r)(promise)), T.descriptorWith(d => T.asUnit(releaseAll(Ex.interrupt(d.id), T.sequential)(relMap))), self => T.chain_(P.await(promise), env => T.provide_(self, env)));
}
//# sourceMappingURL=unsafe.mjs.map