// ets_tracing: off
import * as Chunk from "../../Collections/Immutable/Chunk/index.mjs";
import * as List from "../../Collections/Immutable/List/index.mjs";
import * as E from "../../Either/index.mjs";
import * as St from "../../Structural/index.mjs";
import { Int } from "../Int/index.mjs";
/**
 * A type of annotation.
 */

export class TestAnnotation {
  constructor(identifier, initial, combine) {
    this.identifier = identifier;
    this.initial = initial;
    this.combine = combine;
  }

  get [St.hashSym]() {
    return St.hash(this.identifier);
  }

  [St.equalsSym](that) {
    return that instanceof TestAnnotation && St.equals(this.identifier, that.identifier);
  }

}
export const fibers = /*#__PURE__*/new TestAnnotation("fibers", /*#__PURE__*/E.leftW(0), compose);

function compose(left, right) {
  if (left._tag === "Left" && right._tag === "Left") {
    return E.left(Int(left.left + right.left));
  } else if (left._tag === "Right" && right._tag === "Right") {
    return E.right(Chunk.concat_(left.right, right.right));
  } else if (left._tag === "Right" && right._tag === "Left") {
    return E.left(right.left);
  } else {
    return E.right(right.right);
  }
}

export const location = /*#__PURE__*/new TestAnnotation("location", /*#__PURE__*/List.empty(), List.concat_);
//# sourceMappingURL=index.mjs.map