"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _make = /*#__PURE__*/require("../Promise/make.js");

Object.keys(_make).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _make[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _make[key];
    }
  });
});

var _promise = /*#__PURE__*/require("../Promise/promise.js");

Object.keys(_promise).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _promise[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _promise[key];
    }
  });
});

var _succeed = /*#__PURE__*/require("../Promise/succeed.js");

Object.keys(_succeed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _succeed[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _succeed[key];
    }
  });
});

var _await = /*#__PURE__*/require("../Promise/await.js");

Object.keys(_await).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _await[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _await[key];
    }
  });
});
//# sourceMappingURL=promise.js.map