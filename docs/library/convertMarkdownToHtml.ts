import { marked } from "@marked";
import { gfmHeadingId } from "@gfmHeadingId";
import Handlebars from "@handlebars";
import { formatDateUTC } from "./formatDateUTC.ts";

marked.use(gfmHeadingId());

type MarkdownToHtml = {
  title: string;
  body: string;
};

type ConvertMarkdownToHtml = {
  title: string;
  date: Date;
  body: string;
  keywords: Array<string>;
  template?: string;
};

export async function convertMarkdownToHtml(
  data: ConvertMarkdownToHtml,
): Promise<MarkdownToHtml> {
  const BODY = marked.parse(data.body);
  const TEMPLATE_RAW = await Deno.readTextFile(
    "./library/templates/index.handlebars",
  )
    .then((data) => {
      return data;
    })
    .catch((_) => {
      throw new Error("Failed to read home template.");
    });
  const TEMPLATE = Handlebars.compile(TEMPLATE_RAW);
  const HTML = TEMPLATE({
    title: data.title,
    dateFormatted: formatDateUTC(data.date),
    dateISO: data.date.toISOString().split("T")[0],
    body: BODY,
    keywords: data.keywords,
  });
  const body = HTML;

  return {
    title: data.title,
    body: body,
  };
}
