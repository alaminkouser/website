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
  const oneResult = await search.results[0].data();
  console.log(oneResult);
});

