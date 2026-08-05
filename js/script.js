document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = navOverlay.querySelectorAll('a');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggleNav = () => {
    const isOpen = navOverlay.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  navToggle.addEventListener('click', toggleNav);
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navOverlay.classList.contains('is-open')) toggleNav();
    });
  });

  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));

  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.submit-btn');
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = '送信中...';

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const data = await res.json();

        if (data.success) {
          form.reset();
          formNote.textContent = 'お問い合わせありがとうございます。内容を送信しました。';
          formNote.classList.add('is-success');
        } else {
          formNote.textContent = '送信に失敗しました。お手数ですが tlahomep@gmail.com へ直接ご連絡ください。';
          formNote.classList.add('is-error');
        }
      } catch (err) {
        formNote.textContent = '送信に失敗しました。お手数ですが tlahomep@gmail.com へ直接ご連絡ください。';
        formNote.classList.add('is-error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  }
});
