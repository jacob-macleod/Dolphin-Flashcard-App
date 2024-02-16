"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bundleMDX = bundleMDX;
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _string_decoder = require("string_decoder");
var _remarkMdxFrontmatter = require("remark-mdx-frontmatter");
var _grayMatter = _interopRequireDefault(require("gray-matter"));
var esbuild = _interopRequireWildcard(require("esbuild"));
var _nodeResolve = require("@esbuild-plugins/node-resolve");
var _esbuildPluginGlobalExternals = require("@fal-works/esbuild-plugin-global-externals");
var _uuid = require("uuid");
var _dirnameMessedUp = _interopRequireDefault(require("./dirname-messed-up.cjs"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const {
  readFile,
  unlink
} = _fs.default.promises;

/**
 * @template {{[key: string]: any}} Frontmatter
 * @param {import('./types').BundleMDX<Frontmatter>} options
 * @returns
 */
async function bundleMDX({
  file,
  source,
  files = {},
  mdxOptions = options => options,
  esbuildOptions = options => options,
  globals = {},
  cwd = _path.default.join(process.cwd(), `__mdx_bundler_fake_dir__`),
  grayMatterOptions = options => options,
  bundleDirectory,
  bundlePath
}) {
  /* c8 ignore start */
  if (_dirnameMessedUp.default && !process.env.ESBUILD_BINARY_PATH) {
    console.warn(`mdx-bundler warning: esbuild maybe unable to find its binary, if your build fails you'll need to set ESBUILD_BINARY_PATH. Learn more: https://github.com/kentcdodds/mdx-bundler/blob/main/README.md#nextjs-esbuild-enoent`);
  }
  /* c8 ignore stop */

  // @mdx-js/esbuild is a native ESM, and we're running in a CJS context. This is the
  // only way to import ESM within CJS
  const [{
    default: mdxESBuild
  }, {
    default: remarkFrontmatter
  }] = await Promise.all([import('@mdx-js/esbuild'), import('remark-frontmatter')]);
  let /** @type string */code, /** @type string */entryPath, /** @type Omit<grayMatter.GrayMatterFile<string>, "data"> & {data: Frontmatter} */matter;

  /** @type Record<string, string> */
  const absoluteFiles = {};
  const isWriting = typeof bundleDirectory === 'string';
  if (typeof bundleDirectory !== typeof bundlePath) {
    throw new Error('When using `bundleDirectory` or `bundlePath` the other must be set.');
  }

  /** @type {(vfile: unknown) => vfile is import('vfile').VFile} */
  function isVFile(vfile) {
    return typeof vfile === 'object' && vfile !== null && 'value' in vfile;
  }
  if (typeof source === 'string') {
    // The user has supplied MDX source.
    /** @type any */ // Slight type hack to get the graymatter front matter typed correctly.
    const gMatter = (0, _grayMatter.default)(source, grayMatterOptions({}));
    matter = gMatter;
    entryPath = _path.default.join(cwd, `./_mdx_bundler_entry_point-${(0, _uuid.v4)()}.mdx`);
    absoluteFiles[entryPath] = source;
  } else if (isVFile(source)) {
    const value = String(source.value);
    /** @type any */ // Slight type hack to get the graymatter front matter typed correctly.
    const gMatter = (0, _grayMatter.default)(value, grayMatterOptions({}));
    matter = gMatter;
    entryPath = source.path ? _path.default.isAbsolute(source.path) ? source.path : _path.default.join(source.cwd, source.path) : _path.default.join(cwd, `./_mdx_bundler_entry_point-${(0, _uuid.v4)()}.mdx`);
    absoluteFiles[entryPath] = value;
  } else if (typeof file === 'string') {
    // The user has supplied a file.
    /** @type any */ // Slight type hack to get the graymatter front matter typed correctly.
    const gMatter = _grayMatter.default.read(file, grayMatterOptions({}));
    matter = gMatter;
    entryPath = file;
    /* c8 ignore start */
  } else {
    // The user supplied neither file or source.
    // The typings should prevent reaching this point.
    // It is ignored from coverage as the tests wouldn't run in a way that can get here.
    throw new Error('`source` or `file` must be defined');
  }
  /* c8 ignore end*/

  for (const [filepath, fileCode] of Object.entries(files)) {
    absoluteFiles[_path.default.join(cwd, filepath)] = fileCode;
  }

  /** @type import('esbuild').Plugin */
  const inMemoryPlugin = {
    name: 'inMemory',
    setup(build) {
      build.onResolve({
        filter: /.*/
      }, ({
        path: filePath,
        importer
      }) => {
        if (filePath === entryPath) {
          return {
            path: filePath,
            pluginData: {
              inMemory: true,
              contents: absoluteFiles[filePath]
            }
          };
        }
        const modulePath = _path.default.resolve(_path.default.dirname(importer), filePath);
        if (modulePath in absoluteFiles) {
          return {
            path: modulePath,
            pluginData: {
              inMemory: true,
              contents: absoluteFiles[modulePath]
            }
          };
        }
        for (const ext of ['.js', '.ts', '.jsx', '.tsx', '.json', '.mdx']) {
          const fullModulePath = `${modulePath}${ext}`;
          if (fullModulePath in absoluteFiles) {
            return {
              path: fullModulePath,
              pluginData: {
                inMemory: true,
                contents: absoluteFiles[fullModulePath]
              }
            };
          }
        }

        // Return an empty object so that esbuild will handle resolving the file itself.
        return {};
      });
      build.onLoad({
        filter: /.*/
      }, async ({
        path: filePath,
        pluginData
      }) => {
        if (pluginData === undefined || !pluginData.inMemory) {
          // Return an empty object so that esbuild will load & parse the file contents itself.
          return null;
        }

        // the || .js allows people to exclude a file extension
        const fileType = (_path.default.extname(filePath) || '.jsx').slice(1);
        const contents = absoluteFiles[filePath];
        if (fileType === 'mdx') return null;

        /** @type import('esbuild').Loader */
        let loader;
        if (build.initialOptions.loader && build.initialOptions.loader[`.${fileType}`]) {
          loader = build.initialOptions.loader[`.${fileType}`];
        } else {
          loader = /** @type import('esbuild').Loader */fileType;
        }
        return {
          contents,
          loader
        };
      });
    }
  };
  const buildOptions = esbuildOptions({
    entryPoints: [entryPath],
    write: isWriting,
    outdir: isWriting ? bundleDirectory : undefined,
    publicPath: isWriting ? bundlePath : undefined,
    absWorkingDir: cwd,
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    },
    plugins: [(0, _esbuildPluginGlobalExternals.globalExternals)({
      ...globals,
      react: {
        varName: 'React',
        type: 'cjs'
      },
      'react-dom': {
        varName: 'ReactDOM',
        type: 'cjs'
      },
      'react/jsx-runtime': {
        varName: '_jsx_runtime',
        type: 'cjs'
      }
    }),
    // eslint-disable-next-line @babel/new-cap
    (0, _nodeResolve.NodeResolvePlugin)({
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      resolveOptions: {
        basedir: cwd
      }
    }), inMemoryPlugin, mdxESBuild(mdxOptions({
      remarkPlugins: [remarkFrontmatter, [_remarkMdxFrontmatter.remarkMdxFrontmatter, {
        name: 'frontmatter'
      }]]
    }, matter.data))],
    bundle: true,
    format: 'iife',
    globalName: 'Component',
    minify: true
  }, matter.data);
  const bundled = await esbuild.build(buildOptions);
  if (bundled.outputFiles) {
    const decoder = new _string_decoder.StringDecoder('utf8');
    code = decoder.write(Buffer.from(bundled.outputFiles[0].contents));
  } else if (buildOptions.outdir && buildOptions.write) {
    // We know that this has to be an array of entry point strings, with a single entry
    const entryFile = /** @type {{entryPoints: string[]}} */buildOptions.entryPoints[0];
    const fileName = _path.default.basename(entryFile).replace(/\.[^/.]+$/, '.js');
    code = (await readFile(_path.default.join(buildOptions.outdir, fileName))).toString();
    await unlink(_path.default.join(buildOptions.outdir, fileName));
  } else {
    throw new Error("You must either specify `write: false` or `write: true` and `outdir: '/path'` in your esbuild options");
  }
  return {
    code: `${code};return Component;`,
    frontmatter: matter.data,
    errors: bundled.errors,
    matter
  };
}