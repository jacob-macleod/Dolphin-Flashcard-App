// ets_tracing: off
import { pipe } from "../Function/index.mjs";
import { chain, map, succeed } from "./core.mjs";

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

const do_ = /*#__PURE__*/succeed({});
export { let_ as let, bind, do_ as do };
//# sourceMappingURL=do.mjs.map