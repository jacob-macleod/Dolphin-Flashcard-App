// ets_tracing: off
import "../Operator/index.mjs";
/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/ZManaged.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */
// codegen:start {preset: barrel, include: ./*.ts, exclude: ./deps*.ts}

export * from "./core.mjs";
export * from "./do.mjs";
export * from "./forEach.mjs";
export * from "./fork.mjs";
export * from "./fromEffect.mjs";
export * from "./makeExit.mjs";
export * from "./managed.mjs";
export * from "./struct.mjs";
export * from "./succeed.mjs";
export * from "./tuple.mjs";
export * from "./use.mjs"; // codegen:end
// codegen:start { preset: barrel, include: ./methods/*.ts }

export * from "./methods/absolve.mjs";
export * from "./methods/allocate.mjs";
export * from "./methods/api.mjs";
export * from "./methods/ensuringFirst.mjs";
export * from "./methods/environment.mjs";
export * from "./methods/foldM.mjs";
export * from "./methods/fromEither.mjs";
export * from "./methods/gen.mjs";
export * from "./methods/halt.mjs";
export * from "./methods/ifM.mjs";
export * from "./methods/iterate.mjs";
export * from "./methods/loop.mjs";
export * from "./methods/makeSucceedWith.mjs";
export * from "./methods/mapN.mjs";
export * from "./methods/preallocationScope.mjs";
export * from "./methods/releaseMap.mjs";
export * from "./methods/runtime.mjs";
export * from "./methods/suspend.mjs";
export * from "./methods/swap.mjs";
export * from "./methods/switchable.mjs";
export * from "./methods/union.mjs";
export * from "./methods/updateService.mjs";
//# sourceMappingURL=index.mjs.map