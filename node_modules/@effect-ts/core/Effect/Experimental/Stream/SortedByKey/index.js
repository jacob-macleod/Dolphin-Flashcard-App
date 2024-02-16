"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SortedByKey = /*#__PURE__*/require("@effect-ts/system/Experimental/Stream/SortedByKey");

Object.keys(_SortedByKey).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SortedByKey[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SortedByKey[key];
    }
  });
});
//# sourceMappingURL=index.js.map