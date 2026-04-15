import * as matter from "@gray-matter";
import * as pagefind from "@pagefind";
import { listFilesRecursively } from "../fileSystem/listFilesRecursively.ts";
import { renderMarkdownPage } from "../renderers/markdownPageRenderer.ts";
import { renderPagefindDocument } from "../renderers/pagefindDocumentRenderer.ts";
import { Page } from "../types/page.ts";

type TaskName = "docs" | "pagefind";

export async function sourceProcessor(
  sourceRoot: string,
  destinationRoot: string,
  taskName: TaskName,
): Promise<Page[]> {
  const sourceFileList = await listFilesRecursively(sourceRoot).catch(() => []);
  const pages: Page[] = [];
  const { index } = await pagefind.createIndex();

  for (const file of sourceFileList) {
    if (taskName === "docs") {
      const destinationDirectory = file
        .replace(sourceRoot, destinationRoot)
        .substring(0, file.replace(sourceRoot, destinationRoot).lastIndexOf("/"));
      await Deno.mkdir(destinationDirectory, { recursive: true });
    }

    if (!file.endsWith(".md")) {
      if (taskName === "docs") {
        await Deno.copyFile(file, file.replace(sourceRoot, destinationRoot));
      }
      continue;
    }

    const markdownRaw = await Deno.readTextFile(file);
    const parsed = matter.default(markdownRaw, { excerpt: true });
    validateMarkdownFrontMatter(file, parsed);

    const excerpt = parsed.excerpt?.trim();
    if (!excerpt) {
      throw new Error(
        "Markdown file must contain an excerpt. Please add an excerpt to the markdown file." +
          `\nFile: ${file}`,
      );
    }
    const contentWithoutExcerpt = parsed.content.replace(`${excerpt}\n\n---`, "").trim();
    const markdownBody = `${excerpt}\n\n${contentWithoutExcerpt}`;

    if (taskName === "docs") {
      const markdownToHtml = await renderMarkdownPage({
        title: parsed.data.title,
        date: parsed.data.date,
        body: markdownBody,
        keywords: parsed.data.keywords,
        excerpt,
      });

      await Deno.writeTextFile(
        file.replace(sourceRoot, destinationRoot).replace(/\.md$/, ".html"),
        markdownToHtml.body,
      );

      pages.push({
        title: markdownToHtml.title,
        path: file,
        excerpt,
        date: parsed.data.date,
        keywords: parsed.data.keywords,
      });
    }

    if (taskName === "pagefind") {
      const pagefindHtml = await renderPagefindDocument(
        parsed.data.title,
        markdownBody,
        parsed.data.keywords,
      );
      await index!.addHTMLFile({
        url: (file.endsWith("index.md")
          ? file.slice(0, file.lastIndexOf("/") + 1)
          : file
        ).replace(sourceRoot, ""),
        content: pagefindHtml,
      });
    }
  }

  if (taskName === "pagefind") {
    await index!.writeFiles({
      outputPath: `${destinationRoot}/pagefind`,
    });
  }

  await pagefind.close();
  return pages;
}

function validateMarkdownFrontMatter(filePath: string, parsed: matter.GrayMatterFile<string>) {
  if (!parsed.data.title) {
    throw new Error(
      "Markdown file must contain a title. Please add a title to the markdown file." +
        `\nFile: ${filePath}`,
    );
  }

  if (!parsed.data.date) {
    throw new Error(
      "Markdown file must contain a date. Please add a date to the markdown file." +
        `\nFile: ${filePath}`,
    );
  }

  if (!(parsed.data.date instanceof Date) || isNaN(parsed.data.date.getTime())) {
    throw new Error(
      "Markdown file must contain a valid date. Please add a valid date to the markdown file." +
        `\nFile: ${filePath}`,
    );
  }

  if (parsed.excerpt === undefined || parsed.excerpt === "") {
    throw new Error(
      "Markdown file must contain an excerpt. Please add an excerpt to the markdown file." +
        `\nFile: ${filePath}`,
    );
  }

  if (!Array.isArray(parsed.data.keywords)) {
    throw new Error(
      "Markdown file must contain keywords. Please add keywords to the markdown file." +
        "\nThe keywords must be an array of strings." +
        `\nFile: ${filePath}`,
    );
  }
}
