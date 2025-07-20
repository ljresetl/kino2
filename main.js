async function loadPartial(id, url) {
  const container = document.getElementById(id);
  if (container) {
    const res = await fetch(url);
    const html = await res.text();
    container.innerHTML = html;
  }
}

loadPartial('header', './header.html');
loadPartial('search-bar', './search-bar-nav.html');
loadPartial('filters', './filters.html');
loadPartial('movies-list', './movies-list.html');
loadPartial('movies', './movies.html');
loadPartial('block-new', './block-new.html');
loadPartial('opis-kino', './opis-kino-ua.html');
loadPartial('footer', './footer.html');
