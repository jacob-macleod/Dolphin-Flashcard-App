import { tag } from "../../Has/index.mjs";
import * as FRef from "../FiberRef/index.mjs";
import * as T from "../index.mjs";
import * as L from "../Layer/index.mjs";
export function makeFiberState(initial) {
  return T.map_(FRef.make(initial), ref => ({
    get: FRef.get(ref),
    modify: f => FRef.modify_(ref, f),
    set: s => FRef.set_(ref, s),
    update: f => FRef.update_(ref, f)
  }));
}
export function FiberState(S) {
  const Tag = tag(S);
  const derived = T.deriveLifted(Tag)(["set", "update"], ["get"], []);
  return {
    Tag,
    modify: f => T.accessServiceM(Tag)(_ => _.modify(f)),
    runState: s => T.provideServiceM(Tag)(makeFiberState(s)),
    Live: s => L.fromEffect_(makeFiberState(s), Tag),
    ...derived
  };
}
//# sourceMappingURL=index.mjs.map