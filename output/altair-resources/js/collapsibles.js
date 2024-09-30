// Developer: Andrew Barbour/ Alex Juntti
// Add support for collapsible section components

// Utility function to check if a child element is nested within an h2 tag at any level
function isNestedInTitle(child) {
  let parent = child.parentNode;
  while (parent && parent.tagName !== "BODY") {
    if (parent.tagName === "H2" || parent.tagName === "H3" || parent.tagName === "H4") {
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
}

$(document).ready(function () {
  const collapsibleSections = document.querySelectorAll(".collapsible");
  collapsibleSections.forEach((section) => {
    const toggleButton = document.createElement("span");
    toggleButton.setAttribute("class", "toggle");
    toggleButton.innerHTML = "&#9662;";
    toggleButton.style.marginRight = "5px";
    toggleButton.style.color = "#005776";
    toggleButton.style.cursor = "pointer";
    const sectionHeader =
      section.querySelector(".sectiontitle") ?? section.querySelector("h2");
    section.insertBefore(toggleButton, sectionHeader);
    sectionHeader.insertBefore(toggleButton, sectionHeader.firstChild);
    function toggle() {
      const expandedState =
        section.querySelector("div") ?? sectionHeader.nextElementSibling;
      let expanded = expandedState.style.display !== "none";
      expanded = !expanded;
      expanded
        ? (toggleButton.innerHTML = "&#9662;")
        : (toggleButton.innerHTML = "&#9656;");
      const descendants = section.querySelectorAll("*");
      descendants.forEach((child) => {
        if (
          !child.className.includes("sectiontitle") &&
          !child.className.includes("toggle") &&
          !isNestedInTitle(child)
        ) {
          if (expanded) {
            child.style.removeProperty("display");
          } else {
            child.style.display = "none";
          }
        }
      });
    }
    toggle();
    sectionHeader.addEventListener("click", toggle);
  });

// Expand the section for any active page section in the hash on initial page load
function expandCurrentHash() {
  setTimeout(function () {
    const hash = window.location.hash.slice(1);
    const focusedSection = document.getElementById(hash);
    const toggle = focusedSection.querySelector(".toggle");
    if (toggle) {
      toggle.innerHTML = "&#9662;";
      focusedSection.querySelectorAll("*").forEach((child) => {
        if (
          !child.className.includes("sectiontitle") &&
          !child.className.includes("toggle") &&
          !isNestedInTitle(child)
        ) {
          if (child.style.display === "none") {
            child.style.removeProperty("display");
          }
        }
      });
    }
  }, 0); //Use a delay to wait for the DOM to load
}

  if (window.location.hash) {
    expandCurrentHash();
  }

  window.addEventListener("hashchange", expandCurrentHash);

  // Expand any section navigated to with mini-toc links
  const navLinks = document.querySelectorAll(".wh_topic_toc a");
  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", expandCurrentHash);
  });
});