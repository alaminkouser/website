import { Page } from "../types/page.ts";
import { toPagePathFromSource } from "../utils/pagePath.ts";

function trimTrailingSlash(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function ensureLeadingSlash(value: string): string {
  return value.startsWith("/") ? value : `/${value}`;
}

function normalizeDocsBasePath(value: string): string {
  const trimmed = value.trim();
  if (trimmed === "" || trimmed === "/") return "";
  return trimTrailingSlash(ensureLeadingSlash(trimmed));
}

function buildAbsoluteUrl(
  siteUrl: string,
  docsBasePath: string,
  pagePath: string,
): string {
  const normalizedSiteUrl = trimTrailingSlash(siteUrl.trim());
  const normalizedPagePath = pagePath.startsWith("/")
    ? pagePath
    : `/${pagePath}`;
  return `${normalizedSiteUrl}${docsBasePath}${normalizedPagePath}`;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function buildSitemap(
  sourceRoot: string,
  publicRoot: string,
  pages: Page[],
): Promise<void> {
  const siteUrl = Deno.env.get("SITE_URL") ?? "https://alaminkouser.com";
  const docsBasePath = normalizeDocsBasePath(
    Deno.env.get("DOCS_BASE_PATH") ?? "/docs",
  );
  const normalizedSiteUrl = trimTrailingSlash(siteUrl.trim());

  const urlSet = new Set<string>();
  urlSet.add(buildAbsoluteUrl(siteUrl, docsBasePath, "/"));
  urlSet.add(`${normalizedSiteUrl}/`);
  urlSet.add(`${normalizedSiteUrl}/status/`);
  urlSet.add(`${normalizedSiteUrl}/search/`);
  urlSet.add(`${normalizedSiteUrl}/privacy/`);

  const keywords = new Set<string>();
  for (const page of pages) {
    const pagePath = toPagePathFromSource(sourceRoot, page.path);
    urlSet.add(buildAbsoluteUrl(siteUrl, docsBasePath, pagePath));
    page.keywords.forEach((keyword) => keywords.add(keyword));
  }

  for (const keyword of keywords) {
    urlSet.add(
      buildAbsoluteUrl(siteUrl, docsBasePath, `/keywords/${keyword}/`),
    );
  }

  const body = Array.from(urlSet)
    .sort((a, b) => a.localeCompare(b))
    .map((url) => {
      return `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`;
    })
    .join("\n");

  const sitemapXml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</urlset>\n`;

  await Deno.writeTextFile(`${publicRoot}/sitemap.xml`, sitemapXml);
}
