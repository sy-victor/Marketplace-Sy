/**
 * Sympler — nav.js
 * Navegação entre páginas e estado ativo da sidebar / bottom-nav
 */

(function () {
  'use strict';

  // ── Sidebar: marca o link ativo conforme a URL atual ──────────────
  function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.sidebar-nav-link, .bottom-nav-link').forEach(function (link) {
      const href = (link.getAttribute('href') || '').split('/').pop();
      if (href === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // ── Tooltip: toggle ao click (para mobile) ──────────────────────
  function initTooltips() {
    document.querySelectorAll('.tooltip-wrapper').forEach(function (wrapper) {
      const icon = wrapper.querySelector('.tooltip-icon');
      if (!icon) return;

      icon.addEventListener('click', function (e) {
        e.stopPropagation();
        const isActive = wrapper.classList.contains('active');

        // Fecha todos os tooltips abertos
        document.querySelectorAll('.tooltip-wrapper.active').forEach(function (w) {
          w.classList.remove('active');
        });

        if (!isActive) {
          wrapper.classList.add('active');
        }
      });
    });

    // Fecha tooltips ao clicar fora
    document.addEventListener('click', function () {
      document.querySelectorAll('.tooltip-wrapper.active').forEach(function (w) {
        w.classList.remove('active');
      });
    });
  }

  // ── Modal: open / close ──────────────────────────────────────────
  function initModals() {
    // Abre modal via data-modal="id-do-modal"
    document.querySelectorAll('[data-modal]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        const modalId = trigger.getAttribute('data-modal');
        const overlay = document.getElementById(modalId);
        if (overlay) openModal(overlay);
      });
    });

    // Fecha ao clicar no overlay ou no botão .modal-close
    document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal(overlay);
      });

      overlay.querySelectorAll('.modal-close').forEach(function (btn) {
        btn.addEventListener('click', function () {
          closeModal(overlay);
        });
      });
    });

    // Fecha com Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
      }
    });
  }

  function openModal(overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Expõe funções para uso externo
  window.SymplerNav = {
    openModal: openModal,
    closeModal: closeModal,
  };

  // ── Init ──────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    setActiveNav();
    initTooltips();
    initModals();
  });
})();
