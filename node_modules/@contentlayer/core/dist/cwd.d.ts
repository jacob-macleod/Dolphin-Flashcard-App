import type { AbsolutePosixFilePath } from '@contentlayer/utils';
import type { Has } from '@contentlayer/utils/effect';
import { T } from '@contentlayer/utils/effect';
export declare const makeCwd: T.Effect<unknown, never, {
    readonly cwd: AbsolutePosixFilePath;
}>;
export interface Cwd extends T.OutputOf<typeof makeCwd> {
}
export declare const Cwd: import("@effect-ts/system/Has").Tag<Cwd>;
export declare const provideCwd: <R1, E1, A1>(ma: T.Effect<R1 & Has<Cwd>, E1, A1>) => T.Effect<R1, E1, A1>;
export declare const provideCwdCustom: (cwd: AbsolutePosixFilePath) => <R1, E1, A1>(ma: T.Effect<R1 & Has<Cwd>, E1, A1>) => T.Effect<R1, E1, A1>;
export declare const getCwd: T.Effect<Has<Cwd>, never, AbsolutePosixFilePath>;
export type HasCwd = Has<Cwd>;
//# sourceMappingURL=cwd.d.ts.map