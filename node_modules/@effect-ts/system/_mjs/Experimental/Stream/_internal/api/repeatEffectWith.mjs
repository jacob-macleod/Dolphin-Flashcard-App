import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as SC from "../../../../Schedule/index.mjs";
import * as Chain from "./chain.mjs";
import * as Concat from "./concat.mjs";
import * as FromEffect from "./fromEffect.mjs";
import * as Succeed from "./succeed.mjs";
import * as UnfoldEffect from "./unfoldEffect.mjs";
/**
 * Creates a stream from an effect producing a value of type `A`, which is repeated using the
 * specified schedule.
 */

export function repeatEffectWith(effect, schedule) {
  return Chain.chain_(FromEffect.fromEffect(T.zip_(effect, SC.driver(schedule))), ({
    tuple: [a, driver]
  }) => Concat.concat_(Succeed.succeed(a), UnfoldEffect.unfoldEffect(a, _ => T.foldM_(driver.next(_), _ => T.succeed(_), _ => T.map_(effect, nextA => O.some(Tp.tuple(nextA, nextA)))))));
}
//# sourceMappingURL=repeatEffectWith.mjs.map