import * as path from 'node:path';
import { fs } from '@contentlayer/utils';
import { OT, pipe, T } from '@contentlayer/utils/effect';
import { ArtifactsDir } from './ArtifactsDir.js';
export var DataCache;
(function (DataCache) {
    DataCache.loadPreviousCacheFromDisk = ({ schemaHash, }) => pipe(T.gen(function* ($) {
        const cacheDirPath = yield* $(ArtifactsDir.getCacheDirPath);
        const filePath = path.join(cacheDirPath, dataCacheFileName(schemaHash));
        yield* $(OT.addAttribute('filePath', filePath));
        const cache = yield* $(fs.readFileJsonIfExists(filePath));
        return cache;
    }), OT.withSpan('@contentlayer/core/cache:loadPreviousCacheFromDisk', { attributes: { schemaHash } }));
    DataCache.writeCacheToDisk = ({ cache, schemaHash, }) => pipe(T.gen(function* ($) {
        const cacheDirPath = yield* $(ArtifactsDir.mkdirCache);
        const filePath = path.join(cacheDirPath, dataCacheFileName(schemaHash));
        yield* $(OT.addAttribute('filePath', filePath));
        yield* $(fs.writeFileJson({ filePath, content: cache }));
    }), T.either, OT.withSpan('@contentlayer/core/cache:writeCacheToDisk', { attributes: { schemaHash } }));
    const dataCacheFileName = (schemaHash) => `data-${schemaHash}.json`;
})(DataCache || (DataCache = {}));
//# sourceMappingURL=DataCache.js.map