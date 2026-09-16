/* ==========================================================================
   PROUDEWEAR - MASTER SCRIPT
   Provides interactive functionality across all pages:
   - Header & Cart / Wishlist State Management via LocalStorage
   - Toast Notifications
   - Interactive Filters, Search, and Mobile Drawer
   - AI Stylist Chat Simulation
   - Blouse Finder Quiz, Customizer Calculator, Size Calculator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderCounters();
  initAccordions();
  initSearchModal();
  initGlobalWishlistBtns();
  initGlobalAddCartBtns();
  
  // New UX Features
  initDynamicLinks();
  initScrollAnimations();
  initDarkMode();
});

/* --------------------------------------------------------------------------
   LOCAL STORAGE UTILITIES FOR CART & WISHLIST
   -------------------------------------------------------------------------- */
function getCart() {
  const stored = JSON.parse(localStorage.getItem('proudewear_cart')) || JSON.parse(localStorage.getItem('aura_cart'));
  if (stored && Array.isArray(stored) && stored.length > 0) {
    return stored;
  }
  // Return default sample items for instant demonstration
  return [
    {
      id: 'PW-101',
      name: 'Royal Kanchipuram Raw Silk Blouse',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      size: '38 (M)',
      sleeve: 'Elbow Length',
      back: 'Deep Oval',
      quantity: 1,
      fabric: 'Kanchipuram Raw Silk'
    },
    {
      id: 'PW-102',
      name: 'Zardosi Hand-Embroidered Velvet Blouse',
      price: 3899,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      size: '38 (M)',
      sleeve: 'Short Sleeve',
      back: 'Tie-Up Latkan',
      quantity: 1,
      fabric: 'Royal Velvet'
    }
  ];
}

function saveCart(cart) {
  localStorage.setItem('proudewear_cart', JSON.stringify(cart));
  localStorage.setItem('aura_cart', JSON.stringify(cart));
  updateHeaderCounters();
}

function addToCart(item) {
  const cart = getCart();
  const existingIndex = cart.findIndex(c => c.id === item.id && c.size === item.size && c.sleeve === item.sleeve && c.back === item.back);
  
  if (existingIndex > -1) {
    cart[existingIndex].quantity += (item.quantity || 1);
  } else {
    cart.push({
      id: item.id || 'BL-' + Math.floor(Math.random() * 9000 + 1000),
      name: item.name || 'Royal Designer Blouse',
      price: item.price || 1499,
      image: item.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      size: item.size || 'M',
      sleeve: item.sleeve || 'Short',
      back: item.back || 'Keyhole',
      quantity: item.quantity || 1,
      fabric: item.fabric || 'Kanchipuram Silk'
    });
  }
  
  saveCart(cart);
  showToast(`Added "${item.name || 'Blouse'}" to your Cart!`);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

function getWishlist() {
  return JSON.parse(localStorage.getItem('proudewear_wishlist')) || JSON.parse(localStorage.getItem('aura_wishlist')) || [];
}

function saveWishlist(wishlist) {
  localStorage.setItem('proudewear_wishlist', JSON.stringify(wishlist));
  localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  updateHeaderCounters();
}

function toggleWishlist(item) {
  let wishlist = getWishlist();
  const index = wishlist.findIndex(w => w.id === item.id);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    saveWishlist(wishlist);
    showToast(`Removed from Wishlist`);
    return false;
  } else {
    wishlist.push(item);
    saveWishlist(wishlist);
    showToast(`Saved "${item.name}" to Wishlist! ❤️`);
    return true;
  }
}

function updateHeaderCounters() {
  const cartCount = getCart().reduce((sum, i) => sum + i.quantity, 0);
  const wishlistCount = getWishlist().length;

  const cartBadges = document.querySelectorAll('.cart-badge');
  const wishlistBadges = document.querySelectorAll('.wishlist-badge');

  cartBadges.forEach(b => b.textContent = cartCount);
  wishlistBadges.forEach(b => b.textContent = wishlistCount);
}

function initHeaderCounters() {
  updateHeaderCounters();
}

/* --------------------------------------------------------------------------
   UI INTERACTIONS & NAVIGATION
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Sticky shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile nav drawer
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });
  }

  // Active state highlight based on URL
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* Toast System */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--antique-gold)"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* Accordion Toggle */
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close open items in same accordion
      const siblingItems = item.parentElement.querySelectorAll('.accordion-item');
      siblingItems.forEach(sib => sib.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* Search Modal */
function initSearchModal() {
  const searchTriggers = document.querySelectorAll('.trigger-search');
  const modal = document.getElementById('searchModal');
  const closeBtn = document.getElementById('closeSearchModal');

  if (!modal) return;

  searchTriggers.forEach(t => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      modal.querySelector('input')?.focus();
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* Global Quick Add & Wishlist listeners */
function initGlobalWishlistBtns() {
  document.body.addEventListener('click', (e) => {
    const wBtn = e.target.closest('.wishlist-btn');
    if (wBtn) {
      e.preventDefault();
      e.stopPropagation();
      const card = wBtn.closest('.product-card');
      const item = {
        id: wBtn.dataset.id || card?.dataset?.id || 'BL-' + Math.floor(Math.random() * 8000 + 1000),
        name: card?.querySelector('.card-title')?.textContent?.trim() || 'Custom Designer Blouse',
        price: parseInt(card?.querySelector('.current-price')?.textContent?.replace(/[^0-9]/g, '')) || 1499,
        image: card?.querySelector('img')?.src || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
        rating: '4.9 ★'
      };
      
      const isAdded = toggleWishlist(item);
      if (isAdded) {
        wBtn.classList.add('active');
      } else {
        wBtn.classList.remove('active');
      }
    }
  });
}

function initGlobalAddCartBtns() {
  document.body.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.quick-add-btn');
    if (addBtn) {
      e.preventDefault();
      const card = addBtn.closest('.product-card');
      const item = {
        id: card?.dataset?.id || 'BL-' + Math.floor(Math.random() * 8000 + 1000),
        name: card?.querySelector('.card-title')?.textContent?.trim() || 'Royal Kanchipuram Silk Blouse',
        price: parseInt(card?.querySelector('.current-price')?.textContent?.replace(/[^0-9]/g, '')) || 1499,
        image: card?.querySelector('img')?.src || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
        size: 'M',
        quantity: 1
      };
      addToCart(item);
    }
  });
}

/* --------------------------------------------------------------------------
   NEW FEATURES: SCROLL ANIMATIONS, DARK MODE, DYNAMIC LINKS
   -------------------------------------------------------------------------- */

// 1. Fix product links in homepage dynamically based on data-id
function initDynamicLinks() {
  document.querySelectorAll('.product-card').forEach(card => {
    const id = card.getAttribute('data-id');
    const link = card.querySelector('.card-title a');
    if (link && id) {
      link.href = `product.html?id=${id}`;
    }
  });
}

// 2. Smooth Scroll Animations (IntersectionObserver)
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// 3. Dark Mode Toggle
function initDarkMode() {
  const currentTheme = localStorage.getItem('proudewear_theme') || 'light';
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // Find all theme toggles in the header
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  themeToggles.forEach(toggle => {
    // Update icon initially
    const icon = toggle.querySelector('i');
    if (currentTheme === 'dark' && icon) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      let theme = document.documentElement.getAttribute('data-theme');
      
      if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('proudewear_theme', 'light');
        themeToggles.forEach(t => {
          t.querySelector('i')?.classList.remove('fa-sun');
          t.querySelector('i')?.classList.add('fa-moon');
        });
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('proudewear_theme', 'dark');
        themeToggles.forEach(t => {
          t.querySelector('i')?.classList.remove('fa-moon');
          t.querySelector('i')?.classList.add('fa-sun');
        });
      }
    });
  });
}
