// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as Ex from "../../Exit/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as Finalizer from "../../Managed/ReleaseMap/finalizer.mjs";
import * as makeReleaseMap from "../../Managed/ReleaseMap/makeReleaseMap.mjs";
import * as releaseAll from "../../Managed/ReleaseMap/releaseAll.mjs";
import * as Option from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */

export function catchAllCause_(self, f) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "finalizerRef", () => M.finalizerRef(Finalizer.noopFinalizer)), "ref", () => T.toManaged(Ref.makeRef({
    _tag: "NotStarted"
  }))), "pull", ({
    finalizerRef,
    ref
  }) => {
    const closeCurrent = cause => T.uninterruptible(T.chain_(Ref.getAndSet_(finalizerRef, Finalizer.noopFinalizer), f => f(Ex.halt(cause))));

    const open = stream => asState => T.uninterruptibleMask(({
      restore
    }) => T.chain_(makeReleaseMap.makeReleaseMap, releaseMap => T.chain_(finalizerRef.set(exit => releaseAll.releaseAll(exit, T.sequential)(releaseMap)), () => T.tap_(T.map_(T.provideSome_(restore(stream.proc.effect), _ => Tp.tuple(_, releaseMap)), ({
      tuple: [_, __]
    }) => __), pull => ref.set(asState(pull))))));

    const failover = cause => Option.fold_(C.sequenceCauseOption(cause), () => T.fail(Option.none), cause => T.flatten(T.chain_(closeCurrent(cause), () => open(f(cause))(pull => ({
      _tag: "Other",
      pull
    })))));

    return T.chain_(ref.get, s => {
      switch (s._tag) {
        case "NotStarted":
          {
            return T.catchAllCause_(T.flatten(open(self)(pull => ({
              _tag: "Self",
              pull
            }))), failover);
          }

        case "Self":
          {
            return T.catchAllCause_(s.pull, failover);
          }

        case "Other":
          {
            return s.pull;
          }
      }
    });
  }), ({
    pull
  }) => pull));
}
/**
 * Switches over to the stream produced by the provided function in case this one
 * fails. Allows recovery from all causes of failure, including interruption if the
 * stream is uninterruptible.
 */

export function catchAllCause(f) {
  return self => catchAllCause_(self, f);
}
//# sourceMappingURL=catchAllCause.mjs.map