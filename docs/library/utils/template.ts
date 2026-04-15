import Handlebars from "@handlebars";

export async function compileTemplate(templatePath: string) {
  const rawTemplate = await Deno.readTextFile(templatePath).catch(() => {
    throw new Error(`Failed to read template: ${templatePath}`);
  });

  return Handlebars.compile(rawTemplate);
}
