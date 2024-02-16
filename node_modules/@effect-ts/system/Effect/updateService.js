"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateService = updateService;
exports.updateService_ = updateService_;

var _provideSome = /*#__PURE__*/require("./provideSome.js");

/**
 * Updates a service in the environment of this effect.
 */
function updateService_(self, tag, f, __trace) {
  return (0, _provideSome.provideSome_)(self, r => ({ ...r,
    ...tag.has(f(tag.read(r)))
  }), __trace);
}
/**
 * Updates a service in the environment of this effect.
 *
 * @ets_data_first updateService_
 */


function updateService(tag, f, __trace) {
  return self => updateService_(self, tag, f, __trace);
}
//# sourceMappingURL=updateService.js.map