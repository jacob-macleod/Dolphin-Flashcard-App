// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as CL from "../../Clock/index.mjs";
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Ex from "../../Exit/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as Scope from "../../Scope/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as F from "../_internal/fiber.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
export function debounce_(self, d) {
  class NotStarted {
    constructor() {
      this._tag = "NotStarted";
    }

  }

  class Previous {
    constructor(fiber) {
      this.fiber = fiber;
      this._tag = "Previous";
    }

  }

  class Current {
    constructor(fiber) {
      this.fiber = fiber;
      this._tag = "Current";
    }

  }

  class Done {
    constructor() {
      this._tag = "Done";
    }

  }

  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "ref", () => T.toManagedRelease_(Ref.makeRef(new NotStarted()), _ => T.chain_(_.get, state => {
    switch (state._tag) {
      case "Previous":
        return F.interrupt(state.fiber);

      case "Current":
        return F.interrupt(state.fiber);

      default:
        return T.unit;
    }
  }))), "pull", ({
    chunks,
    ref
  }) => {
    const store = chunk => T.as_(O.getOrElse_(O.map_(A.last(chunk), last => T.chain_(T.forkDaemon(T.as_(CL.sleep(d), last)), f => ref.set(new Previous(f)))), () => ref.set(new NotStarted())), A.empty());

    return T.chain_(ref.get, state => {
      switch (state._tag) {
        case "Previous":
          return T.transplant(graft => T.raceWithScope_(F.join(state.fiber), graft(chunks), (ex, current) => {
            if (Ex.succeeded(ex)) {
              return T.as_(ref.set(new Current(current)), A.single(ex.value));
            } else {
              return T.zipRight_(F.interrupt(current), Pull.halt(ex.cause));
            }
          }, (ex, previous) => {
            if (Ex.succeeded(ex)) {
              const chunk = ex.value;

              if (A.isEmpty(chunk)) {
                return Pull.empty();
              } else {
                return T.zipRight_(F.interrupt(previous), store(chunk));
              }
            } else {
              return O.fold_(C.sequenceCauseOption(ex.cause), () => T.zipLeft_(T.map_(F.join(previous), A.single), ref.set(new Done())), e => T.zipRight_(F.interrupt(previous), Pull.halt(e)));
            }
          }, Scope.globalScope));

        case "Current":
          return T.chain_(F.join(state.fiber), store);

        case "NotStarted":
          return T.chain_(chunks, store);

        case "Done":
          return Pull.end;
      }
    });
  }), ({
    pull
  }) => pull));
}
export function debounce(d) {
  return self => debounce_(self, d);
}
//# sourceMappingURL=debounce.mjs.map