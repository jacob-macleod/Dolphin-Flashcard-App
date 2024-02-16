"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VersionedTypeId = exports.Versioned = void 0;

require("../../../Operator/index.js");

// ets_tracing: off
const VersionedTypeId = /*#__PURE__*/Symbol();
exports.VersionedTypeId = VersionedTypeId;

class Versioned {
  constructor(value) {
    this.value = value;
    this._typeId = VersionedTypeId;
  }

}

exports.Versioned = Versioned;
//# sourceMappingURL=index.js.map