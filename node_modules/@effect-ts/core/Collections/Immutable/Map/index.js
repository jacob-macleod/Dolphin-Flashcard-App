"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../../Operator/index.js");

var _Map = /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/Map");

Object.keys(_Map).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Map[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Map[key];
    }
  });
});
//# sourceMappingURL=index.js.map