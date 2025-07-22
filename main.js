// ✅ Список секцій, які підвантажуються
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

// ✅ Початкові назви фільтрів (щоб можна було скинути)
const initialFilterNames = {};

// ✅ Підвантаження HTML-фрагментів
async function loadPartial(id, url) {
  const container = document.getElementById(id);
  if (container) {
    const res = await fetch(url);
    const html = await res.text();
    container.innerHTML = html;

    // Локальні ініціалізації після підвантаження
    if (id === 'header') initModal();
    if (id === 'filters') initFilterModal();

    loadedSections++;

    // Глобальна ініціалізація після всіх секцій
    if (loadedSections === sectionsToLoad.length) {
      initThemeToggle();
    }
  }
}

// ✅ Запуск завантаження всіх секцій
sectionsToLoad.forEach(([id, url]) => loadPartial(id, url));

// ✅ Ініціалізація модального вікна (наприклад, модалка у header)
function initModal() {
  const openBtn = document.getElementById('open-modal-btn');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('close-modal-btn');

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }
}

// ✅ Ініціалізація модалки фільтрів
function initFilterModal() {
  const modal = document.getElementById('filter-modal');
  const closeBtn = document.getElementById('close-filter-modal');
  const modalTitle = document.getElementById('filter-modal-title');
  const modalOptions = document.getElementById('filter-modal-options');

  const filterItems = document.querySelectorAll('.filter-item');
  const filterToggles = document.querySelectorAll('.filter-toggle');

  if (!modal || !closeBtn || !modalTitle || !modalOptions) {
    console.warn('Filter modal elements not found');
    return;
  }

  // Запам'ятовуємо початкові назви фільтрів
  filterItems.forEach(item => {
    const key = item.dataset.filter;
    const btn = item.querySelector('.filter-toggle');
    if (key && btn && !(key in initialFilterNames)) {
      initialFilterNames[key] = btn.textContent.trim();
    }
  });

  // Відкриття модалки при кліку на фільтр
  filterToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filterItem = btn.closest('.filter-item');
      if (!filterItem) return;

      const filterKey = filterItem.dataset.filter;
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

  // Закриття модалки кнопкою
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Закриття модалки кліком на фон
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Кнопка "Скинути" — повертає всі фільтри до початкового стану
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
    });
  }
}

// ✅ Ініціалізація перемикача теми
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
