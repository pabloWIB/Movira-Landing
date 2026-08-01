/**
 * Alterna entre tema claro y oscuro y guarda la preferencia.
 * El tema inicial ya lo aplica un script en el <head> para evitar el
 * parpadeo de color en la primera pintura.
 */
(function (Movira) {
  "use strict";

  var STORAGE_KEY = "movira-theme";

  function current() {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  }

  function apply(theme, buttons) {
    document.documentElement.setAttribute("data-theme", theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      /* Modo privado o almacenamiento lleno: el tema sigue funcionando
         en esta sesión, sólo no se recuerda en la siguiente. */
    }

    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", String(theme === "dark"));
    });
  }

  Movira.initTheme = function () {
    var buttons = Array.prototype.slice.call(
      document.querySelectorAll("[data-theme-toggle]")
    );

    if (buttons.length === 0) {
      return;
    }

    apply(current(), buttons);

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        apply(current() === "dark" ? "light" : "dark", buttons);
      });
    });
  };
})((window.Movira = window.Movira || {}));
