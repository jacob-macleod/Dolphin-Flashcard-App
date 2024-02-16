// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as ZipChunks from "./_internal/zipChunks.mjs";
import * as CombineChunks from "./combineChunks.mjs";

class Running {
  constructor(excess) {
    this.excess = excess;
    this._tag = "Running";
  }

}

class LeftDone {
  constructor(excessL) {
    this.excessL = excessL;
    this._tag = "LeftDone";
  }

}

class RightDone {
  constructor(excessR) {
    this.excessR = excessR;
    this._tag = "RightDone";
  }

}

class End {
  constructor() {
    this._tag = "End";
  }

}

function handleSuccess(f, leftUpd, rightUpd, excess) {
  const [leftExcess, rightExcess] = E.fold_(excess, l => [l, CK.empty()], r => [CK.empty(), r]);
  const left = O.fold_(leftUpd, () => leftExcess, upd => CK.concat_(leftExcess, upd));
  const right = O.fold_(rightUpd, () => rightExcess, upd => CK.concat_(rightExcess, upd));
  const {
    tuple: [emit, newExcess]
  } = ZipChunks.zipChunks_(left, right, f);

  if (leftUpd._tag === "Some" && rightUpd._tag === "Some") {
    return Ex.succeed(Tp.tuple(emit, new Running(newExcess)));
  }

  if (leftUpd._tag === "None" && rightUpd._tag === "None") {
    return Ex.fail(O.none);
  }

  const newState = newExcess._tag === "Left" ? CK.isEmpty(newExcess.left) ? new End() : new LeftDone(newExcess.left) : CK.isEmpty(newExcess.right) ? new End() : new RightDone(newExcess.right);
  return Ex.succeed(Tp.tuple(emit, newState));
}
/**
 * Zips this stream with another point-wise and applies the function to the paired elements.
 *
 * The new stream will end when one of the sides ends.
 */


export function zipWith_(self, that, f) {
  return CombineChunks.combineChunks_(self, that, new Running(E.left(CK.empty())), (st, p1, p2) => {
    switch (st._tag) {
      case "End":
        {
          return T.succeed(Ex.fail(O.none));
        }

      case "Running":
        {
          return T.catchAllCause_(T.zipWithPar_(T.optional(p1), T.optional(p2), (l, r) => handleSuccess(f, l, r, st.excess)), e => T.succeed(Ex.halt(CS.map_(e, O.some))));
        }

      case "LeftDone":
        {
          return T.catchAllCause_(T.map_(T.optional(p2), l => handleSuccess(f, O.none, l, E.left(st.excessL))), e => T.succeed(Ex.halt(CS.map_(e, O.some))));
        }

      case "RightDone":
        {
          return T.catchAllCause_(T.map_(T.optional(p1), r => handleSuccess(f, r, O.none, E.right(st.excessR))), e => T.succeed(Ex.halt(CS.map_(e, O.some))));
        }
    }
  });
}
/**
 * Zips this stream with another point-wise and applies the function to the paired elements.
 *
 * The new stream will end when one of the sides ends.
 *
 * @ets_data_first zipWith_
 */

export function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
//# sourceMappingURL=zipWith.mjs.map