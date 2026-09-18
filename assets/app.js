(() => {
  const menu = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  function closeMenu() {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', menu.dataset.openLabel);
    mobileNav.hidden = true;
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? menu.dataset.closeLabel : menu.dataset.openLabel);
    mobileNav.hidden = !open;
  });
  document.addEventListener('keydown', event => { if(event.key === 'Escape') closeMenu(); });
  matchMedia('(min-width: 901px)').addEventListener('change', event => { if(event.matches) closeMenu(); });

  for (const link of document.querySelectorAll('[data-language][href]')) {
    link.addEventListener('click', () => { try { localStorage.setItem('chessa-language',link.dataset.language); } catch {} });
  }
  // The default entry point remembers an explicitly chosen language.
  if (document.body.dataset.page === 'home' && document.body.dataset.language === 'pt') {
    try {
      const preferred = localStorage.getItem('chessa-language');
      if (preferred === 'en' || preferred === 'es') location.replace(document.querySelector(`header [data-language="${preferred}"]`).href);
    } catch {}
  }

  const projects = [...document.querySelectorAll('[data-category]')];
  for (const button of document.querySelectorAll('[data-filter]')) {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed',String(item === button)));
      projects.forEach(project => { project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter; });
      document.querySelector('[data-count]').textContent = String(projects.filter(item => !item.hidden).length);
    });
  }

  for (const button of document.querySelectorAll('[data-lightbox]')) {
    button.addEventListener('click', () => {
      const dialog = document.getElementById('lightbox');
      const img = dialog.querySelector('img');
      img.src = button.dataset.lightbox;
      img.alt = button.dataset.caption;
      dialog.querySelector('figcaption').textContent = button.dataset.caption;
      dialog.showModal();
    });
  }
  document.querySelectorAll('[data-dialog]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.dialog).showModal()));
  for (const dialog of document.querySelectorAll('dialog')) {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if(event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); } });
  }

  const topic = document.getElementById('contact-topic');
  if (topic) {
    const link = document.querySelector('[data-contact-wa]');
    topic.addEventListener('change', () => { link.href = `https://wa.me/5511992876042?text=${encodeURIComponent(`${link.dataset.message} ${topic.value}.`)}`; });
  }
})();
