"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../../Operator/index.js");

var _RedBlackTree = /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/RedBlackTree");

Object.keys(_RedBlackTree).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RedBlackTree[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _RedBlackTree[key];
    }
  });
});
//# sourceMappingURL=index.js.map