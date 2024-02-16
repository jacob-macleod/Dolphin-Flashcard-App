// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as CH from "../../Channel/index.mjs";
/*
 * Like `Stream#into`, but provides the result as a `Managed` to allow for scope
 * composition.
 */

export function runIntoElementsManaged_(self, queue) {
  const writer = () => CH.readWith(in_ => CH.zipRight_(CK.reduce_(in_, CH.unit, (channel, a) => CH.zipRight_(channel, CH.write(Ex.succeed(a)))), writer()), err => CH.write(Ex.fail(O.some(err))), _ => CH.write(Ex.fail(O.none)));

  return M.asUnit(CH.runManaged(CH.drain(CH.mapOutEffect_(self.channel[">>>"](writer()), _ => Q.offer_(queue, _)))));
}
/**
 * Like `Stream#into`, but provides the result as a `Managed` to allow for scope
 * composition.
 *
 * @ets_data_first runIntoElementsManaged_
 */

export function runIntoElementsManaged(queue) {
  return self => runIntoElementsManaged_(self, queue);
}
//# sourceMappingURL=runIntoElementsManaged.mjs.map