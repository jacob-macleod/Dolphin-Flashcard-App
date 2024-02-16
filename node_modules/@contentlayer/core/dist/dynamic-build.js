import { provideTracing } from '@contentlayer/utils';
import { O, OT, pipe, provideConsole, S, T } from '@contentlayer/utils/effect';
import { NodeFsLive } from '@contentlayer/utils/node';
import { provideCwdCustom } from './cwd.js';
import { ConfigReadError } from './errors.js';
import { getDataVariableName } from './generation/common.js';
import { runMain } from './runMain.js';
// NOTE this is currently not used but we keep it around for now - who knows?
export const dynamicBuildFromCompiledConfigMain = ({ compiledConfigPath, esbuildHash, verbose, }) => pipe(dynamicBuildFromCompiledConfig({ compiledConfigPath, esbuildHash, verbose }), T.tapCauseLogPretty, runMain({ verbose, useInMemoryFs: true, tracingServiceName: 'contentlayer-dynamic' }));
export const dynamicBuildFromCompiledConfig = ({ compiledConfigPath, esbuildHash, verbose, }) => pipe(T.tryPromise(() => import(`file://${compiledConfigPath}`)), T.tap((_) => T.log('got config module', _)), T.chain((exports) => T.tryPromise(() => exports.default)), T.tap((_) => T.log('got config exports')), T.mapError((error) => new ConfigReadError({ error, configPath: compiledConfigPath })), T.map((source) => ({ source, esbuildHash, filePath: compiledConfigPath })), T.tap((_) => T.log('got config source')), T.timeoutFail(5000, () => new ConfigReadError({
    error: new Error(`Timed out after 5 seconds trying to loading config`),
    configPath: compiledConfigPath,
})), T.chain((config) => dynamicBuild({ config, verbose })), OT.withSpan('@contentlayer/core/dynamicBuildFromCompiledConfig', { attributes: { compiledConfigPath } }));
// NOTE this is currently not used but we keep it around for now - who knows?
export const dynamicBuildMain = ({ config, verbose, runtimeDeps, }) => pipe(dynamicBuild({ config, verbose }), provideTracing('contentlayer-dynamic', 'otel'), provideCwdCustom(runtimeDeps.cwd), T.provideSomeLayer(NodeFsLive), provideConsole, T.either, T.map((_) => _._tag === 'Left'
    ? { _tag: 'Error', error: _.left.toJSON() }
    : { _tag: 'Data', data: _.right }), T.tapCauseLogPretty, T.runPromise);
export const dynamicBuild = ({ config, verbose }) => pipe(T.gen(function* ($) {
    // TODO try to do this as generation-time in the future and come up with a serialization strategy for the `schemaDef`
    const schemaDef = yield* $(config.source.provideSchema(config.esbuildHash));
    const cache = yield* $(pipe(config.source.fetchData({ schemaDef, verbose, skipCachePersistence: true }), S.runHead, T.map(O.getUnsafe), T.chain((_) => T.fromEither(() => _))));
    return makeDataExportsFromCache({ cache, schemaDef, options: config.source.options });
}), OT.withSpan('@contentlayer/core/dynamicBuild'));
const makeDataExportsFromCache = ({ cache, schemaDef, options, }) => {
    const allCacheItems = Object.values(cache.cacheItemsMap);
    const allDocuments = allCacheItems.map((_) => _.document);
    const documentDefs = Object.values(schemaDef.documentTypeDefMap);
    const typeNameField = options.fieldOptions.typeFieldName;
    const restDataExports = Object.fromEntries(documentDefs.map((docDef) => {
        const dataVariableName = getDataVariableName({ docDef });
        const documents = allDocuments.filter((_) => _[typeNameField] === docDef.name);
        if (docDef.isSingleton) {
            return [dataVariableName, documents[0]];
        }
        else {
            return [dataVariableName, documents];
        }
    }));
    const dataExports = {
        allDocuments,
        ...restDataExports,
    };
    return dataExports;
};
//# sourceMappingURL=dynamic-build.js.map