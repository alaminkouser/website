import { formatDateUTC } from "../formatDateUTC.ts";
import { Page } from "../types/page.ts";
import { toPagePathFromSource } from "../utils/pagePath.ts";
import { compileTemplate } from "../utils/template.ts";

export async function buildHomePage(
  sourceRoot: string,
  publicRoot: string,
  pages: Page[],
): Promise<void> {
  const renderTemplate = await compileTemplate("./library/templates/home.handlebars");
  const pagesForHome = pages.map((page) => ({
    ...page,
    path: toPagePathFromSource(sourceRoot, page.path),
    dateFormatted: formatDateUTC(page.date),
    dateISO: page.date.toISOString().split("T")[0],
  })).sort((a, b) => b.date.getTime() - a.date.getTime());

  const html = renderTemplate({
    title: "DOCS",
    pages: pagesForHome,
  });

  await Deno.writeTextFile(`${publicRoot}/index.html`, html);
}
