// ets_tracing: off
import "../../../Operator/index.mjs";
export const VersionedTypeId = /*#__PURE__*/Symbol();
export class Versioned {
  constructor(value) {
    this.value = value;
    this._typeId = VersionedTypeId;
  }

}
//# sourceMappingURL=index.mjs.map