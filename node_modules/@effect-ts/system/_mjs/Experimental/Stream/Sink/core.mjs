// ets_tracing: off
import "../../../Operator/index.mjs";
import * as U from "./utils.mjs";
/**
 * Sink is a data type that represent a channel that reads elements
 * of type `In`, handles input errors of type `InErr`, emits errors
 * of type `OutErr`, emits outputs of type `L` and ends with a value
 * of type `Z`.
 */

export class Sink {
  constructor(channel) {
    this.channel = channel;
  }

}
U._R, U._InErr, U._In, U._OutErr, U._L, U._Z;
//# sourceMappingURL=core.mjs.map