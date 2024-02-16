// ets_tracing: off
import { chain_, succeed } from "./core.mjs";
import { map_ } from "./map.mjs";
/**
 * Binds an effectful value in a `do` scope
 *
 * @ets_data_first bind_
 */

function bind(tag, f, __trace) {
  return mk => bind_(mk, tag, f, __trace);
}
/**
 * Binds an effectful value in a `do` scope
 */


export function bind_(mk, tag, f, __trace) {
  return chain_(mk, k => map_(f(k), a => ({ ...k,
    [tag]: a
  })), __trace);
}
/**
 * Like bind for values
 *
 * @ets_data_first let_
 */

function let__(tag, f, __trace) {
  return mk => let_(mk, tag, f);
}
/**
 * Like bind for values
 */


export function let_(mk, tag, f, __trace) {
  return map_(mk, k => ({ ...k,
    [tag]: f(k)
  }), __trace);
}
const do_ = /*#__PURE__*/succeed({});
export { let__ as let, bind, do_ as do };
//# sourceMappingURL=do.mjs.map