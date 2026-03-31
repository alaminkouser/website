import { preparePublicDirectory } from "./library/preparePublicDirectory.ts";
import { sourceProcessor } from "./library/sourceProcessor.ts";
import { makeHome } from "./library/makeHome.ts";
import { makeKeywords } from "./library/makeKeywords.ts";

const SOURCE = "./source";
const PUBLIC = "./public";

if (Deno.env.get("TASK_NAME") === "preparePublicDirectory") {
  await preparePublicDirectory(PUBLIC);
}

const PAGES = await sourceProcessor(SOURCE, PUBLIC);

await makeHome(SOURCE, PUBLIC, PAGES);

await makeKeywords(SOURCE, PUBLIC, PAGES);
