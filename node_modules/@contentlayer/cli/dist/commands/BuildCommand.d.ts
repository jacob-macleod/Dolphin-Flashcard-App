import * as core from '@contentlayer/core';
import { OT, T } from '@contentlayer/utils/effect';
import type { Usage } from 'clipanion';
import { BaseCommand } from './_BaseCommand.js';
export declare class BuildCommand extends BaseCommand {
    static paths: string[][];
    static usage: Usage;
    executeSafe: () => T.Effect<import("@contentlayer/utils/effect").HasConsole & import("@contentlayer/utils/effect").Has<core.Cwd> & import("@contentlayer/utils/effect").Has<import("@contentlayer/utils/effect/ConsoleService.js").ConsoleService> & OT.HasTracer & import("@contentlayer/utils/effect").Has<import("@contentlayer/utils/fs_.js").Fs> & import("@contentlayer/utils/effect").Has<OT.Tracer> & import("@contentlayer/utils/fs_.js").HasFs & core.HasCwd & import("@contentlayer/utils/effect").HasClock, import("@contentlayer/utils/fs_.js").RmError | import("../../../core/src/getConfig/esbuild.js").UnknownEsbuildError | import("../../../core/src/getConfig/esbuild.js").KnownEsbuildError | core.NoConfigFoundError | import("@contentlayer/utils/fs_.js").StatError | import("@contentlayer/utils/fs_.js").UnknownFSError | import("@contentlayer/utils/fs_.js").MkdirError | core.EsbuildBinNotFoundError | core.ConfigReadError | core.ConfigNoDefaultExportError | import("@contentlayer/utils/fs_.js").ReadFileError | import("@contentlayer/utils/fs_.js").JsonParseError | import("@contentlayer/utils/fs_.js").WriteFileError | import("@contentlayer/utils/fs_.js").JsonStringifyError | core.SourceProvideSchemaError | core.SourceFetchDataError | core.SuccessCallbackError, core.GenerateInfo>;
}
//# sourceMappingURL=BuildCommand.d.ts.map