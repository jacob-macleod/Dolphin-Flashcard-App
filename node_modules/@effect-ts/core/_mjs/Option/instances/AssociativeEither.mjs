import { left, right } from "@effect-ts/system/Either";
import * as O from "@effect-ts/system/Option";
import * as P from "../../Prelude/index.mjs";
export const AssociativeEither = {
  orElseEither: fb => fa => fa._tag === "Some" ? O.some(left(fa.value)) : O.map_(fb(), right)
};
//# sourceMappingURL=AssociativeEither.mjs.map