"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = /*#__PURE__*/require("../Ref/api.js");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _api[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _XRef = /*#__PURE__*/require("../Ref/XRef.js");

Object.keys(_XRef).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _XRef[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _XRef[key];
    }
  });
});
//# sourceMappingURL=excl-deps-ref.js.map