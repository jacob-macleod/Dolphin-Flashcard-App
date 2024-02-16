export class Running {
  constructor(nextKey, _finalizers) {
    this.nextKey = nextKey;
    this._finalizers = _finalizers;
    this._tag = "Running";
  }

  finalizers() {
    return this._finalizers;
  }

}
//# sourceMappingURL=Running.mjs.map