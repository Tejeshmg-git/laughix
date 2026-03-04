/* ============================================
   LAUGHIX — Global Stand-Up Tour Website
   Main JavaScript
   ============================================ */

// ---- Tour Shows Data ----
const tourShows = [
  {
    id: 1,
    city: "New York City",
    venue: "Madison Square Garden",
    date: "2026-04-15",
    time: "8:00 PM",
    price: "$75",
    status: "on-sale",
    image: "madison-square-garden.webp"
  },
  {
    id: 2,
    city: "Los Angeles",
    venue: "The Hollywood Bowl",
    date: "2026-04-22",
    time: "9:00 PM",
    price: "$80",
    status: "on-sale",
    image: "Hollywood_Bowl.webp"
  },
  {
    id: 3,
    city: "London",
    venue: "The O2 Arena",
    date: "2026-05-03",
    time: "7:30 PM",
    price: "£65",
    status: "on-sale",
    image: "The O2 Arena.jpg"
  },
  {
    id: 4,
    city: "Toronto",
    venue: "Scotiabank Arena",
    date: "2026-05-10",
    time: "8:00 PM",
    price: "C$90",
    status: "on-sale",
    image: "Scotiabank Arena.jpg"
  },
  {
    id: 5,
    city: "Sydney",
    venue: "Sydney Opera House",
    date: "2026-05-20",
    time: "7:00 PM",
    price: "A$85",
    status: "selling-fast",
    image: "Sydney Opera House.jpg"
  },
  {
    id: 6,
    city: "Mumbai",
    venue: "NSCI Dome",
    date: "2026-06-01",
    time: "8:30 PM",
    price: "₹2,500",
    status: "on-sale",
    image: "NSCI Dome.jpg"
  },
  {
    id: 7,
    city: "Dubai",
    venue: "Coca-Cola Arena",
    date: "2026-06-08",
    time: "9:00 PM",
    price: "AED 350",
    status: "on-sale",
    image: "Coca-Cola Arena.webp"
  },
  {
    id: 8,
    city: "Berlin",
    venue: "Tempodrom",
    date: "2026-06-15",
    time: "8:00 PM",
    price: "€70",
    status: "selling-fast",
    image: "Tempodrom.webp"
  },
  {
    id: 9,
    city: "Tokyo",
    venue: "Tokyo Dome City Hall",
    date: "2026-06-22",
    time: "7:30 PM",
    price: "¥9,500",
    status: "on-sale",
    image: "okyo Dome City Hall.webp"
  },
  {
    id: 10,
    city: "São Paulo",
    venue: "Espaço das Américas",
    date: "2026-07-05",
    time: "9:00 PM",
    price: "R$200",
    status: "on-sale",
    image: "Espaço das Américas.webp"
  }
];

// ---- Merch Data ----
const merchItems = [
  {
    id: 1,
    name: "Laughix Tour Tee",
    price: "$35",
    badge: "Best Seller",
    description: "Premium cotton tour t-shirt with glow-in-the-dark logo.",
    image: "tshirt.jpg"
  },
  {
    id: 2,
    name: "Neon Hoodie",
    price: "$65",
    badge: "New",
    description: "Electric blue gradient hoodie. Unisex fit.",
    image: "Hoodie.jpg"
  },
  {
    id: 3,
    name: "Laugh Hard Cap",
    price: "$28",
    badge: "",
    description: "Adjustable snapback with embroidered logo.",
    image: "Snapback.jpg"
  },
  {
    id: 4,
    name: "Tour Poster (Signed)",
    price: "$45",
    badge: "Limited",
    description: "Autographed 18×24 premium print poster.",
    image: "Tour Poster (Signed).webp"
  },
  {
    id: 5,
    name: "Laughix Mug",
    price: "$22",
    badge: "",
    description: "Ceramic mug with heat-reactive color change.",
    image: "Laughix Mug.jpg"
  },
  {
    id: 6,
    name: "VIP Backstage Pass",
    price: "$150",
    badge: "Exclusive",
    description: "Meet & greet + signed merch bundle.",
    image: "VIP Backstage Pass.jpg"
  }
];

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRTLToggle();
  initMobileMenu();
  initSmoothScroll();
  renderTourShows();
  renderFeaturedShows();
  renderMerchItems();
  initContactForm();
  initNewsletterForm();
  initScrollAnimations();
  setActiveNavLink();
});

// ---- Theme Toggle ----
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('laughix-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(toggleBtn, savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('laughix-theme', next);
    updateThemeIcon(toggleBtn, next);
  });
}

function updateThemeIcon(btn, theme) {
  const icon = btn.querySelector('i');
  if (!icon) return;
  icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// ---- RTL Toggle ----
function initRTLToggle() {
  const toggleBtn = document.getElementById('rtl-toggle');
  if (!toggleBtn) return;

  const savedDir = localStorage.getItem('laughix-dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);
  updateRTLIcon(toggleBtn, savedDir);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const next = current === 'ltr' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', next);
    localStorage.setItem('laughix-dir', next);
    updateRTLIcon(toggleBtn, next);
  });
}

function updateRTLIcon(btn, dir) {
  const icon = btn.querySelector('i');
  if (!icon) return;
  icon.className = dir === 'ltr' ? 'fa-solid fa-right-left' : 'fa-solid fa-right-left';
  // Note: fa-right-left is symmetrical enough for both, 
  // but we can rotate it if needed.
}

// ---- Mobile Menu ----
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const backBtn = document.getElementById('nav-back');

  if (!toggle || !navLinks) return;

  // Create overlay if it doesn't exist
  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  const openMenu = () => {
    toggle.classList.add('active');
    navLinks.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
  };

  const closeMenu = () => {
    toggle.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  };

  toggle.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (backBtn) {
    backBtn.addEventListener('click', closeMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// ---- Smooth Scroll ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ---- Render Tour Shows (Shows Page) ----
function renderTourShows() {
  const container = document.getElementById('tour-shows-grid');
  if (!container) return;

  const pathPrefix = window.location.pathname.includes('/pages/') ? '../assets/images/shows/' : 'assets/images/shows/';

  container.innerHTML = tourShows.slice(0, 6).map(show => {
    const dateFormatted = new Date(show.date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const statusBadge = show.status === 'selling-fast'
      ? '<span class="status-badge selling-fast">🔥 Selling Fast</span>'
      : '';

    return `
      <div class="show-card" data-aos="fade-up">
        <div class="show-image-container">
          <img src="${pathPrefix}${show.image}" alt="${show.venue}" class="show-image">
        </div>
        <div class="show-date">
          <i class="fa-regular fa-calendar"></i>
          ${dateFormatted} • ${show.time}
          ${statusBadge}
        </div>
        <h3>${show.venue}</h3>
        <p class="show-venue"><i class="fa-solid fa-location-dot"></i> ${show.venue}</p>
        <p class="show-city"><i class="fa-solid fa-globe"></i> ${show.city}</p>
        <p class="show-price">
          ${show.price}
        </p>
        <a href="#" class="btn btn-primary btn-small" onclick="event.preventDefault(); alert('🎟️ Tickets coming soon for ${show.city}!')">
          <i class="fa-solid fa-ticket"></i> Get Tickets
        </a>
      </div>
    `;
  }).join('');
}

// ---- Render Featured Shows (Home Pages) ----
function renderFeaturedShows() {
  const container = document.getElementById('featured-shows-grid');
  if (!container) return;

  const pathPrefix = window.location.pathname.includes('/pages/') ? '../assets/images/shows/' : 'assets/images/shows/';

  const featured = tourShows.slice(0, 3);
  container.innerHTML = featured.map(show => {
    const dateFormatted = new Date(show.date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    return `
      <div class="show-card" data-aos="fade-up">
        <div class="show-image-container">
          <img src="${pathPrefix}${show.image}" alt="${show.venue}" class="show-image">
        </div>
        <div class="show-date">
          <i class="fa-regular fa-calendar"></i>
          ${dateFormatted} • ${show.time}
        </div>
        <h3>${show.venue}</h3>
        <p class="show-city"><i class="fa-solid fa-globe"></i> ${show.city}</p>
        <a href="#" class="btn btn-primary btn-small" onclick="event.preventDefault(); alert('🎟️ Tickets coming soon for ${show.city}!')">
          <i class="fa-solid fa-ticket"></i> Get Tickets
        </a>
      </div>
    `;
  }).join('');
}

// ---- Render Merch Items (Shop Page) ----
function renderMerchItems() {
  const container = document.getElementById('merch-grid');
  if (!container) return;

  const pathPrefix = window.location.pathname.includes('/pages/') ? '../assets/images/shop/' : 'assets/images/shop/';

  container.innerHTML = merchItems.map(item => {
    const badgeHTML = item.badge
      ? `<span class="merch-badge">${item.badge}</span>`
      : '';

    return `
      <div class="merch-card" data-aos="fade-up">
        <div class="merch-image">
          <img src="${pathPrefix}${item.image}" alt="${item.name}">
          ${badgeHTML}
        </div>
        <div class="merch-info">
          <h3>${item.name}</h3>
          <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 8px;">${item.description}</p>
          <p class="merch-price">${item.price}</p>
          <button class="btn btn-buy btn-small" onclick="alert('🛒 ${item.name} added to cart!')">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// ---- Contact Form ----
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    alert(`✅ Thanks ${name}! Your booking inquiry has been submitted. We'll get back to you within 24 hours.`);
    form.reset();
  });
}

// ---- Newsletter Form ----
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        alert('🎉 You\'re subscribed! Get ready for exclusive updates and early access to tickets.');
        input.value = '';
      }
    });
  });
}

// ---- Scroll Animations (Fallback if AOS not loaded) ----
function initScrollAnimations() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
    return;
  }

  // Simple fallback scroll animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ---- Active Nav Link ----
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Normalize paths for comparison
    const linkPath = href.replace(/\.\.\//g, '').replace(/^\.\//g, '');
    const pagePath = currentPath.split('/').pop();

    if (linkPath === pagePath ||
      (pagePath === '' && (linkPath === 'index.html' || linkPath === '')) ||
      (pagePath === 'index.html' && linkPath === '')) {
      link.classList.add('active');
    }
  });
}

// Swiper initialization removed as it's now a static grid
