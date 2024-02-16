import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as BP from "../../Stream/BufferedPull/index.mjs";
import * as P from "../../Stream/Pull/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import { Stream } from "./definitions.mjs";
export function flattenExitOption(self) {
  return new Stream(M.map_(M.bind_(M.bind_(M.do, "upstream", () => M.mapM_(self.proc, BP.make)), "done", () => T.toManaged(Ref.makeRef(false))), ({
    done,
    upstream
  }) => T.chain_(done.get, _ => {
    if (_) {
      return P.end;
    } else {
      return T.foldM_(BP.pullElement(upstream), O.fold(() => T.zipRight_(done.set(true), P.end), e => P.fail(e)), os => T.foldM_(T.done(os), O.fold(() => T.zipRight_(done.set(true), P.end), e => P.fail(e)), _ => P.emit(_)));
    }
  })));
}
//# sourceMappingURL=flattenExitOption.mjs.map