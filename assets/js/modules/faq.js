/**
 * Acordeón de preguntas frecuentes.
 * Cada pregunta es un <button>, así que ya es enfocable y se activa con
 * Enter y Espacio sin código adicional. Aquí sólo se sincroniza el estado.
 */
(function (Movira) {
  "use strict";

  Movira.initFaq = function () {
    var list = document.querySelector("[data-faq]");

    if (!list) {
      return;
    }

    var questions = Array.prototype.slice.call(
      list.querySelectorAll("[data-faq-question]")
    );

    if (questions.length === 0) {
      return;
    }

    function collapseAll() {
      questions.forEach(function (question) {
        var answer = document.getElementById(
          question.getAttribute("aria-controls")
        );

        question.setAttribute("aria-expanded", "false");

        if (answer) {
          answer.hidden = true;
        }
      });
    }

    // Delegación: un solo listener para todas las preguntas.
    list.addEventListener("click", function (event) {
      var question = event.target.closest("[data-faq-question]");

      if (!question || !list.contains(question)) {
        return;
      }

      var answer = document.getElementById(
        question.getAttribute("aria-controls")
      );

      if (!answer) {
        return;
      }

      var wasOpen = question.getAttribute("aria-expanded") === "true";

      collapseAll();

      if (!wasOpen) {
        question.setAttribute("aria-expanded", "true");
        answer.hidden = false;
      }
    });
  };
})((window.Movira = window.Movira || {}));
