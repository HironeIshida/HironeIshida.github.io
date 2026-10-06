(function () {
  const storageKey = "hirone-theme";
  const root = document.documentElement;
  const mediaQuery =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;

  function getStoredTheme() {
    try {
      const stored = window.localStorage.getItem(storageKey);
      return stored === "light" || stored === "dark" ? stored : null;
    } catch (error) {
      return null;
    }
  }

  function getPreferredTheme() {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    return mediaQuery && mediaQuery.matches ? "dark" : "light";
  }

  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    document
      .querySelectorAll(".theme-switch button[data-theme-value]")
      .forEach(function (button) {
        const isActive = button.dataset.themeValue === theme;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

    if (!persist) {
      return;
    }

    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  applyTheme(getPreferredTheme(), false);

  function stabilizeNavLinkWidths() {
    document
      .querySelectorAll(".site-nav ul a:not(.nav-secret-link)")
      .forEach(function (link) {
        var label = link.textContent.trim();
        if (label) {
          link.dataset.navLabel = label;
        }
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(getPreferredTheme(), false);
    stabilizeNavLinkWidths();

    document
      .querySelectorAll(".theme-switch button[data-theme-value]")
      .forEach(function (button) {
        button.addEventListener("click", function () {
          applyTheme(button.dataset.themeValue, true);
        });
      });
  });

  if (mediaQuery && typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", function (event) {
      if (getStoredTheme()) {
        return;
      }
      applyTheme(event.matches ? "dark" : "light", false);
    });
  }
})();
