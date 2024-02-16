// ets_tracing: off
import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as Chain from "./api/chain.mjs";
import { fromEffect } from "./api/index.mjs";
import * as Map from "./api/map.mjs";

function bind(tag, f) {
  return mk => Chain.chain_(mk, k => Map.map_(f(k), a => ({ ...k,
    [tag]: a
  })));
}

function let_(tag, f) {
  return mk => Map.map_(mk, k => ({ ...k,
    [tag]: f(k)
  }));
}

const do_ = /*#__PURE__*/fromEffect( /*#__PURE__*/T.succeed({}));
export { let_ as let, bind, do_ as do };
//# sourceMappingURL=do.mjs.map