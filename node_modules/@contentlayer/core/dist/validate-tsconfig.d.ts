import { fs } from '@contentlayer/utils';
import { OT, T } from '@contentlayer/utils/effect';
export declare const validateTsconfig: T.Effect<import("@contentlayer/utils/effect").Has<import("./cwd.js").Cwd> & import("@contentlayer/utils/effect").Has<import("@contentlayer/utils/effect/ConsoleService.js").ConsoleService> & OT.HasTracer & import("@contentlayer/utils/effect").Has<fs.Fs> & import("@contentlayer/utils/effect").Has<OT.Tracer>, never, void>;
declare const InvalidTsconfigError_base: import("@effect-ts/system/Case/index.js").CaseConstructorTagged<"InvalidTsconfigError", "_tag">;
export declare class InvalidTsconfigError extends InvalidTsconfigError_base<{
    readonly error: any;
}> {
}
export {};
//# sourceMappingURL=validate-tsconfig.d.ts.map