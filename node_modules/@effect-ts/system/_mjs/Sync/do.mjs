// ets_tracing: off
import * as X from "./core.mjs";

function bind(tag, f) {
  return mk => X.chain_(mk, k => X.map_(f(k), a => ({ ...k,
    [tag]: a
  })));
}

function let_(tag, f) {
  return mk => X.map_(mk, k => ({ ...k,
    [tag]: f(k)
  }));
}

const do_ = /*#__PURE__*/X.succeed({});
export { let_ as let, bind, do_ as do };
//# sourceMappingURL=do.mjs.map