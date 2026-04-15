export async function listFilesRecursively(directory: string): Promise<string[]> {
  const files: string[] = [];

  for await (const entry of Deno.readDir(directory)) {
    const fullPath = `${directory}/${entry.name}`;

    if (entry.isDirectory) {
      const subDirectoryFiles = await listFilesRecursively(fullPath);
      files.push(...subDirectoryFiles);
      continue;
    }

    if (entry.isFile) {
      files.push(fullPath);
      continue;
    }

    console.warn(`WARNING: ${fullPath} is not a file or directory.`);
  }

  return files;
}
