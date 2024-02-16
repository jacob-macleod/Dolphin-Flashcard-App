// ets_tracing: off
import * as C from "../Cause/index.mjs";
import { Done, Running } from "./status.mjs";
export class FiberStateExecuting {
  constructor(status, observers, interrupted) {
    this.status = status;
    this.observers = observers;
    this.interrupted = interrupted;
    this._tag = "Executing";
  }

}
export class FiberStateDone {
  constructor(value) {
    this.value = value;
    this._tag = "Done";
    this.interrupted = C.empty;
    this.status = new Done();
  }

}
export function initial() {
  return new FiberStateExecuting(new Running(false), [], C.empty);
}
export function interrupting(state) {
  let current = state.status;

  while (current) {
    switch (current._tag) {
      case "Running":
        {
          return current.interrupting;
        }

      case "Finishing":
        {
          return current.interrupting;
        }

      case "Done":
        {
          return false;
        }

      case "Suspended":
        {
          current = current.previous;
        }
    }
  }

  throw new Error("BUG: should never end up here");
}
//# sourceMappingURL=state.mjs.map