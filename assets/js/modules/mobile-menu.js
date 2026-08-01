/**
 * Menú lateral en pantallas estrechas.
 * Abre, cierra, bloquea el scroll de fondo, se cierra al pulsar un enlace,
 * al pulsar fuera y con la tecla Escape. Devuelve el foco al botón que lo abrió.
 */
(function (Movira) {
  "use strict";

  Movira.initMobileMenu = function () {
    var toggle = document.querySelector("[data-menu-toggle]");
    var menu = document.querySelector("[data-menu]");
    var overlay = document.querySelector("[data-menu-overlay]");
    var close = document.querySelector("[data-menu-close]");

    if (!toggle || !menu || !overlay || !close) {
      return;
    }

    var isOpen = false;

    function open() {
      if (isOpen) {
        return;
      }

      isOpen = true;
      menu.classList.add("is-open");
      overlay.classList.add("is-open");
      document.body.classList.add("is-menu-open");
      toggle.setAttribute("aria-expanded", "true");
      close.focus();
    }

    function hide(returnFocus) {
      if (!isOpen) {
        return;
      }

      isOpen = false;
      menu.classList.remove("is-open");
      overlay.classList.remove("is-open");
      document.body.classList.remove("is-menu-open");
      toggle.setAttribute("aria-expanded", "false");

      if (returnFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener("click", open);
    close.addEventListener("click", function () {
      hide(true);
    });
    overlay.addEventListener("click", function () {
      hide(true);
    });

    // Delegación: cualquier enlace del menú lo cierra al navegar.
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        hide(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen) {
        hide(true);
      }
    });

    // Al pasar a escritorio el menú lateral deja de existir en el layout.
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024) {
        hide(false);
      }
    });
  };
})((window.Movira = window.Movira || {}));
