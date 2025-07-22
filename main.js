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
async function loadPartial(id, url) {
  const container = document.getElementById(id);
  if (container) {
    const res = await fetch(url);
    const html = await res.text();
    container.innerHTML = html;

    // 🧠 Перевірка, чи завантажено модальні елементи — і підключення логіки
    if (id === 'header') {
      initModal(); // викликаємо після підвантаження header
    }
  }
}

// Завантаження секцій
loadPartial('header', './header.html');
loadPartial('search-bar', './search-bar-nav.html');
loadPartial('filters', './filters.html');
loadPartial('movies-list', './movies-list.html');
loadPartial('movies', './movies.html');
loadPartial('block-new', './block-new.html');
loadPartial('opis-kino', './opis-kino-ua.html');
loadPartial('footer', './footer.html');

// 🔧 Функція ініціалізації модального вікна
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

