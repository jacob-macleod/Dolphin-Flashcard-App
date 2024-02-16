"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withSeed = exports.nextRange = exports.nextIntBetween = exports.nextInt = exports.nextBoolean = exports.next = exports.defaultRandom = exports.RandomId = exports.Random = exports.LiveRandom = exports.HasRandom = void 0;

require("../Operator/index.js");

var _core = /*#__PURE__*/require("../Effect/core.js");

var _has = /*#__PURE__*/require("../Effect/has.js");

var _index2 = /*#__PURE__*/require("../Has/index.js");

var _index3 = /*#__PURE__*/require("./PCG/index.js");

// ets_tracing: off

/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/Random.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */
const RandomId = /*#__PURE__*/Symbol.for("@effect-ts/system/Random");
exports.RandomId = RandomId;

class Random {
  constructor() {
    this.serviceId = RandomId;
  }

}

exports.Random = Random;

class LiveRandom extends Random {
  constructor(seed) {
    super();
    this.next = (0, _core.succeedWith)(() => this.PRNG.number());
    this.nextBoolean = (0, _core.chain_)(this.next, n => (0, _core.succeedWith)(() => n > 0.5));
    this.nextInt = (0, _core.succeedWith)(() => this.PRNG.integer(0));

    this.nextRange = (low, high) => (0, _core.chain_)(this.next, n => (0, _core.succeedWith)(() => (high - low) * n + low));

    this.nextIntBetween = (low, high) => (0, _core.succeedWith)(() => this.PRNG.integer(1 + high - low) + low);

    this.PRNG = new _index3.PCGRandom(seed);
  }

}

exports.LiveRandom = LiveRandom;
const defaultRandom = /*#__PURE__*/new LiveRandom( /*#__PURE__*/Math.random() * 4294967296 >>> 0);
exports.defaultRandom = defaultRandom;
const HasRandom = /*#__PURE__*/(0, _index2.tag)(RandomId);
exports.HasRandom = HasRandom;
const next = /*#__PURE__*/(0, _has.accessServiceM)(HasRandom)(_ => _.next);
exports.next = next;
const nextBoolean = /*#__PURE__*/(0, _has.accessServiceM)(HasRandom)(_ => _.nextBoolean);
exports.nextBoolean = nextBoolean;

const nextIntBetween = (low, high) => (0, _has.accessServiceM)(HasRandom)(_ => _.nextIntBetween(low, high));

exports.nextIntBetween = nextIntBetween;
const nextInt = /*#__PURE__*/(0, _has.accessServiceM)(HasRandom)(_ => _.nextInt);
exports.nextInt = nextInt;

const nextRange = (low, high) => (0, _has.accessServiceM)(HasRandom)(_ => _.nextRange(low, high));

exports.nextRange = nextRange;

const withSeed = seed => (0, _has.replaceService)(HasRandom, () => new LiveRandom(seed));

exports.withSeed = withSeed;
//# sourceMappingURL=index.js.map