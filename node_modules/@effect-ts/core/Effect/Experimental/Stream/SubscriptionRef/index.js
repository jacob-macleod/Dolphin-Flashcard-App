"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SubscriptionRef = /*#__PURE__*/require("@effect-ts/system/Experimental/Stream/SubscriptionRef");

Object.keys(_SubscriptionRef).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _SubscriptionRef[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _SubscriptionRef[key];
    }
  });
});
//# sourceMappingURL=index.js.map