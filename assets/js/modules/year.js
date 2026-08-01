/**
 * Escribe el año en curso en el aviso de copyright del pie.
 */
(function (Movira) {
  "use strict";

  Movira.initYear = function () {
    var target = document.querySelector("[data-year]");

    if (!target) {
      return;
    }

    target.textContent = String(new Date().getFullYear());
  };
})((window.Movira = window.Movira || {}));
