// ets_tracing: off
import { lookup, remove } from "../../Collections/Immutable/Map/core.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../deps-core.mjs";
import * as R from "./deps-ref.mjs";
import { Running } from "./Running.mjs";
export function release(key, exit) {
  return _ => T.flatten(R.modify_(_.ref, s => {
    switch (s._tag) {
      case "Exited":
        {
          return Tp.tuple(T.unit, s);
        }

      case "Running":
        {
          return Tp.tuple(O.fold_(lookup(key)(s.finalizers()), () => T.unit, f => f(exit)), new Running(s.nextKey, remove(key)(s.finalizers())));
        }
    }
  }));
}
//# sourceMappingURL=release.mjs.map