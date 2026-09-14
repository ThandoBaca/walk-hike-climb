// Walk Hike Climb (WHC / SRT) Interactive Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      const spans = navToggle.querySelectorAll('span');
      if (spans.length === 3) {
        spans[0].style.transform = isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none';
        spans[1].style.opacity = isOpen ? '0' : '1';
        spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
      }
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          const spans = navToggle.querySelectorAll('span');
          if (spans.length === 3) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
          }
        }
      });
    });
  }

  // 2. Sticky Header Styling on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Packages Filter Tabs (Grid & Dropdown Navigation)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const packageCards = document.querySelectorAll('.package-card');
  const dropdownFilterLinks = document.querySelectorAll('.dropdown-menu a[data-filter]');

  function applyPackageFilter(filterValue) {
    // Update active state on tab buttons
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === filterValue) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Filter package cards
    packageCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'flex';
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transition = 'opacity 0.3s ease';
        }, 30);
      } else {
        card.style.display = 'none';
      }
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');
      applyPackageFilter(filterValue);
    });
  });

  dropdownFilterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const filterValue = link.getAttribute('data-filter');
      if (filterValue) {
        applyPackageFilter(filterValue);
      }
    });
  });

  // 4. Quick Email Enquiry Modal Drawer (PDF Page 10)
  const modal = document.getElementById('enquiryModal');
  const openButtons = document.querySelectorAll('.open-enquiry-modal, a[href="#inquiry"]');
  const closeButton = document.getElementById('closeModal');
  const qMessageInput = document.getElementById('qMessage');
  let lastActiveElement = null;

  function openEnquiryModal(packageName = '') {
    if (modal) {
      lastActiveElement = document.activeElement;
      modal.classList.add('open');
      if (packageName && qMessageInput && !qMessageInput.value.includes(packageName)) {
        qMessageInput.value = `Hi Ian & Diane, I am interested in inquiring about the "${packageName}". Please share availability and details.`;
      }
      const focusableEls = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableEls.length > 0) {
        focusableEls[0].focus();
      }
    }
  }

  function closeEnquiryModal() {
    if (modal) {
      modal.classList.remove('open');
      if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
      }
    }
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Detect tour title if clicked from a card
      const card = btn.closest('.package-card, .featured-card');
      const tourTitle = card ? card.querySelector('h3')?.innerText : '';
      openEnquiryModal(tourTitle);
    });
  });

  if (closeButton && modal) {
    closeButton.addEventListener('click', closeEnquiryModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeEnquiryModal();
      }
    });

    // Keyboard navigation: Escape key & focus trapping inside modal
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('open')) return;

      if (e.key === 'Escape') {
        closeEnquiryModal();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = Array.from(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
          .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // 5. Inquiry Forms Submission Simulation
  const mainForm = document.getElementById('tourInquiryForm');
  const formFeedback = document.getElementById('formFeedback');

  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = document.getElementById('firstName').value;
      const country = document.getElementById('country').value;
      if (formFeedback) {
        formFeedback.style.display = 'block';
        formFeedback.innerText = `Thank you, ${firstName}! Your inquiry has been forwarded to Ian & Diane Naidoo. We will respond promptly.`;
        mainForm.reset();
        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 6000);
      }
    });
  }

  const quickForm = document.getElementById('quickEnquiryForm');
  const qFeedback = document.getElementById('qFeedback');

  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const qName = document.getElementById('qName').value;
      if (qFeedback) {
        qFeedback.style.display = 'block';
        qFeedback.innerText = `Thank you, ${qName}! Your email inquiry has been received.`;
        quickForm.reset();
        setTimeout(() => {
          qFeedback.style.display = 'none';
          if (modal) modal.classList.remove('open');
        }, 3000);
      }
    });
  }
});
