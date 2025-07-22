// async function loadPartial(id, url) {
//   const container = document.getElementById(id);
//   if (container) {
//     const res = await fetch(url);
//     const html = await res.text();
//     container.innerHTML = html;
//   }
// }

// loadPartial('header', './header.html');
// loadPartial('search-bar', './search-bar-nav.html');
// loadPartial('filters', './filters.html');
// loadPartial('movies-list', './movies-list.html');
// loadPartial('movies', './movies.html');
// loadPartial('block-new', './block-new.html');
// loadPartial('opis-kino', './opis-kino-ua.html');
// loadPartial('footer', './footer.html');
// 📥 Завантаження частин сторінки
async function loadPartial(id, url) {
  const container = document.getElementById(id);
  if (container) {
    const res = await fetch(url);
    const html = await res.text();
    container.innerHTML = html;

    // 🔁 Ініціалізації після підвантаження секцій
    if (id === 'header') {
      initModal();
      initThemeToggle(); // Після header
    }

    if (id === 'search-bar') {
      initThemeToggle(); // Після мобільного пошуку
    }
  }
}

// 🔧 Підвантаження секцій
loadPartial('header', './header.html');
loadPartial('search-bar', './search-bar-nav.html');
loadPartial('filters', './filters.html');
loadPartial('movies-list', './movies-list.html');
loadPartial('movies', './movies.html');
loadPartial('block-new', './block-new.html');
loadPartial('opis-kino', './opis-kino-ua.html');
loadPartial('footer', './footer.html');

// 🔧 Ініціалізація модального вікна
function initModal() {
  const openBtn = document.getElementById('open-modal-btn');
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('close-modal-btn');

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }
}

// 🌙☀️ Ініціалізація перемикача теми
function initThemeToggle() {
  const toggleButtons = document.querySelectorAll('.theme-toggle, .theme-toggle-deskopt');
  if (!toggleButtons.length) return;

  // Налаштовуємо обробники для всіх перемикачів
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');

      const isLight = document.body.classList.contains('light-theme');
      const icon = isLight ? '☀️' : '🌙';

      // Оновлюємо всі іконки
      toggleButtons.forEach((b) => b.textContent = icon);

      // Зберігаємо в localStorage
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  });

  // Встановлюємо тему при завантаженні
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    toggleButtons.forEach((b) => b.textContent = '☀️');
  }
}


