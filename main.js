/**
 * FlowSync.ai - Script Principal Unificado
 */

// ==========================================
// 1. SISTEMA DE TOAST NOTIFICATIONS (BLINDADO)
// ==========================================
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const iconName = type === 'warning' ? 'ph-warning' : 'ph-check-circle';
  toast.innerHTML = `<i class="ph ${iconName}"></i> <span>${message}</span>`;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ==========================================
// 2. INICIALIZAÇÃO DA PÁGINA (ÚNICO LISTENER)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

  // --- ALTERNADOR DE TEMA (DARK / LIGHT) ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  const savedTheme = localStorage.getItem('flowsync-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) themeIcon.classList.replace('ph-moon', 'ph-sun');
  }

  if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      if (isLight) {
        themeIcon.classList.replace('ph-moon', 'ph-sun');
        localStorage.setItem('flowsync-theme', 'light');
        showToast('Modo Claro ativado', 'info');
      } else {
        themeIcon.classList.replace('ph-sun', 'ph-moon');
        localStorage.setItem('flowsync-theme', 'dark');
        showToast('Modo Escuro ativado', 'info');
      }
    });
  }

  // --- MENU MOBILE ---
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('show'));
    });
  }

  // --- FILTRO DE RECURSOS (CLIENTE / EMPRESA) ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const featureCards = document.querySelectorAll('.feature-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      featureCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- TOGGLE DE PREÇOS (MENSAL / ANUAL) ---
  const billingSwitch = document.getElementById('billing-switch');
  const labelMonthly = document.getElementById('label-monthly');
  const labelAnnual = document.getElementById('label-annual');
  const priceAmounts = document.querySelectorAll('.price-amount');
  let isAnnual = false;

  if (billingSwitch) {
    billingSwitch.addEventListener('click', () => {
      isAnnual = !isAnnual;
      billingSwitch.classList.toggle('active', isAnnual);

      if (labelMonthly && labelAnnual) {
        labelMonthly.classList.toggle('active', !isAnnual);
        labelAnnual.classList.toggle('active', isAnnual);
      }

      priceAmounts.forEach(price => {
        const monthly = price.getAttribute('data-monthly');
        const annual = price.getAttribute('data-annual');
        if (monthly && annual) {
          price.textContent = isAnnual ? annual : monthly;
        }
      });

      showToast(isAnnual ? 'Desconto anual de 20% aplicado!' : 'Valores mensais exibidos.', 'info');
    });
  }

  // --- FORMULÁRIO DE CONTATO & DEMO ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('name');
      const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Cliente';

      showToast(`Obrigado, ${name}! Solicitação recebida com sucesso.`, 'info');
      contactForm.reset();
    });
  }

});