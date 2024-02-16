"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.use = use;
Object.defineProperty(exports, "use_", {
  enumerable: true,
  get: function () {
    return _exclForEach.managedUse_;
  }
});

var _exclForEach = /*#__PURE__*/require("../Effect/excl-forEach.js");

// ets_tracing: off

/**
 * Run an effect while acquiring the resource before and releasing it after
 *
 * @ets_data_first use_
 */
function use(f, __trace) {
  return self => (0, _exclForEach.managedUse_)(self, f, __trace);
}
//# sourceMappingURL=use.js.map