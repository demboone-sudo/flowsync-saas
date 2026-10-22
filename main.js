/**
 * FlowSync.ai - Script Principal da Aplicação
 * Recursos:
 * 1. Sistema Global de Notificações Toast
 * 2. Alternador de Tema Escuro / Claro (com persistência no localStorage)
 * 3. Menu Mobile Responsivo
 * 4. Filtros Dinâmicos de Soluções (Cliente Final / Empresa)
 * 5. Alternador de Preços (Faturamento Mensal / Anual)
 * 6. Envio e Feedback do Formulário de Demonstração
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. SISTEMA DE TOAST NOTIFICATIONS
  // ==========================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let iconName = 'ph-check-circle';
    if (type === 'warning') iconName = 'ph-warning';
    if (type === 'info') iconName = 'ph-info';

    toast.innerHTML = `<i class="ph ${iconName}"></i>`;
    const span = document.createElement('span');
    span.textContent = message;
    toast.appendChild(span);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ==========================================
  // 2. ALTERNADOR DE TEMA (DARK / LIGHT)
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Recupera o tema prévio salvo no navegador
  const savedTheme = localStorage.getItem('flowsync-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) {
      themeIcon.classList.replace('ph-moon', 'ph-sun');
    }
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

  // ==========================================
  // 3. MENU MOBILE RESPONSIVO
  // ==========================================
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    // Fecha o menu automaticamente ao clicar em qualquer link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('show'));
    });
  }

  // ==========================================
  // 4. FILTRO DINÂMICO DE RECURSOS
  // ==========================================
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

  // ==========================================
  // 5. TOGGLE DE PREÇOS (MENSAL / ANUAL)
  // ==========================================
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

  // ==========================================
  // 6. FORMULÁRIO DE CONTATO & DEMO
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      showToast(`Obrigado, ${name}! Solicitação recebida com sucesso.`, 'info');
      contactForm.reset();
    });
  }

});