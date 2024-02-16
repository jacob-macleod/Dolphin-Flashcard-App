// ets_tracing: off
import * as Async from "../Async/index.mjs";
import * as IO from "../IO/index.mjs";
import { accessM, succeed, succeedWith } from "./core.mjs";
import { effectAsyncInterrupt } from "./effectAsyncInterrupt.mjs";
import { fail } from "./fail.mjs";
import { interrupt } from "./interruption.mjs";
/**
 * Lift Async into Effect
 */

export function fromAsync(async, __trace) {
  return accessM(r => effectAsyncInterrupt(cb => {
    const cancel = Async.runAsyncEnv(async, r, exit => {
      switch (exit._tag) {
        case "Success":
          {
            cb(succeed(exit.a));
            break;
          }

        case "Interrupt":
          {
            cb(interrupt);
            break;
          }

        case "Failure":
          {
            cb(fail(exit.e));
            break;
          }
      }
    });
    return succeedWith(() => {
      cancel();
    });
  }, __trace));
}
/**
 * Lift IO into Effect
 */

export function fromIO(io, __trace) {
  return succeedWith(() => IO.run(io), __trace);
}
//# sourceMappingURL=interop.mjs.map