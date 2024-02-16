"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TxnId = /*#__PURE__*/require("@effect-ts/system/Transactional/STM/TxnId");

Object.keys(_TxnId).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _TxnId[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _TxnId[key];
    }
  });
});
//# sourceMappingURL=index.js.map