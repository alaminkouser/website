import { formatDateUTC } from "../formatDateUTC.ts";
import { Page } from "../types/page.ts";
import { toPagePathFromSource } from "../utils/pagePath.ts";
import { compileTemplate } from "../utils/template.ts";

export async function buildKeywordPages(
  sourceRoot: string,
  publicRoot: string,
  pages: Page[],
): Promise<void> {
  const renderTemplate = await compileTemplate(
    "./library/templates/home.handlebars",
  );
  const allKeywords = Array.from(
    pages.reduce((acc: Set<string>, page) => {
      page.keywords.forEach((keyword) => acc.add(keyword));
      return acc;
    }, new Set<string>()),
  ).sort();

  for (const keyword of allKeywords) {
    const pagesForKeyword = pages
      .filter((page) => page.keywords.includes(keyword))
      .map((page) => ({
        ...page,
        path: toPagePathFromSource(sourceRoot, page.path),
        dateFormatted: formatDateUTC(page.date),
        dateISO: page.date.toISOString().split("T")[0],
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    const html = renderTemplate({
      title: `KEYWORD: ${keyword}`,
      pages: pagesForKeyword,
    });

    await Deno.mkdir(`${publicRoot}/keywords/${keyword}`, { recursive: true });
    await Deno.writeTextFile(
      `${publicRoot}/keywords/${keyword}/index.html`,
      html,
    );
  }
}
