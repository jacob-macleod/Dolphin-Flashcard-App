// config-overrides.js
const fs = require("fs");
const path = require("path");

module.exports = function override(config, env) {
  // 1️⃣ Remove CRA's ModuleScopePlugin so imports outside src are allowed
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => plugin.constructor.name !== "ModuleScopePlugin"
  );

  // 2️⃣ Find the babel-loader rule
  const babelLoader = config.module.rules
    .find((rule) => Array.isArray(rule.oneOf))
    .oneOf.find(
      (rule) =>
        rule.loader &&
        rule.loader.includes("babel-loader") &&
        rule.include
    );

  // 3️⃣ Collect all symlinks inside frontend/src/*
  const srcPath = path.resolve(__dirname, "src");
  const extraIncludes = [];

  fs.readdirSync(srcPath).forEach((dir) => {
    const fullPath = path.join(srcPath, dir);
    try {
      const stats = fs.lstatSync(fullPath);
      if (stats.isSymbolicLink()) {
        const realPath = fs.realpathSync(fullPath);
        extraIncludes.push(realPath);
      }
    } catch (err) {
      // ignore errors (e.g. broken symlink)
    }
  });

  // 4️⃣ Extend babel-loader to include these symlinked real paths
  if (babelLoader) {
    babelLoader.include = [babelLoader.include, ...extraIncludes];
  }

  // 5️⃣ Ensure symlinks are followed
  config.resolve.symlinks = true;

  return config;
};
