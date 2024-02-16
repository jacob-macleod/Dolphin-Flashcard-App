/// <reference types="node" />
/// <reference types="node" />
import type { Stats } from 'node:fs';
import type { JsonValue } from 'type-fest';
import type { Has, OT } from './effect/index.js';
import { T } from './effect/index.js';
export declare const FsTag: import("@effect-ts/system/Has/index.js").Tag<Fs>;
export interface HasFs extends Has<Fs> {
}
export declare const fileOrDirExists: (pathLike: string) => T.Effect<OT.HasTracer & Has<Fs>, StatError, boolean>, symlinkExists: (pathLike: string) => T.Effect<Has<Fs>, StatError, boolean>, stat: (filePath: string) => T.Effect<Has<Fs>, StatError | FileNotFoundError, Stats>, readFile: (filePath: string) => T.Effect<OT.HasTracer & Has<Fs>, FileNotFoundError | ReadFileError, string>, readFileBuffer: (filePath: string) => T.Effect<OT.HasTracer & Has<Fs>, FileNotFoundError | ReadFileError, Buffer>, writeFile: (filePath: string, content: string) => T.Effect<OT.HasTracer & Has<Fs>, WriteFileError, void>, writeFileJson: (args_0: {
    filePath: string;
    content: JsonValue;
}) => T.Effect<OT.HasTracer & Has<Fs>, WriteFileError | JsonStringifyError, void>, mkdirp: (dirPath: string) => T.Effect<OT.HasTracer & Has<Fs>, MkdirError, void>, symlink: (args_0: {
    targetPath: string;
    symlinkPath: string;
    type: SymlinkType;
}) => T.Effect<OT.HasTracer & Has<Fs>, SymlinkError, void>;
export declare const readFileJson: <T extends JsonValue = JsonValue>(filePath: string) => T.Effect<OT.HasTracer & HasFs, FileNotFoundError | ReadFileError | JsonParseError, T>;
export declare const readFileJsonIfExists: <T extends JsonValue = JsonValue>(filePath: string) => T.Effect<OT.HasTracer & HasFs, StatError | ReadFileError | JsonParseError, T | undefined>;
export declare function rm(path: string, params: {
    force: true;
    recursive?: boolean;
}): T.Effect<OT.HasTracer & HasFs, RmError, void>;
export declare function rm(path: string, params?: {
    force?: false;
    recursive?: boolean;
}): T.Effect<OT.HasTracer & HasFs, RmError | FileOrDirNotFoundError, void>;
export interface Fs {
    fileOrDirExists: (pathLike: string) => T.Effect<OT.HasTracer, StatError, boolean>;
    symlinkExists: (pathLike: string) => T.Effect<unknown, StatError, boolean>;
    stat: (filePath: string) => T.Effect<unknown, FileNotFoundError | StatError, Stats>;
    readFile: (filePath: string) => T.Effect<OT.HasTracer, ReadFileError | FileNotFoundError, string>;
    readFileBuffer: (filePath: string) => T.Effect<OT.HasTracer, ReadFileError | FileNotFoundError, Buffer>;
    readFileJson: <T extends JsonValue = JsonValue>(filePath: string) => T.Effect<OT.HasTracer, ReadFileError | FileNotFoundError | JsonParseError, T>;
    readFileJsonIfExists: <T extends JsonValue = JsonValue>(filePath: string) => T.Effect<OT.HasTracer, StatError | ReadFileError | JsonParseError, T | undefined>;
    writeFile: (filePath: string, content: string) => T.Effect<OT.HasTracer, WriteFileError, void>;
    writeFileJson: ({ filePath, content, }: {
        filePath: string;
        content: JsonValue;
    }) => T.Effect<OT.HasTracer, WriteFileError | JsonStringifyError, void>;
    mkdirp: <T extends string>(dirPath: T) => T.Effect<OT.HasTracer, MkdirError, void>;
    rm(path: string, params: {
        force: true;
        recursive?: boolean;
    }): T.Effect<OT.HasTracer, RmError, void>;
    rm(path: string, params?: {
        force?: false;
        recursive?: boolean;
    }): T.Effect<OT.HasTracer, RmError | FileOrDirNotFoundError, void>;
    rm(path: string, params: {
        force?: boolean;
        recursive?: boolean;
    }): T.Effect<OT.HasTracer, RmError | FileOrDirNotFoundError, void>;
    symlink: ({ targetPath, symlinkPath, type, }: {
        targetPath: string;
        symlinkPath: string;
        type: SymlinkType;
    }) => T.Effect<OT.HasTracer, SymlinkError, void>;
}
export type SymlinkType = 'file' | 'dir' | 'junction';
declare const FileNotFoundError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"fs.FileNotFoundError", "_tag">;
export declare class FileNotFoundError extends FileNotFoundError_base<{
    readonly filePath: string;
}> {
}
declare const FileOrDirNotFoundError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"fs.FileOrDirNotFoundError", "_tag">;
export declare class FileOrDirNotFoundError extends FileOrDirNotFoundError_base<{
    readonly path: string;
}> {
}
declare const ReadFileError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"fs.ReadFileError", "_tag">;
export declare class ReadFileError extends ReadFileError_base<{
    readonly filePath: string;
    readonly error: unknown;
}> {
}
declare const StatError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"fs.StatError", "_tag">;
export declare class StatError extends StatError_base<{
    readonly filePath: string;
    readonly error: unknown;
}> {
}
declare const WriteFileError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"fs.WriteFileError", "_tag">;
export declare class WriteFileError extends WriteFileError_base<{
    readonly filePath: string;
    readonly error: unknown;
}> {
}
declare const MkdirError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"fs.MkdirError", "_tag">;
export declare class MkdirError extends MkdirError_base<{
    readonly dirPath: string;
    readonly error: unknown;
}> {
}
declare const RmError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"fs.RmError", "_tag">;
export declare class RmError extends RmError_base<{
    readonly path: string;
    readonly error: unknown;
}> {
}
declare const SymlinkError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"fs.SymlinkError", "_tag">;
export declare class SymlinkError extends SymlinkError_base<{
    readonly targetPath: string;
    readonly symlinkPath: string;
    readonly type: SymlinkType;
    readonly error: unknown;
}> {
}
declare const UnknownFSError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"fs.UnknownFSError", "_tag">;
export declare class UnknownFSError extends UnknownFSError_base<{
    readonly error: any;
}> {
    toString: () => string;
}
declare const JsonParseError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"fs.JsonParseError", "_tag">;
export declare class JsonParseError extends JsonParseError_base<{
    readonly str: string;
    readonly error: unknown;
}> {
}
declare const JsonStringifyError_base: import("@effect-ts/core/Case").CaseConstructorTagged<"fs.JsonStringifyError", "_tag">;
export declare class JsonStringifyError extends JsonStringifyError_base<{
    readonly error: unknown;
}> {
}
export {};
//# sourceMappingURL=fs_.d.ts.map