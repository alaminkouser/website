export function toPagePathFromSource(
  sourceRoot: string,
  rawPath: string,
): string {
  const path = rawPath.startsWith(sourceRoot)
    ? rawPath.replace(sourceRoot, "")
    : rawPath;

  return path.endsWith("index.md")
    ? path.slice(0, path.lastIndexOf("/") + 1)
    : path;
}
