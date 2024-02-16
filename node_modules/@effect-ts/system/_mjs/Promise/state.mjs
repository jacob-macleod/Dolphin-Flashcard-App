export class Done {
  constructor(value) {
    this.value = value;
    this._tag = "Done";
  }

}
export class Pending {
  constructor(joiners) {
    this.joiners = joiners;
    this._tag = "Pending";
  }

}
//# sourceMappingURL=state.mjs.map