export async function preparePublicDirectory(path: string): Promise<void> {
  try {
    const stat = await Deno.stat(path).catch(() => null);

    if (!stat || !stat.isDirectory) {
      await Deno.mkdir(path, { recursive: true });
      return;
    }

    for await (const entry of Deno.readDir(path)) {
      const entryPath = `${path}/${entry.name}`;
      if (entry.isFile || entry.isSymlink) {
        await Deno.remove(entryPath);
      } else if (entry.isDirectory) {
        await Deno.remove(entryPath, { recursive: true });
      }
    }
  } catch (error) {
    console.error("Error preparing build directory:", error);
    throw error;
  }
}
