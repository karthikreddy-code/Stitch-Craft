(function () {
  const root = document.documentElement;
  const rtlMode = document.getElementById("rtlMode");
  const themeMode = document.getElementById("themeMode");
  const themeIcon = themeMode.querySelector("i");
  const menuToggle = document.getElementById("menu-toggle");
  const homeDropdown = document.getElementById("homeDropdown");
  const dropdownToggle = homeDropdown.querySelector(".dropdown-toggle");

  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  function setRTL(on) {
    root.dir = on ? "rtl" : "ltr";
    rtlMode.textContent = on ? "LTR" : "RTL";
    rtlMode.title = on ? "Switch to LTR" : "Switch to RTL";
    rtlMode.classList.toggle("active", on);
    save("sc-rtl", on ? "1" : "0");
  }
  function setDark(on) {
    document.body.classList.toggle("dark-mode", on);
    themeIcon.className = on ? "fa-solid fa-sun" : "fa-solid fa-moon";
    themeMode.title = on ? "Light mode" : "Dark mode";
    themeMode.setAttribute("aria-label", on ? "Switch to light mode" : "Switch to dark mode");
    save("sc-dark", on ? "1" : "0");
  }

  // remember choices across pages
  if (load("sc-rtl") === "1") setRTL(true);
  if (load("sc-dark") === "1") setDark(true);

  rtlMode.addEventListener("click", () => setRTL(root.dir !== "rtl"));
  themeMode.addEventListener("click", () => setDark(!document.body.classList.contains("dark-mode")));

  dropdownToggle.addEventListener("click", function (e) {
    e.preventDefault();
    const open = homeDropdown.classList.toggle("open");
    dropdownToggle.setAttribute("aria-expanded", open);
  });
  document.addEventListener("click", function (e) {
    if (!homeDropdown.contains(e.target)) {
      homeDropdown.classList.remove("open");
      dropdownToggle.setAttribute("aria-expanded", "false");
    }
  });
  document.querySelectorAll(".navbar nav a:not(.dropdown-toggle)").forEach(function (l) {
    l.addEventListener("click", () => { menuToggle.checked = false; });
  });
})();