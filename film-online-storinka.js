const sectionsToLoad = [
  ['header', './header.html'],
  ['search-bar', './search-bar-nav.html'],
  ['filters', './filters.html'],
  ['movies-list', './movies-list.html'],
  ['movies', './movies.html'],
  ['block-new', './block-new.html'],
  ['opis-kino', './opis-kino-ua.html'],
  ['footer', './footer.html'],
];

let loaded = 0;

sectionsToLoad.forEach(([id, url]) => {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById(id);
      if (container) container.innerHTML = html;

      loaded++;
      if (loaded === sectionsToLoad.length) {
        filterToSingleMovie();
        initWatchButtons();
        initThemeToggle();
      }
    });
});

function getMovieIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function filterToSingleMovie() {
  const movieId = getMovieIdFromUrl();
  if (!movieId) return;

  const cards = document.querySelectorAll('.movies-list-movie-card');
  cards.forEach(card => {
    const id = card.dataset.id;
    if (id !== movieId) {
      card.remove();
    } else {
      // Прибираємо кнопку "Дивитись онлайн"
      const btn = card.querySelector('.btn-online');
      if (btn) btn.remove();

      // Додаємо плеєр під картку
      const player = document.createElement('div');
      player.innerHTML = `
        <div class="movie-player" style="margin-top: 30px;">
          <h2>🎬 Перегляд фільму онлайн</h2>
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Movie Player"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      `;
      card.after(player);
    }
  });

  // Видаляємо повідомлення "Фільм не знайдено" і пагінацію
  document.querySelectorAll('.no-movies-msg, .pagination').forEach(el => el.remove());
}

function initWatchButtons() {
  document.querySelectorAll('.btn-online').forEach(button => {
    button.addEventListener('click', () => {
      const movieId = button.dataset.movieId;
      if (movieId) {
        window.location.href = `film-online-storinka.html?id=${movieId}`;
      }
    });
  });
}

function initThemeToggle() {
  const toggleButtons = document.querySelectorAll('.theme-toggle, .theme-toggle-deskopt');
  if (!toggleButtons.length) return;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    toggleButtons.forEach((b) => (b.textContent = '☀️'));
  } else {
    toggleButtons.forEach((b) => (b.textContent = '🌙'));
  }

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      const icon = isLight ? '☀️' : '🌙';
      toggleButtons.forEach((b) => (b.textContent = icon));
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  });
}
