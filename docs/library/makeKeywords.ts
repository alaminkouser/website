import { Page } from "./Page.ts";
import { formatDateUTC } from "./formatDateUTC.ts";
import Handlebars from "@handlebars";

export async function makeKeywords(
  SOURCE: string,
  PUBLIC: string,
  PAGES: Array<Page>,
): Promise<boolean> {
  const TEMPLATE_RAW = await Deno.readTextFile(
    "./library/templates/home.handlebars",
  )
    .then((data) => {
      return data;
    })
    .catch((_) => {
      throw new Error("Failed to read home template.");
    });

  const ALL_KEYWORDS = Array.from(
    PAGES.reduce((acc: Set<string>, page) => {
      page.keywords.forEach((keyword) => acc.add(keyword));
      return acc;
    }, new Set<string>()),
  ).sort();

  for (const keyword of ALL_KEYWORDS) {
    const PAGES_FOR_KEYWORD = PAGES.filter((page) =>
      page.keywords.includes(keyword),
    );

    const PAGES_FOR_HOME = PAGES_FOR_KEYWORD.map((page) => {
      const path = page.path.startsWith(SOURCE)
        ? page.path.replace(SOURCE, "")
        : page.path;

      return {
        ...page,
        path: path.endsWith("index.md")
          ? path.slice(0, path.lastIndexOf("/") + 1)
          : path,
        dateFormatted: formatDateUTC(page.date),
        dateISO: page.date.toISOString().split("T")[0],
      };
    }).sort((a, b) => b.date.getTime() - a.date.getTime());

    const TEMPLATE = Handlebars.compile(TEMPLATE_RAW);
    const HTML = TEMPLATE({
      title: `KEYWORD: ${keyword}`,
      pages: PAGES_FOR_HOME,
    });
    await Deno.mkdir(PUBLIC + "/keywords/" + keyword, { recursive: true });
    await Deno.writeTextFile(
      PUBLIC + "/keywords/" + keyword + "/index.html",
      HTML,
    );
  }

  return true;
}
