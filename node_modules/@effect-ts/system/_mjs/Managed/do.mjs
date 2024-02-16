// ets_tracing: off
import { chain_, map_ } from "./core.mjs";
import { succeed } from "./succeed.mjs";
/**
 * Binds an effectful value in a `do` scope
 *
 * @ets_data_first bind_
 */

export function bind(tag, f, __trace) {
  return mk => bind_(mk, tag, f, __trace);
}
/**
 * Binds an effectful value in a `do` scope
 */

export function bind_(mk, tag, f, __trace) {
  return chain_(mk, k => map_(f(k), a => ({ ...k,
    [tag]: a
  }), __trace));
}
/**
 * Binds a value in a `do` scope
 *
 * @ets_data_first let_
 */

function let__(tag, f, __trace) {
  return mk => map_(mk, k => ({ ...k,
    [tag]: f(k)
  }), __trace);
}
/**
 * Binds a value in a `do` scope
 */


export function let_(mk, tag, f) {
  return map_(mk, k => ({ ...k,
    [tag]: f(k)
  }));
}
/**
 * Begin a `do` scope
 */

const do_ = /*#__PURE__*/succeed({});
export { let__ as let, do_ as do };
//# sourceMappingURL=do.mjs.map