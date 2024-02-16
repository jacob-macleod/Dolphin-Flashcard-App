// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import { chain } from "./chain.mjs";
import { fromEffect } from "./fromEffect.mjs";
import { map } from "./map.mjs";

function bind(tag, f) {
  return mk => chain(k => map(a => ({ ...k,
    [tag]: a
  }))(f(k)))(mk);
}

function let_(tag, f) {
  return mk => map(k => ({ ...k,
    [tag]: f(k)
  }))(mk);
}

const do_ = /*#__PURE__*/fromEffect( /*#__PURE__*/T.succeed({}));
export { let_ as let, bind, do_ as do };
//# sourceMappingURL=do.mjs.map