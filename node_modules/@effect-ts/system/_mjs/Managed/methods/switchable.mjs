// ets_tracing: off
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { sequential } from "../../Effect/ExecutionStrategy.mjs";
import { pipe } from "../../Function/index.mjs";
import { fold } from "../../Option/index.mjs";
import { map } from "../core.mjs";
import * as T from "../deps.mjs";
import * as Do from "../do.mjs";
import * as addIfOpen from "../ReleaseMap/addIfOpen.mjs";
import * as makeReleaseMap from "../ReleaseMap/makeReleaseMap.mjs";
import * as releaseAll from "../ReleaseMap/releaseAll.mjs";
import * as replace from "../ReleaseMap/replace.mjs";
import { releaseMap } from "./releaseMap.mjs";
/**
 * Returns a `Managed` value that represents a managed resource that can
 * be safely swapped within the scope of the `Managed`. The function provided
 * inside the `Managed` can be used to switch the resource currently in use.
 *
 * When the resource is switched, the finalizer for the previous finalizer will
 * be executed uninterruptibly. If the effect executing inside the `use`
 * is interrupted, the finalizer for the resource currently in use is guaranteed
 * to execute.
 *
 * This constructor can be used to create an expressive control flow that uses
 * several instances of a managed resource.
 */

export function switchable(__trace) {
  return map(({
    key,
    releaseMap
  }) => newResource => T.uninterruptibleMask(({
    restore
  }) => T.map_(T.tap_(T.bind_(T.bind_(T.bind_(T.zipRight_(T.chain_(replace.replace(key, _ => T.unit)(releaseMap), fold(() => T.unit, fin => fin(T.exitUnit))), T.do), "r", () => T.environment()), "inner", () => makeReleaseMap.makeReleaseMap), "a", ({
    inner,
    r
  }) => restore(T.provideAll_(newResource.effect, Tp.tuple(r, inner)))), ({
    inner
  }) => replace.replace(key, exit => releaseAll.releaseAll(exit, sequential)(inner))(releaseMap)), ({
    a
  }) => a.get(1))), __trace)(Do.bind_(Do.bind_(Do.do, "releaseMap", () => releaseMap), "key", ({
    releaseMap
  }) => T.toManaged(T.chain_(addIfOpen.addIfOpen(_ => T.unit)(releaseMap), fold(() => T.interrupt, T.succeed)))));
}
//# sourceMappingURL=switchable.mjs.map