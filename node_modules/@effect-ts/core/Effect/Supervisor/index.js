"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Supervisor = /*#__PURE__*/require("@effect-ts/system/Supervisor");

Object.keys(_Supervisor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Supervisor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Supervisor[key];
    }
  });
});
//# sourceMappingURL=index.js.map