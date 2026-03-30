const PF = await import("/docs/pagefind/pagefind.js");
const INPUT = document.querySelector("#search");
const RESULTS = document.querySelector("#results");

PF.init();

INPUT.addEventListener("input", async (e) => {
  const KEY = e.target.value;
  RESULTS.innerHTML = "";
  RESULTS.classList.add("loading");
  if (KEY === "") return;
  const search = await PF.search(KEY);
  const results = await Promise.all(
    search.results.slice(0, 5).map((r) => r.data()),
  );
  
  RESULTS.classList.remove("loading");
  RESULTS.innerHTML = results
    .map(
      (result) => `
    <div class="result-group">
      <h2><a href="${result.url}">${result.meta.title}</a></h2>
      <div class="sub-results">
        ${result.sub_results
          .map(
            (sub) => `
          <div class="result-item">
            <h3><a href="${sub.url}">${sub.title}</a></h3>
            <p>${sub.excerpt}</p>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `,
    )
    .join("");
});
