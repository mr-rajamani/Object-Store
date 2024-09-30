function initializeDarkMode() {
  //Remove the toggle if using Firefox. Local storage is unreliable when working with installed help.//
  if (navigator.userAgent.includes("Firefox") && window.location.protocol.includes("file")) {
    $(".darkModeToggle").remove();
    // Check if the user prefers a dark color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-theme');
    }
    // Check if the user prefers a light color scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.body.classList.remove('dark-theme');
    }
  return;
  }

  // Hide to prevent flicker
  $(".slider").css("visibility", "hidden");    

  // On page load, sets the checkbox state based on local storage//
  $(document).ready(function () {
    const toggle = document.querySelector(".darkModeToggle input");
    const onOff = toggle.parentNode.querySelector(".onoff");
    let isDarkThemeActive = localStorage.getItem("darkTheme") === "true";
    $("#toggleState").prop("checked", isDarkThemeActive);

    isDarkThemeActive
      ? (onOff.innerHTML = "&#9790")
      : (onOff.innerHTML = "&#9788");

    //To determine which CSS to display (light/dark), the script is placed at the beginning of the body element. This prevents the page from flickering
    //upon refresh. See altair-resources/xml/dark-theme and build.xml

    //When the button is clicked://
    const toggleCheckbox = document.querySelector("#toggleState");
    toggleCheckbox.addEventListener("change", function () {
      //Saves checkbox state to local storage//
      isDarkThemeActive = toggleCheckbox.checked;
      localStorage.setItem("darkTheme", isDarkThemeActive);
      //Button is off//
      if (!isDarkThemeActive) {
        //Sets button text and updates local storage//
        onOff.innerHTML = "&#9788";
        //Sets active CSS stylesheet and updates local storage//
        document.body.classList.toggle("dark-theme");
      }
      //Button is on//
      else {
        onOff.innerHTML = "&#9790";
        document.body.classList.toggle("dark-theme");
        window.scrollTo(0, document.body.scrollHeight);
      }
    });

    // Show and add class to apply transition
    $(".slider").css("visibility", "visible");
    setTimeout(function() {
      $(".slider").addClass("slider-transition");
    }, 400)
  });
}

initializeDarkMode();
