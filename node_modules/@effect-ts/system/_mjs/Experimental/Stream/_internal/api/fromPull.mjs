import * as M from "../../../../Managed/index.mjs";
import * as RepeatEffectChunkOption from "./repeatEffectChunkOption.mjs";
import * as UnwrapManaged from "./unwrapManaged.mjs";
export function fromPull(io) {
  return UnwrapManaged.unwrapManaged(M.map_(io, pull => RepeatEffectChunkOption.repeatEffectChunkOption(pull)));
}
//# sourceMappingURL=fromPull.mjs.map