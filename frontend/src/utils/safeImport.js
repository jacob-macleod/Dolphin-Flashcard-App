// export function safeImport(path) {
//   try {
//     // require is synchronous, so this works for optional local files
//     return require(path).default || require(path);
//   } catch (err) {
//     console.log("Error importing module - the premium repository is likely not installed:", err);
//     if (err.code === "MODULE_NOT_FOUND") {
//       return null;
//     }
//     throw err; // rethrow unexpected errors
//   }
// }
export function safeImport(key) {
  try {
    return optionalModules[key]?.() ?? null;
  } catch (e) {
    return null;
  }
}