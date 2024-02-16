import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as O from "../../Option/index.mjs";
import * as SC from "../../Schedule/index.mjs";
import * as T from "../_internal/effect.mjs";
import { chain_ } from "./chain.mjs";
import { concat_ } from "./concat.mjs";
import { fromEffect } from "./fromEffect.mjs";
import { succeed } from "./succeed.mjs";
import { unfoldM } from "./unfoldM.mjs";
/**
 * Creates a stream from an effect producing a value of type `A`, which is repeated using the
 * specified schedule.
 */

export function repeatEffectWith(effect, schedule) {
  return chain_(fromEffect(T.zip_(effect, SC.driver(schedule))), ({
    tuple: [a, driver]
  }) => concat_(succeed(a), unfoldM(a, _ => T.foldM_(driver.next(_), T.succeed, _ => T.map_(effect, nextA => O.some(Tp.tuple(nextA, nextA)))))));
}
//# sourceMappingURL=repeatEffectWith.mjs.map