"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _HashSet = /*#__PURE__*/require("@effect-ts/system/Collections/Mutable/HashSet");

Object.keys(_HashSet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _HashSet[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _HashSet[key];
    }
  });
});
//# sourceMappingURL=index.js.map