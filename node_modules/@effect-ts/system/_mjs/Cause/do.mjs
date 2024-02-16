// ets_tracing: off
import { pipe } from "../Function/index.mjs";
import { fail } from "./cause.mjs";
import { chain, map } from "./core.mjs";

const bind = (tag, f) => mk => chain(k => map(a => ({ ...k,
  [tag]: a
}))(f(k)))(mk);

const let_ = (tag, f) => mk => map(k => ({ ...k,
  [tag]: f(k)
}))(mk);

const do_ = /*#__PURE__*/fail({});
export { let_ as let, bind, do_ as do };
//# sourceMappingURL=do.mjs.map