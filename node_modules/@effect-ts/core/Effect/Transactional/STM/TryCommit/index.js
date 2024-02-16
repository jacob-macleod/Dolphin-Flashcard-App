"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TryCommit = /*#__PURE__*/require("@effect-ts/system/Transactional/STM/TryCommit");

Object.keys(_TryCommit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TryCommit[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TryCommit[key];
    }
  });
});
//# sourceMappingURL=index.js.map