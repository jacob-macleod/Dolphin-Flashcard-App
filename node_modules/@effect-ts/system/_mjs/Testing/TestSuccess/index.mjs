export const SucceededTypeId = /*#__PURE__*/Symbol();
export class Succeeded {
  constructor(result) {
    this.result = result;
    this._typeId = SucceededTypeId;
  }

}
export const IgnoredTypeId = /*#__PURE__*/Symbol();
export class Ignored {
  constructor(result) {
    this.result = result;
    this._typeId = IgnoredTypeId;
  }

}
//# sourceMappingURL=index.mjs.map