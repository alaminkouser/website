const PF = await import("/docs/pagefind/pagefind.js");
const INPUT = document.querySelector("#search");
const RESULTS = document.querySelector("#results");

await PF.options({
  metaCacheTag: "0",
});

async function search(KEY) {
  const search = await PF.search(KEY);
  const results = await Promise.all(
    search.results.slice(0, 5).map((r) => r.data()),
  );
  return results;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

await PF.init().then(() => {
  INPUT.style.display = "block";
  RESULTS.classList.remove("loading");
  INPUT.focus();
  INPUT.addEventListener("input", async (e) => {
    const KEY = e.target.value;
    RESULTS.innerHTML = "";
    RESULTS.classList.add("loading");
    if (KEY === "") {
      RESULTS.classList.remove("loading");
      return;
    }

    const [_, results] = await Promise.all([delay(250), search(KEY)]);

    RESULTS.classList.remove("loading");
    if (KEY !== INPUT.value) {
      return;
    }

    if (results.length === 0) {
      const NOT_FOUND = document.createElement("pre");
      NOT_FOUND.textContent = "\n\n¯\\_(ツ)_/¯";
      RESULTS.appendChild(NOT_FOUND);
      return;
    }

    results.forEach((result) => {
      const TITLE = document.createElement("h2");

      const TITLE_LINK = document.createElement("a");
      TITLE_LINK.href = result.url;
      TITLE_LINK.textContent = result.meta.title;

      TITLE.appendChild(TITLE_LINK);

      RESULTS.appendChild(TITLE);

      const EXCERPT = document.createElement("p");
      EXCERPT.innerHTML = result.excerpt;
      RESULTS.appendChild(EXCERPT);

      const KEYWORDS = result.meta.keywords.split("|");
      const KEYWORDS_P = document.createElement("p");
      KEYWORDS_P.classList.add("keywords");
      KEYWORDS.forEach((keyword, index) => {
        const KEYWORD_SPAN = document.createElement("span");
        const KEYWORD_ANCHOR = document.createElement("a");
        KEYWORD_ANCHOR.href = "/docs/keywords/" + keyword + "/";
        KEYWORD_ANCHOR.textContent = keyword;
        KEYWORD_SPAN.appendChild(KEYWORD_ANCHOR);
        KEYWORDS_P.appendChild(KEYWORD_SPAN);
        if (KEYWORDS.length > index + 1) {
          KEYWORDS_P.appendChild(document.createTextNode(", "));
        }
      });
      RESULTS.appendChild(KEYWORDS_P);

      const SUB_DIV = document.createElement("div");
      result.sub_results.forEach((sub) => {
        SUB_DIV.classList.add("left-line");

        const SUB_TITLE = document.createElement("h3");

        const SUB_TITLE_LINK = document.createElement("a");
        SUB_TITLE_LINK.href = sub.url;
        SUB_TITLE_LINK.textContent = sub.title;
        SUB_TITLE.appendChild(SUB_TITLE_LINK);
        SUB_DIV.appendChild(SUB_TITLE);

        const SUB_EXCERPT = document.createElement("p");

        SUB_EXCERPT.innerHTML = sub.excerpt;
        SUB_DIV.appendChild(SUB_EXCERPT);
      });
      RESULTS.appendChild(SUB_DIV);
    });
  });
});
