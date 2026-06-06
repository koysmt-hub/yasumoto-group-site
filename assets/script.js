// 北里大学 海洋生命科学部 生物化学研究室 - HP共通スクリプト

(function () {
  // ===== 言語切替 =====
  const STORAGE_KEY = 'lab-site-lang';
  const validLangs = ['jp', 'en'];

  function setLang(lang) {
    if (!validLangs.includes(lang)) lang = 'jp';
    document.body.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang === 'jp' ? 'ja' : 'en');
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });
  }

  function initLang() {
    let lang;
    try { lang = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (!validLangs.includes(lang)) lang = 'jp';
    setLang(lang);
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  // ===== モバイルメニュー =====
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.site-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('is-open'));
    });
  }


  // ===== トップページ：ヒーロースライドショー =====
  function initHeroSlideshow() {
    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    if (slides.length <= 1) return;

    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === 0);
    });

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let current = 0;
    window.setInterval(() => {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 5000);
  }

  // ===== 現在ページのナビハイライト =====
  function highlightCurrentPage() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-nav .nav-item').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('is-active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initMobileMenu();
    highlightCurrentPage();
    initHeroSlideshow();
  });
})();
