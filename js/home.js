const CONTACT_CONFIG = {
  lineUrl: 'https://line.me/R/ti/p/@527yvzvj',
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-line-link]').forEach((el) => {
    el.setAttribute('href', CONTACT_CONFIG.lineUrl);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.section article, .price-panel, .chosen, .contact')
    .forEach((element) => observer.observe(element));

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
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString(),
        });

        if (res.ok) {
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
