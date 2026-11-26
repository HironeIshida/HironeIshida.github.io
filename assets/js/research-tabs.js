(function () {
  const defaultTab = "physics";

  function getButtons() {
    return document.querySelectorAll(".research-switch [data-tab]");
  }

  function selectTab(name, updateHash) {
    const buttons = getButtons();
    const names = Array.prototype.map.call(buttons, function (button) {
      return button.dataset.tab;
    });
    const target = names.indexOf(name) >= 0 ? name : defaultTab;

    const field = document.querySelector(".research-field");

    buttons.forEach(function (button) {
      const isCurrent = button.dataset.tab === target;
      button.hidden = isCurrent;

      if (isCurrent && field) {
        field.textContent = button.dataset.label;
      }

      const panel = document.getElementById(button.dataset.tab);
      if (panel) {
        panel.hidden = !isCurrent;
      }
    });

    if (updateHash && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", "#" + target);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    const buttons = getButtons();
    if (!buttons.length) {
      return;
    }

    selectTab(window.location.hash.slice(1), false);

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        selectTab(button.dataset.tab, true);
      });
    });
  });

  window.addEventListener("hashchange", function () {
    selectTab(window.location.hash.slice(1), false);
  });
})();
