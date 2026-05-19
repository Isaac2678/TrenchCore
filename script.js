// ===== NAV SCROLL EFFECT =====
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function openNav() {
  navLinks.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  const spans = navToggle.querySelectorAll('span');
  spans[0].style.transform = 'translateY(7px) rotate(45deg)';
  spans[1].style.opacity = '0';
  spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  const firstLink = navLinks.querySelector('a');
  if (firstLink) firstLink.focus();
}

function closeNav() {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  navToggle.focus();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeNav() : openNav();
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) closeNav();
  });

  // Click outside to close
  document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      closeNav();
    }
  });

  // Focus trap within open drawer
  document.addEventListener('keydown', e => {
    if (!navLinks.classList.contains('open') || e.key !== 'Tab') return;
    const focusable = Array.from(navLinks.querySelectorAll('a'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { last.focus(); e.preventDefault(); }
    } else {
      if (document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });
}

// ===== ACTIVE NAV LINK =====
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ===== QUOTE FORM SUBMISSION =====
// Replace the URL below with your Formspree endpoint (https://formspree.io) or
// another form backend. Create a free account at formspree.io, create a form,
// and paste the endpoint URL here.
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
const FORM_ENDPOINT_IS_CONFIGURED = !FORM_ENDPOINT.includes('YOUR_FORM_ID');

const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  // Clear error state on input
  quoteForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('error');
      const msg = field.parentElement.querySelector('.form-error-msg');
      if (msg) msg.remove();
    });
  });

  quoteForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Client-side validation
    let isValid = true;
    this.querySelectorAll('[required]').forEach(field => {
      const val = field.type === 'checkbox' ? field.checked : field.value.trim();
      if (!val) {
        isValid = false;
        field.classList.add('error');
        if (!field.parentElement.querySelector('.form-error-msg')) {
          const msg = document.createElement('span');
          msg.className = 'form-error-msg';
          msg.textContent = field.type === 'checkbox'
            ? 'Please check this box to continue.'
            : 'This field is required.';
          field.parentElement.appendChild(msg);
        }
      } else if (field.type === 'email' && !field.validity.valid) {
        isValid = false;
        field.classList.add('error');
        if (!field.parentElement.querySelector('.form-error-msg')) {
          const msg = document.createElement('span');
          msg.className = 'form-error-msg';
          msg.textContent = 'Please enter a valid email address.';
          field.parentElement.appendChild(msg);
        }
      }
    });

    if (!isValid) {
      const firstError = this.querySelector('.error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      if (!FORM_ENDPOINT_IS_CONFIGURED) {
        throw new Error('Quote form endpoint is not configured.');
      }

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        quoteForm.style.display = 'none';
        const success = document.getElementById('formSuccess');
        if (success) success.classList.add('visible');
      } else {
        throw new Error('Server responded with ' + response.status);
      }
    } catch (err) {
      btn.textContent = originalText;
      btn.disabled = false;
      // Show a friendly error at the top of the form
      let errBanner = quoteForm.querySelector('.form-submit-error');
      if (!errBanner) {
        errBanner = document.createElement('p');
        errBanner.className = 'form-error-msg form-submit-error';
        errBanner.style.marginBottom = '1rem';
        quoteForm.querySelector('.form-submit').prepend(errBanner);
      }
      errBanner.textContent = FORM_ENDPOINT_IS_CONFIGURED
        ? 'Something went wrong sending your request. Please call us directly at (303) 974-0317.'
        : 'Online quote requests are not connected yet. Please call (303) 974-0317 or email Kevin@trenchcorellc.com.';
    }
  });
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.reveal, .why-item, .process-step, .testimonial-lead, .testimonial-compact, .service-detail-card, .section-intro, .section-header, .cta-banner .container'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      let batchIndex = 0;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = Math.min(batchIndex * 0.08, 0.32);
          if (el.classList.contains('reveal')) {
            el.style.transitionDelay = `${delay}s`;
            el.classList.add('visible');
          } else {
            el.style.transitionDelay = `${delay}s`;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
          observer.unobserve(el);
          batchIndex++;
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  revealEls.forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    observer.observe(el);
  });
}

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
