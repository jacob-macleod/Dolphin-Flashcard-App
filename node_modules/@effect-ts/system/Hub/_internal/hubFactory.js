"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  makeBounded: true,
  makeUnbounded: true
};
exports.makeBounded = makeBounded;
exports.makeUnbounded = makeUnbounded;

require("../../Operator/index.js");

var _BoundedHubArb = /*#__PURE__*/require("./BoundedHubArb.js");

var _BoundedHubPow = /*#__PURE__*/require("./BoundedHubPow2.js");

var _BoundedHubSingle = /*#__PURE__*/require("./BoundedHubSingle.js");

var _errors = /*#__PURE__*/require("./errors.js");

var _UnboundedHub = /*#__PURE__*/require("./UnboundedHub.js");

var _Hub = /*#__PURE__*/require("./Hub.js");

Object.keys(_Hub).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Hub[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Hub[key];
    }
  });
});

// ets_tracing: off
function nextPow2(n) {
  const nextPow = Math.ceil(Math.log(n) / Math.log(2.0));
  return Math.max(Math.pow(2, nextPow), 2);
}

function makeBounded(requestedCapacity) {
  (0, _errors.ensureCapacity)(requestedCapacity);

  if (requestedCapacity === 1) {
    return new _BoundedHubSingle.BoundedHubSingle();
  } else if (nextPow2(requestedCapacity) === requestedCapacity) {
    return new _BoundedHubPow.BoundedHubPow2(requestedCapacity);
  } else {
    return new _BoundedHubArb.BoundedHubArb(requestedCapacity);
  }
}

function makeUnbounded() {
  return new _UnboundedHub.UnboundedHub();
}
//# sourceMappingURL=hubFactory.js.map