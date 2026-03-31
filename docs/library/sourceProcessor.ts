import { listFilesRecursively } from "./listFilesRecursively.ts";
import * as matter from "@gray-matter";
import { convertMarkdownToHtml } from "./convertMarkdownToHtml.ts";
import * as pagefind from "@pagefind";
import { Page } from "./Page.ts";
import { pagefindHTMLMaker } from "./pagefindHTMLMaker.ts";

export async function sourceProcessor(
  source: string,
  destination: string,
): Promise<Array<Page>> {
  const SOURCE_FILE_LIST = await listFilesRecursively(source)
    .then((list) => {
      return list;
    })
    .catch((_) => {
      return [];
    });
  const pages: Array<Page> = [];
  const { index } = await pagefind.createIndex();
  for (let i = 0; i < SOURCE_FILE_LIST.length; i++) {
    const file = SOURCE_FILE_LIST[i];
    await Deno.mkdir(
      file
        .replace(source, destination)
        .substring(0, file.replace(source, destination).lastIndexOf("/")),
      { recursive: true },
    );
    if (file.endsWith(".md")) {
      const MD_RAW = await Deno.readTextFile(file);
      const afterMatter = matter.default(MD_RAW, {
        excerpt: true,
      });

      // Check if the markdown file contains a title in the front matter
      if (!afterMatter.data.title) {
        throw new Error(
          "Markdown file must contain a title. Please add a title to the markdown file." +
            "\nFile: " +
            file,
        );
      }

      // Check if the markdown file contains a date in the front matter
      if (!afterMatter.data.date) {
        throw new Error(
          "Markdown file must contain a date. Please add a date to the markdown file." +
            "\nFile: " +
            file,
        );
      }

      // Check if the markdown file contains a valid date in the front matter
      if (
        !(afterMatter.data.date instanceof Date) ||
        isNaN(afterMatter.data.date.getTime())
      ) {
        throw new Error(
          "Markdown file must contain a valid date. Please add a valid date to the markdown file." +
            "\nFile: " +
            file,
        );
      }

      // Check if the markdown file contains an excerpt in the front matter
      if (afterMatter.excerpt === undefined || afterMatter.excerpt === "") {
        throw new Error(
          "Markdown file must contain an excerpt. Please add an excerpt to the markdown file." +
            "\nFile: " +
            file,
        );
      }

      // Check if the markdown file contains keywords in the front matter
      if (!Array.isArray(afterMatter.data.keywords)) {
        throw new Error(
          "Markdown file must contain keywords. Please add keywords to the markdown file." +
            "\nThe keywords must be an array of strings." +
            "\nFile: " +
            file,
        );
      }

      let mdBody = afterMatter.content.trim();

      const EXCERPT: string = afterMatter.excerpt?.trim();
      const CONTENT_WITHOUT_EXCERPT: string = afterMatter.content
        .replace(EXCERPT + "\n\n---", "")
        .trim();
      mdBody = EXCERPT + "\n\n" + CONTENT_WITHOUT_EXCERPT;

      if (Deno.env.get("TASK_NAME") === "docs") {
        const markdownToHtml = await convertMarkdownToHtml({
          title: afterMatter.data.title,
          date: afterMatter.data.date,
          body: mdBody,
          keywords: afterMatter.data.keywords,
        });
        await Deno.writeTextFile(
          file.replace(source, destination).replace(/\.md$/, ".html"),
          markdownToHtml.body,
        );
        pages.push({
          title: markdownToHtml.title,
          path: file,
          excerpt: EXCERPT,
          date: afterMatter.data.date,
          keywords: afterMatter.data.keywords,
        });
      }

      if (Deno.env.get("TASK_NAME") === "pagefind") {
        const PAGEFIND_HTML = await pagefindHTMLMaker(
          afterMatter.data.title,
          mdBody,
        );
        await index!.addHTMLFile({
          url: (file.endsWith("index.md")
            ? file.slice(0, file.lastIndexOf("/") + 1)
            : file
          ).replace(source, ""),
          content: PAGEFIND_HTML,
        });
      }
    } else {
      if (Deno.env.get("TASK_NAME") === "docs") {
        await Deno.copyFile(file, file.replace(source, destination));
      }
    }
  }
  if (Deno.env.get("TASK_NAME") === "pagefind") {
    await index!.writeFiles({
      outputPath: destination + "/pagefind",
    });
  }

  await pagefind.close();
  return pages;
}
