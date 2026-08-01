/**
 * Punto de entrada único.
 * Los módulos de assets/js/modules/ se cargan antes que este archivo con
 * `defer`, que garantiza el orden de ejecución, y registran su función de
 * arranque en el espacio de nombres `window.Movira`. Aquí sólo se llaman.
 *
 * Se usan scripts clásicos en lugar de módulos ES a propósito: así el sitio
 * también funciona abriendo index.html directamente con el protocolo file://,
 * donde los módulos ES quedan bloqueados por CORS.
 */
(function (Movira) {
  "use strict";

  function start() {
    // Cada init comprueba por su cuenta que sus elementos existan en la
    // página actual, así que la lista es la misma para todas.
    ["initTheme", "initMobileMenu", "initFaq", "initYear"].forEach(function (name) {
      if (typeof Movira[name] === "function") {
        Movira[name]();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})((window.Movira = window.Movira || {}));
