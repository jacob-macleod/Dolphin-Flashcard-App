import { unknownToAbsolutePosixFilePath } from '@contentlayer/utils';
import { T, tag } from '@contentlayer/utils/effect';
export const makeCwd = T.gen(function* (_) {
    const cwd = yield* _(T.succeedWith(() => {
        const cwdValue = process.env.PWD ?? process.cwd();
        return unknownToAbsolutePosixFilePath(cwdValue);
    }));
    return { cwd };
});
export const Cwd = tag(Symbol('contentlayer:Cwd'));
export const provideCwd = T.provideServiceM(Cwd)(makeCwd);
export const provideCwdCustom = (cwd) => T.provideService(Cwd)({ cwd });
export const getCwd = T.accessService(Cwd)((_) => _.cwd);
//# sourceMappingURL=cwd.js.map