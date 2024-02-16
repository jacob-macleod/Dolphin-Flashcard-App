import { chain_, map_, succeed } from "./core.mjs";
/**
 * Binds an effectful value in a `do` scope
 *
 * @ets_data_first bind_
 */

function bind(tag, f) {
  return mk => bind_(mk, tag, f);
}
/**
 * Binds an effectful value in a `do` scope
 */


export function bind_(mk, tag, f) {
  return chain_(mk, k => map_(f(k), a => ({ ...k,
    [tag]: a
  })));
}
/**
 * Like bind for values
 *
 * @ets_data_first let_
 */

function let__(tag, f) {
  return mk => let_(mk, tag, f);
}
/**
 * Like bind for values
 */


export function let_(mk, tag, f) {
  return map_(mk, k => ({ ...k,
    [tag]: f(k)
  }));
}
const do_ = /*#__PURE__*/succeed({});
export { let__ as let, bind, do_ as do };
//# sourceMappingURL=do.mjs.map