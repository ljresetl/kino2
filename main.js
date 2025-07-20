async function loadPartial(id, url) {
  const container = document.getElementById(id);
  if (container) {
    const res = await fetch(url);
    const html = await res.text();
    container.innerHTML = html;
  }
}

loadPartial('header', './partials/header.html');
loadPartial('search-bar', './partials/search-bar-nav.html');
loadPartial('filters', './partials/filters.html');
loadPartial('movies-list', './partials/movies-list.html');
loadPartial('movies', './partials/movies.html');
loadPartial('block-new', './partials/block-new.html');
loadPartial('opis-kino', './partials/opis-kino-ua.html');
loadPartial('footer', './partials/footer.html');
