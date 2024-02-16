"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Success = exports.Failure = void 0;

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Structural/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Success {
  constructor(value) {
    this.value = value;
    this._tag = "Success";
  }

  get [St.hashSym]() {
    return St.hash(this.value);
  }

  [St.equalsSym](that) {
    return that instanceof Success && St.equals(this.value, that.value);
  }

}

exports.Success = Success;

class Failure {
  constructor(cause) {
    this.cause = cause;
    this._tag = "Failure";
  }

  get [St.hashSym]() {
    return St.hash(this.cause);
  }

  [St.equalsSym](that) {
    return that instanceof Failure && St.equals(this.cause, that.cause);
  }

}

exports.Failure = Failure;
//# sourceMappingURL=exit.js.map