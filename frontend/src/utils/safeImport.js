export function safeImport(path) {
  try {
    // require is synchronous, so this works for optional local files
    return require(path).default || require(path);
  } catch (err) {
    alert(err);
    if (err.code === "MODULE_NOT_FOUND") {
      return null;
    }
    throw err; // rethrow unexpected errors
  }
}
