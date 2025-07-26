// ✅ Список секцій для підвантаження
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

let loadedSections = 0;
const initialFilterNames = {};

async function loadPartial(id, url) {
  const container = document.getElementById(id);
  if (container) {
    const res = await fetch(url);
    const html = await res.text();
    container.innerHTML = html;

    if (id === 'header') initModal();
    if (id === 'filters') {
      initFilterModal();
      initApplyButton();
    }
    if (['movies-list', 'movies', 'block-new'].includes(id)) {
      initWatchButtons();
    }

    loadedSections++;

    if (loadedSections === sectionsToLoad.length) {
      initThemeToggle();
      initWatchButtons();

      // --- Відображати тільки короткий опис фільму, ховати повний ---
      const fullDesc = document.querySelector('.movie-description .full-desc');
      const shortDesc = document.querySelector('.movie-description .short-desc');
      if (fullDesc && shortDesc) {
        shortDesc.style.display = 'inline';
        fullDesc.style.display = 'none';
      }
    }
  }
}

// Запускаємо завантаження секцій
sectionsToLoad.forEach(([id, url]) => loadPartial(id, url));

function initModal() {
  const openBtn = document.getElementById('open-modal-btn');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('close-modal-btn');

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }
}

function initFilterModal() {
  const modal = document.getElementById('filter-modal');
  const closeBtn = document.getElementById('close-filter-modal');
  const modalTitle = document.getElementById('filter-modal-title');
  const modalOptions = document.getElementById('filter-modal-options');

  const filterItems = document.querySelectorAll('.filter-item');
  const filterToggles = document.querySelectorAll('.filter-toggle');

  if (!modal || !closeBtn || !modalTitle || !modalOptions) return;

  // Запамʼятовуємо початкові назви фільтрів
  filterItems.forEach(item => {
    const key = item.dataset.filter;
    const btn = item.querySelector('.filter-toggle');
    if (key && btn && !(key in initialFilterNames)) {
      initialFilterNames[key] = btn.textContent.trim();
    }
  });

  // Відкриваємо модалку при кліку на фільтр
  filterToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filterItem = btn.closest('.filter-item');
      if (!filterItem) return;

      const optionsList = filterItem.querySelectorAll('.filter-menu-li');
      if (optionsList.length === 0) return;

      modalOptions.innerHTML = '';
      modalTitle.textContent = btn.textContent.trim();

      optionsList.forEach((opt) => {
        const li = document.createElement('li');
        li.textContent = opt.textContent.trim();
        li.classList.add('filter-modal-option');
        modalOptions.appendChild(li);

        li.addEventListener('click', () => {
          btn.textContent = li.textContent;
          modal.classList.add('hidden');
        });
      });

      modal.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // Кнопка скидання фільтрів
  const resetBtn = document.getElementById('filters-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      filterItems.forEach(item => {
        const key = item.dataset.filter;
        const btn = item.querySelector('.filter-toggle');
        if (key && btn && initialFilterNames[key]) {
          btn.textContent = initialFilterNames[key];
        }
      });
      applyFilters();
    });
  }
}

function initApplyButton() {
  const applyBtn = document.querySelector('.apply-btn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      applyFilters();
    });
  }
}

function getFilterValue(filterName) {
  const filterItem = document.querySelector(`.filter-item[data-filter="${filterName}"]`);
  const toggle = filterItem?.querySelector('.filter-toggle');
  return toggle?.textContent?.trim().toLowerCase() || '';
}

function applyFilters() {
  const cards = document.querySelectorAll('.movies-list-movie-card');
  const noMoviesMsgs = document.querySelectorAll('.no-movies-msg');

  const selectedYear = getFilterValue('year');
  const selectedCountry = getFilterValue('country');
  const selectedGenre = getFilterValue('genre');
  const selectedDate = getFilterValue('date');

  const isAllYear = selectedYear === '' || selectedYear.includes('усі') || selectedYear === 'рік';
  const isAllCountry = selectedCountry === '' || selectedCountry.includes('усі') || selectedCountry === 'країна';
  const isAllGenre = selectedGenre === '' || selectedGenre.includes('усі') || selectedGenre === 'жанр';
  const isAllDate = selectedDate === '' || selectedDate.includes('усі') || selectedDate === 'дата';

  const noFiltersSelected = isAllYear && isAllCountry && isAllGenre && isAllDate;

  let anyVisible = false;

  cards.forEach(card => {
    if (noFiltersSelected) {
      card.style.display = '';
      anyVisible = true;
      return;
    }

    const year = card.dataset.year?.toLowerCase() || '';
    const country = card.dataset.country?.toLowerCase() || '';
    const genres = card.dataset.genre?.toLowerCase() || '';
    const date = card.dataset.date?.toLowerCase() || '';

    // genre може бути список через кому
    const genreList = genres.split(',').map(g => g.trim());

    const matchesYear = isAllYear || year === selectedYear;
    const matchesCountry = isAllCountry || country === selectedCountry;
    const matchesGenre = isAllGenre || genreList.includes(selectedGenre);
    const matchesDate = isAllDate || date === selectedDate;

    if (matchesYear && matchesCountry && matchesGenre && matchesDate) {
      card.style.display = '';
      anyVisible = true;
    } else {
      card.style.display = 'none';
    }
  });

  noMoviesMsgs.forEach(msg => {
    msg.style.display = anyVisible ? 'none' : '';
  });
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
