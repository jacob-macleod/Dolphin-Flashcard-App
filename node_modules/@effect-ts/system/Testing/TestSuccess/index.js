"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SucceededTypeId = exports.Succeeded = exports.IgnoredTypeId = exports.Ignored = void 0;
const SucceededTypeId = /*#__PURE__*/Symbol();
exports.SucceededTypeId = SucceededTypeId;

class Succeeded {
  constructor(result) {
    this.result = result;
    this._typeId = SucceededTypeId;
  }

}

exports.Succeeded = Succeeded;
const IgnoredTypeId = /*#__PURE__*/Symbol();
exports.IgnoredTypeId = IgnoredTypeId;

class Ignored {
  constructor(result) {
    this.result = result;
    this._typeId = IgnoredTypeId;
  }

}

exports.Ignored = Ignored;
//# sourceMappingURL=index.js.map