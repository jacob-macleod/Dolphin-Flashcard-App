export const defaultFieldOptions = {
    bodyFieldName: 'body',
    typeFieldName: 'type',
};
export const processArgs = async (argsOrArgsThunk, sourceKey) => {
    const { extensions, fieldOptions, markdown, mdx, date, disableImportAliasWarning, experimental, onSuccess, ...restArgs } = typeof argsOrArgsThunk === 'function' ? await argsOrArgsThunk(sourceKey) : argsOrArgsThunk;
    const options = {
        markdown,
        mdx,
        date,
        fieldOptions: {
            bodyFieldName: fieldOptions?.bodyFieldName ?? defaultFieldOptions.bodyFieldName,
            typeFieldName: fieldOptions?.typeFieldName ?? defaultFieldOptions.typeFieldName,
        },
        disableImportAliasWarning: disableImportAliasWarning ?? false,
        experimental: {
            enableDynamicBuild: experimental?.enableDynamicBuild ?? false,
        },
        onSuccess,
    };
    return { extensions: extensions ?? {}, options, restArgs };
};
//# sourceMappingURL=plugin.js.map