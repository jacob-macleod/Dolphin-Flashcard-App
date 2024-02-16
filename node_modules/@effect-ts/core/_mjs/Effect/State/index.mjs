import { tag } from "../../Has/index.mjs";
import * as T from "../index.mjs";
import * as L from "../Layer/index.mjs";
import * as Ref from "../Ref/index.mjs";
export function makeState(initial) {
  return T.map_(Ref.makeRef(initial), ref => ({
    get: Ref.get(ref),
    modify: f => Ref.modify_(ref, f),
    set: s => Ref.set_(ref, s),
    update: f => Ref.update_(ref, f)
  }));
}
export function State(S) {
  const Tag = tag(S);
  const derived = T.deriveLifted(Tag)(["set", "update"], ["get"], []);
  return {
    Tag,
    modify: f => T.accessServiceM(Tag)(_ => _.modify(f)),
    runState: s => T.provideServiceM(Tag)(makeState(s)),
    Live: s => L.fromEffect_(makeState(s), Tag),
    ...derived
  };
}
//# sourceMappingURL=index.mjs.map