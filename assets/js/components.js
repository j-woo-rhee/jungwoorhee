// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  // Load components
  loadComponents();
  
  // Initialize mobile menu toggle after header is loaded
  document.addEventListener('componentLoaded', function(e) {
    if (e.detail.component === 'header') {
      initMobileMenu();
    }
  });
});

// Function to load all components
function loadComponents() {
  // Get all component placeholders
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  
  // Load header
  if (headerPlaceholder) {
    loadComponent(headerPlaceholder, getBasePath() + 'components/header.html', 'header');
  }
  
  // Load footer
  if (footerPlaceholder) {
    loadComponent(footerPlaceholder, getBasePath() + 'components/footer.html', 'footer');
  }
}

// Function to load a component
function loadComponent(placeholder, path, componentName) {
  fetch(path)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${componentName}: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      placeholder.innerHTML = html;
      
      // Fix relative paths in the loaded HTML if in subfolder
      fixRelativePaths(placeholder);
      
      // Dispatch event when component is loaded
      document.dispatchEvent(new CustomEvent('componentLoaded', { 
        detail: { component: componentName }
      }));
    })
    .catch(error => console.error('Error loading component:', error));
}

// Function to initialize mobile menu
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      mobileMenuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
  }
  
  // Set active nav item based on current page
  setActiveNavItem();
}

// Function to set active nav item
function setActiveNavItem() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href.startsWith('http')) return; // Skip external links
    
    if (currentPath === href || 
        (href !== '/' && currentPath.startsWith(href)) ||
        (currentPath === '/' && href === '/')) {
      item.classList.add('active');
    }
  });
}

// Function to get base path depending on current directory depth
function getBasePath() {
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  return pathSegments.length > 0 ? '../'.repeat(pathSegments.length) : '';
}

// Function to fix relative paths in loaded components
function fixRelativePaths(element) {
  const basePath = getBasePath();
  if (!basePath) return; // No need to fix if we're at root
  
  // Fix href attributes
  element.querySelectorAll('[href^="/"]').forEach(el => {
    const href = el.getAttribute('href');
    if (!href.startsWith('//') && !href.startsWith('http')) {
      el.setAttribute('href', basePath + href.substring(1));
    }
  });
  
  // Fix src attributes
  element.querySelectorAll('[src^="/"]').forEach(el => {
    const src = el.getAttribute('src');
    if (!src.startsWith('//') && !src.startsWith('http')) {
      el.setAttribute('src', basePath + src.substring(1));
    }
  });
} 