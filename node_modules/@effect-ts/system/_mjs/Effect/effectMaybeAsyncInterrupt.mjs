import * as O from "../Option/index.mjs";
import { AtomicReference } from "../Support/AtomicReference/index.mjs";
import { OneShot } from "../Support/OneShot/index.mjs";
import * as core from "./core.mjs";
import { flatten } from "./flatten.mjs";
import { onInterrupt_ } from "./interruption.mjs";
/**
 * Imports an asynchronous side-effect into an effect. The side-effect
 * has the option of returning the value synchronously, which is useful in
 * cases where it cannot be determined if the effect is synchronous or
 * asynchronous until the side-effect is actually executed. The effect also
 * has the option of returning a canceler, which will be used by the runtime
 * to cancel the asynchronous effect if the fiber executing the effect is
 * interrupted.
 *
 * If the register function returns a value synchronously, then the callback
 * function must not be called. Otherwise the callback function must be called
 * at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */

export function effectMaybeAsyncInterrupt(register, __trace) {
  return effectMaybeAsyncInterruptBlockingOn(register, [], __trace);
}
/**
 * Imports an asynchronous side-effect into an effect. The side-effect
 * has the option of returning the value synchronously, which is useful in
 * cases where it cannot be determined if the effect is synchronous or
 * asynchronous until the side-effect is actually executed. The effect also
 * has the option of returning a canceler, which will be used by the runtime
 * to cancel the asynchronous effect if the fiber executing the effect is
 * interrupted.
 *
 * If the register function returns a value synchronously, then the callback
 * function must not be called. Otherwise the callback function must be called
 * at most once.
 *
 * The list of fibers, that may complete the async callback, is used to
 * provide better diagnostics.
 */

export function effectMaybeAsyncInterruptBlockingOn(register, blockingOn, __trace) {
  return core.chain_(core.succeedWith(() => [new AtomicReference(false), new OneShot()]), ([started, cancel]) => onInterrupt_(flatten(core.effectAsyncOptionBlockingOn(k => {
    started.set(true);
    const ret = new AtomicReference(O.none);

    try {
      const res = register(io => k(core.succeed(io)));

      switch (res._tag) {
        case "Right":
          {
            ret.set(O.some(core.succeed(res.right)));
            break;
          }

        case "Left":
          {
            cancel.set(res.left);
            break;
          }
      }
    } finally {
      if (!cancel.isSet()) {
        cancel.set(core.unit);
      }
    }

    return ret.get;
  }, blockingOn, __trace)), () => core.suspend(() => started.get ? cancel.get() : core.unit)));
}
//# sourceMappingURL=effectMaybeAsyncInterrupt.mjs.map