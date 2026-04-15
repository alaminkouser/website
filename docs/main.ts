import { buildHomePage } from "./library/builders/homePageBuilder.ts";
import { buildKeywordPages } from "./library/builders/keywordPagesBuilder.ts";
import { preparePublicDirectory } from "./library/fileSystem/preparePublicDirectory.ts";
import { sourceProcessor } from "./library/processors/sourceProcessor.ts";

const SOURCE = "./source";
const PUBLIC = "./public";
const TASK_NAME = Deno.env.get("TASK_NAME");

if (TASK_NAME === "preparePublicDirectory") {
  await preparePublicDirectory(PUBLIC);
}

if (TASK_NAME === "pagefind") {
  await sourceProcessor(SOURCE, PUBLIC, "pagefind");
}

if (TASK_NAME === "docs") {
  const pages = await sourceProcessor(SOURCE, PUBLIC, "docs");
  await buildHomePage(SOURCE, PUBLIC, pages);
  await buildKeywordPages(SOURCE, PUBLIC, pages);
}
