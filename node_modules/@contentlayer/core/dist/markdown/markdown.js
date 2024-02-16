import { errorToString } from '@contentlayer/utils';
import { OT, pipe, T, Tagged } from '@contentlayer/utils/effect';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { unified } from 'unified';
import { addRawDocumentToVFile } from './unified.js';
export const markdownToHtml = ({ mdString, options, rawDocumentData, }) => pipe(T.gen(function* ($) {
    // const matterResult = matter(mdString)
    // Use remark to convert markdown into HTML string
    // const processedContent = await remark().use(html).process(matterResult.content)
    if (process.env['CL_FAST_MARKDOWN']) {
        // NOTE `markdown-wasm` is an optional peer dependency
        return yield* $(T.tryPromise(async () => {
            const { parse: parseWasm } = await import('markdown-wasm/dist/markdown.node.js');
            return parseWasm(mdString);
        }));
    }
    const builder = unified();
    builder.use(addRawDocumentToVFile(rawDocumentData));
    // If the user has provided a unified builder callback, use it instead of the default plugins
    if (typeof options === 'function') {
        options(builder);
    }
    else {
        // parses out the frontmatter (which is needed for full-document parsing)
        builder.use(remarkFrontmatter);
        // parse markdown
        builder.use(remarkParse);
        if (options?.remarkPlugins) {
            builder.use(options.remarkPlugins);
        }
        builder.use(remark2rehype);
        if (options?.rehypePlugins) {
            builder.use(options.rehypePlugins);
        }
        // rehype to html
        builder.use(rehypeStringify);
    }
    const res = yield* $(T.tryPromise(() => builder.process(mdString)));
    return res.toString();
}), T.catchAllDefect(T.fail), T.mapError((error) => new UnexpectedMarkdownError({ error })), OT.withSpan('@contentlayer/core/markdown:markdownToHtml'));
export class UnexpectedMarkdownError extends Tagged('UnexpectedMarkdownError') {
    constructor() {
        super(...arguments);
        this.toString = () => `UnexpectedMarkdownError: ${errorToString(this.error)}`;
    }
}
//# sourceMappingURL=markdown.js.map