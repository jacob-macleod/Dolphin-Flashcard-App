// ets_tracing: off
import { succeed } from "./core.mjs";
import { effectAsync } from "./effectAsync.mjs";
import { fail } from "./fail.mjs";
export function fromNodeCb(f, __trace) {
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const args = Array.prototype.slice.call(arguments);
    return effectAsync(cb => {
      const cbResolver = (e, r) => e != null ? cb(fail(e)) : cb(succeed(r)); // eslint-disable-next-line prefer-spread


      f.apply(null, args.concat(cbResolver));
    }, __trace);
  };
}
//# sourceMappingURL=fromNodeCb.mjs.map