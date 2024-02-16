// ets_tracing: off
import { insert, lookup } from "../../Collections/Immutable/Map/core.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { absurd, pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../deps.mjs";
import * as R from "./deps-ref.mjs";
import { Exited } from "./Exited.mjs";
import { Running } from "./Running.mjs";
export function replace(key, finalizer) {
  return _ => T.flatten(R.modify_(_.ref, s => {
    switch (s._tag) {
      case "Exited":
        return Tp.tuple(T.map_(finalizer(s.exit), () => O.none), new Exited(s.nextKey, s.exit));

      case "Running":
        return Tp.tuple(T.succeed(lookup(key)(s.finalizers())), new Running(s.nextKey, insert(key, finalizer)(s.finalizers())));

      default:
        return absurd(s);
    }
  }));
}
//# sourceMappingURL=replace.mjs.map