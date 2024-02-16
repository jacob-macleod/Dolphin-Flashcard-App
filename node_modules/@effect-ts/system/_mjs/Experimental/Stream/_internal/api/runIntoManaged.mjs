import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as TK from "../../Take/index.mjs";
/**
 * Like `Stream#into`, but provides the result as a `Managed` to allow for scope
 * composition.
 */

export function runIntoManaged_(self, queue) {
  const writer = CH.readWithCause(in_ => CH.zipRight_(CH.write(TK.chunk(in_)), writer), cause => CH.write(TK.halt(cause)), _ => CH.write(TK.end));
  return M.asUnit(CH.runManaged(CH.drain(CH.mapOutEffect_(self.channel[">>>"](writer), _ => Q.offer_(queue, _)))));
}
/**
 * Like `Stream#into`, but provides the result as a `Managed` to allow for scope
 * composition.
 *
 * @ets_data_first runIntoManaged_
 */

export function runIntoManaged(queue) {
  return self => runIntoManaged_(self, queue);
}
//# sourceMappingURL=runIntoManaged.mjs.map