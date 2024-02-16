// ets_tracing: off
import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as Api from "./api/index.mjs";
import * as Core from "./core.mjs";

function bind(tag, f) {
  return mk => Core.chain_(mk, k => Api.map_(f(k), a => ({ ...k,
    [tag]: a
  })));
}

function let_(tag, f) {
  return mk => Api.map_(mk, k => ({ ...k,
    [tag]: f(k)
  }));
}

const do_ = /*#__PURE__*/Core.fromEffect( /*#__PURE__*/T.succeed({}));
export { let_ as let, bind, do_ as do };
//# sourceMappingURL=do.mjs.map