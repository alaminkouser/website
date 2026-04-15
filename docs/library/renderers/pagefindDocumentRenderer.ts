import { marked } from "@marked";
import { gfmHeadingId } from "@gfmHeadingId";
import { compileTemplate } from "../utils/template.ts";

marked.use(gfmHeadingId());

export async function renderPagefindDocument(
  title: string,
  body: string,
  keywords: string[],
): Promise<string> {
  const renderTemplate = await compileTemplate("./library/templates/pagefind.handlebars");

  return renderTemplate({
    title,
    body: marked.parse(body),
    keywords: keywords.join("|"),
  });
}
