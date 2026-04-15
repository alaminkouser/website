import { marked } from "@marked";
import { gfmHeadingId } from "@gfmHeadingId";
import { formatDateUTC } from "../formatDateUTC.ts";
import { compileTemplate } from "../utils/template.ts";

marked.use(gfmHeadingId());

type MarkdownPageData = {
  title: string;
  date: Date;
  body: string;
  keywords: string[];
  excerpt: string;
};

type MarkdownPageRenderResult = {
  title: string;
  body: string;
};

export async function renderMarkdownPage(
  data: MarkdownPageData,
): Promise<MarkdownPageRenderResult> {
  const renderTemplate = await compileTemplate("./library/templates/index.handlebars");
  const htmlBody = await marked.parse(data.body);
  const html = renderTemplate({
    title: data.title,
    dateFormatted: formatDateUTC(data.date),
    dateISO: data.date.toISOString().split("T")[0],
    body: htmlBody.replaceAll("{", "&#123;").replaceAll("}", "&#125;"),
    keywords: data.keywords,
    excerpt: data.excerpt,
  });

  return {
    title: data.title,
    body: html,
  };
}
