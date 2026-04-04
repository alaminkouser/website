import { marked } from "@marked";
import { gfmHeadingId } from "@gfmHeadingId";
import Handlebars from "@handlebars";

export async function pagefindHTMLMaker(
  title: string,
  body: string,
  keywords: Array<string>,
): Promise<string> {
  const TEMPLATE_RAW = await Deno.readTextFile(
    "./library/templates/pagefind.handlebars",
  );
  marked.use(gfmHeadingId());
  const TEMPLATE = Handlebars.compile(TEMPLATE_RAW);
  const HTML = TEMPLATE({
    title: title,
    body: marked.parse(body),
    keywords: keywords.join("|"),
  });
  return HTML;
}
