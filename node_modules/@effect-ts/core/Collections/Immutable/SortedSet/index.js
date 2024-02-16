"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SortedSet = /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/SortedSet");

Object.keys(_SortedSet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SortedSet[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SortedSet[key];
    }
  });
});
//# sourceMappingURL=index.js.map