// ets_tracing: off
// minimize circularity by importing only a subset
export * from "../Effect/zips.mjs";
export * from "../Effect/bracketExit.mjs";
export * from "../Effect/core.mjs";
export * from "../Effect/core-scope.mjs";
export * from "../Effect/do.mjs";
export * from "../Effect/done.mjs";
export * from "../Effect/effect.mjs";
export * from "../Effect/commons.mjs";
export * from "../Effect/environment.mjs";
export * from "../Effect/ExecutionStrategy.mjs";
export * from "../Effect/fail.mjs";
export * from "../Effect/flatten.mjs";
export * from "../Effect/interruption.mjs";
export * from "../Effect/map.mjs";
export * from "../Effect/mapError.mjs";
export * from "../Effect/mapErrorCause.mjs";
export * from "../Effect/never.mjs";
export * from "../Effect/provideSome.mjs";
export * from "../Effect/sandbox.mjs";
export * from "../Effect/tap.mjs";
export * from "../Effect/zipWith.mjs";
export * from "../Effect/zipWithPar.mjs";
export * from "../Effect/zip.mjs";
export * from "../Effect/zips.mjs";
export { forEach as exitForeach, halt as exitHalt, interrupt as exitInterrupt } from "../Exit/api.mjs";
export { collectAll as exitCollectAll, collectAllPar as exitCollectAllPar, succeed as exitSucceed, unit as exitUnit, zipRight_ as exitZipRight_ } from "../Exit/core.mjs";
//# sourceMappingURL=deps-core.mjs.map