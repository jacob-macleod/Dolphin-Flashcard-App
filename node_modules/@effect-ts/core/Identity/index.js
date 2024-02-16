"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  IdentityURI: true
};
Object.defineProperty(exports, "IdentityURI", {
  enumerable: true,
  get: function () {
    return _index2.IdentityURI;
  }
});

require("../Operator/index.js");

var _definition = /*#__PURE__*/require("./definition.js");

Object.keys(_definition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _definition[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _definition[key];
    }
  });
});

var _index2 = /*#__PURE__*/require("../Modules/index.js");

var _operations = /*#__PURE__*/require("./operations.js");

Object.keys(_operations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _operations[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _operations[key];
    }
  });
});

var _makeIdentity = /*#__PURE__*/require("./makeIdentity.js");

Object.keys(_makeIdentity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _makeIdentity[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _makeIdentity[key];
    }
  });
});

var _common = /*#__PURE__*/require("./common.js");

Object.keys(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _common[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});
//# sourceMappingURL=index.js.map