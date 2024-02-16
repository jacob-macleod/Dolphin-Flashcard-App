import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as SC from "../../Schedule/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "./../Pull/index.mjs";
import { concat_ } from "./concat.mjs";
import { Stream } from "./definitions.mjs";
import { fromEffect } from "./fromEffect.mjs";
import { map_ } from "./map.mjs";
/**
 * Repeats the entire stream using the specified schedule. The stream will execute normally,
 * and then repeat again according to the provided schedule. The schedule output will be emitted at
 * the end of each repetition and can be unified with the stream elements using the provided functions.
 */

export function repeatWith(schedule) {
  return (f, g) => self => new Stream(M.map_(M.let_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "sdriver", () => T.toManaged(SC.driver(schedule))), "switchPull", () => M.switchable()), "currPull", ({
    switchPull
  }) => T.toManaged(T.chain_(switchPull(map_(self, f).proc), Ref.makeRef))), "doneRef", () => T.toManaged(Ref.makeRef(false))), "pull", ({
    currPull,
    doneRef,
    sdriver,
    switchPull
  }) => {
    const go = T.chain_(doneRef.get, done => {
      if (done) {
        return Pull.end;
      } else {
        return T.foldM_(T.flatten(currPull.get), O.fold(() => {
          const scheduleOutput = T.map_(T.orDie(sdriver.last), g);
          const continue_ = T.zipRight_(T.tap_(T.zipRight_(sdriver.next(undefined), switchPull(concat_(map_(self, f), fromEffect(scheduleOutput)).proc)), _ => currPull.set(_)), go);
          const halt = T.zipRight_(doneRef.set(true), Pull.end);
          return T.orElse_(continue_, () => halt);
        }, e => T.fail(O.some(e))), _ => T.succeed(_));
      }
    });
    return go;
  }), ({
    pull
  }) => pull));
}
//# sourceMappingURL=repeatWith.mjs.map