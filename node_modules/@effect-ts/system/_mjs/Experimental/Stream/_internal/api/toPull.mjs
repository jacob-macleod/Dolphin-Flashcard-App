import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
/**
 * Interpret the stream as a managed pull
 */

export function toPull(self) {
  return M.map_(CH.toPull(self.channel), pull => T.chain_(T.mapError_(pull, O.some), E.fold(() => T.fail(O.none), elem => T.succeed(elem))));
}
//# sourceMappingURL=toPull.mjs.map