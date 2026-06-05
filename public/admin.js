(function () {
  "use strict";

  function showError(el, message) {
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
  }

  function clearError(el) {
    if (!el) return;
    el.textContent = "";
    el.hidden = true;
  }

  function parseJson(response) {
    return response.json().catch(function () { return { ok: false }; });
  }

  var loginForm = document.getElementById("adminLoginForm");
  if (loginForm) {
    var loginError = document.getElementById("adminLoginError");
    var loginButton = loginForm.querySelector('button[type="submit"]');

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      clearError(loginError);
      if (loginButton) loginButton.disabled = true;

      fetch("/api/admin/login", {
        method: "POST",
        body: new FormData(loginForm)
      })
        .then(function (response) {
          return parseJson(response).then(function (data) {
            return { response: response, data: data };
          });
        })
        .then(function (result) {
          if (result.response.ok && result.data.ok) {
            window.location.assign("/admin");
            return;
          }

          showError(loginError, result.data.error || "Connexion impossible.");
        })
        .catch(function () {
          showError(loginError, "Erreur réseau. Merci de réessayer.");
        })
        .finally(function () {
          if (loginButton) loginButton.disabled = false;
        });
    });
  }

  document.querySelectorAll(".status-select").forEach(function (select) {
    select.addEventListener("change", function () {
      var row = select.closest("[data-request-id]");
      var feedback = row ? row.querySelector(".status-feedback") : null;
      if (!row) return;

      var previous = select.getAttribute("data-previous") || "";
      if (!previous) {
        previous = Array.from(select.options).find(function (option) { return option.defaultSelected; })?.value || select.value;
      }

      select.disabled = true;
      if (feedback) {
        feedback.textContent = "Enregistrement...";
        feedback.classList.remove("error");
      }

      fetch("/api/admin/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: row.getAttribute("data-request-id"),
          status: select.value
        })
      })
        .then(function (response) {
          return parseJson(response).then(function (data) {
            return { response: response, data: data };
          });
        })
        .then(function (result) {
          if (result.response.ok && result.data.ok) {
            select.setAttribute("data-previous", select.value);
            if (feedback) feedback.textContent = "Enregistré";
            return;
          }

          select.value = previous;
          if (feedback) {
            feedback.textContent = result.data.error || "Mise à jour impossible.";
            feedback.classList.add("error");
          }
        })
        .catch(function () {
          select.value = previous;
          if (feedback) {
            feedback.textContent = "Erreur réseau.";
            feedback.classList.add("error");
          }
        })
        .finally(function () {
          select.disabled = false;
        });
    });
  });

  var logoutButton = document.getElementById("adminLogout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      logoutButton.disabled = true;
      fetch("/api/admin/logout", { method: "POST" })
        .finally(function () {
          window.location.assign("/admin");
        });
    });
  }
})();
