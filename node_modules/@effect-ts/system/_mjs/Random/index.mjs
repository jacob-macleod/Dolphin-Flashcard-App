// ets_tracing: off

/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/Random.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */
import "../Operator/index.mjs";
import { chain_, succeedWith } from "../Effect/core.mjs";
import { accessServiceM, replaceService } from "../Effect/has.mjs";
import { tag } from "../Has/index.mjs";
import { PCGRandom } from "./PCG/index.mjs";
export const RandomId = /*#__PURE__*/Symbol.for("@effect-ts/system/Random");
export class Random {
  constructor() {
    this.serviceId = RandomId;
  }

}
export class LiveRandom extends Random {
  constructor(seed) {
    super();
    this.next = succeedWith(() => this.PRNG.number());
    this.nextBoolean = chain_(this.next, n => succeedWith(() => n > 0.5));
    this.nextInt = succeedWith(() => this.PRNG.integer(0));

    this.nextRange = (low, high) => chain_(this.next, n => succeedWith(() => (high - low) * n + low));

    this.nextIntBetween = (low, high) => succeedWith(() => this.PRNG.integer(1 + high - low) + low);

    this.PRNG = new PCGRandom(seed);
  }

}
export const defaultRandom = /*#__PURE__*/new LiveRandom( /*#__PURE__*/Math.random() * 4294967296 >>> 0);
export const HasRandom = /*#__PURE__*/tag(RandomId);
export const next = /*#__PURE__*/accessServiceM(HasRandom)(_ => _.next);
export const nextBoolean = /*#__PURE__*/accessServiceM(HasRandom)(_ => _.nextBoolean);
export const nextIntBetween = (low, high) => accessServiceM(HasRandom)(_ => _.nextIntBetween(low, high));
export const nextInt = /*#__PURE__*/accessServiceM(HasRandom)(_ => _.nextInt);
export const nextRange = (low, high) => accessServiceM(HasRandom)(_ => _.nextRange(low, high));
export const withSeed = seed => replaceService(HasRandom, () => new LiveRandom(seed));
//# sourceMappingURL=index.mjs.map