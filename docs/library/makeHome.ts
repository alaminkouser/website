import { Page } from "./Page.ts";
import { formatDateUTC } from "./formatDateUTC.ts";
import Handlebars from "@handlebars";

export async function makeHome(
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

  const PAGES_FOR_HOME = PAGES.map((page) => {
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
    title: "DOCS",
    pages: PAGES_FOR_HOME,
  });

  await Deno.writeTextFile(PUBLIC + "/index.html", HTML);

  return true;
}
