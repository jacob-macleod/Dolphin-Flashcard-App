// ets_tracing: off
import { insert } from "../../Collections/Immutable/Map/core.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../deps-core.mjs";
import * as R from "./deps-ref.mjs";
import { Exited } from "./Exited.mjs";
import { next } from "./next.mjs";
import { Running } from "./Running.mjs";
export function addIfOpen(finalizer) {
  return _ => T.flatten(R.modify_(_.ref, s => {
    switch (s._tag) {
      case "Exited":
        {
          return Tp.tuple(T.map_(finalizer(s.exit), () => O.none), new Exited(next(s.nextKey), s.exit));
        }

      case "Running":
        {
          return Tp.tuple(T.succeed(O.some(s.nextKey)), new Running(next(s.nextKey), insert(s.nextKey, finalizer)(s.finalizers())));
        }
    }
  }));
}
//# sourceMappingURL=addIfOpen.mjs.map