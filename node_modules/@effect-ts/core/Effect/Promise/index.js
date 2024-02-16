"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Promise = /*#__PURE__*/require("@effect-ts/system/Promise");

Object.keys(_Promise).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Promise[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Promise[key];
    }
  });
});
//# sourceMappingURL=index.js.map