const setupVersionNavigation = async () => {
  // Feature is online only, so return immediately if not http/https
  const protocol = window.location.protocol;
  if (!protocol.includes("http")) {
    return;
  }

    //Suppress the feature for SimSolid Cloud and SmartWorks
    const currentPage = window.location.href;
    if (currentPage.includes("/ss_cloud/") || 
        currentPage.includes("/ss_cloudone/") ||
        currentPage.includes("/smartworks/") ||
        currentPage.includes("/SmartWorks_IoT/") ||
        currentPage.includes("altair-iot")) {
        return;
    }

  

  (function () {
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
  })();


  const statuses = [];
  let versionNode,
    versionNodeSelector,
    versionSelector,
    currentVersion,
    production = false,
    latestVersion = localStorage.getItem("latest") ?? "";

  async function checkVersions() {
    // Populate the selector with all available verison options for the page
    selectActiveNode();
    setupVersionNode();
    // Pre-render the selector with the current version on initial render as a placeholder until fully populated
    const option = document.createElement("option");
    latestVersion === currentVersion.toString()
      ? (defaultOptionTextContent = `${currentVersion} (Latest)`)
      : (defaultOptionTextContent = currentVersion);
    option.setAttribute("value", currentVersion);
    option.classList.add("version-option");
    option.textContent = defaultOptionTextContent;
    versionSelector.append(option);
    versionNode.appendChild(versionSelector);

    const versionsToCheck = [];
    const currentYear = new Date().getFullYear() + 1;
    var path_lower = window.location.pathname.toLowerCase();
      if (path_lower.indexOf("/feko") >= 0 || 
          path_lower.indexOf("/newfasant") >= 0 || 
          path_lower.indexOf("/winprop") >= 0) {
          for (let i = 2022; i <= currentYear; i++) {
              versionsToCheck.push(String(i));
              versionsToCheck.push(String(i + 0.1));
              versionsToCheck.push(String(i + 0.1) + ".2");
              versionsToCheck.push(String(i + 0.1) + ".1");
              versionsToCheck.push(String(i + 0.1) + ".0");
              versionsToCheck.push(String(i + 0.2));
              versionsToCheck.push(String(i + 0.2) + ".2");
              versionsToCheck.push(String(i + 0.2) + ".1");
              versionsToCheck.push(String(i + 0.2) + ".0");
              versionsToCheck.push(String(i + 0.3));
              versionsToCheck.push(String(i + 0.3) + ".2");
              versionsToCheck.push(String(i + 0.3) + ".1");
              versionsToCheck.push(String(i + 0.3) + ".0");

          }
      }
      else if (path_lower.indexOf("/accelerator") >= 0 || 
               path_lower.indexOf("/wrap") >= 0||
               path_lower.indexOf("/access") >= 0 ||
               path_lower.indexOf ("/insightpro") >= 0) {
          for (let i = 2022; i <= currentYear; i++) {
              versionsToCheck.push(String(i));
              versionsToCheck.push(String(i + 0.1) + ".2");
              versionsToCheck.push(String(i + 0.1) + ".1");
              versionsToCheck.push(String(i + 0.1) + ".0");
              versionsToCheck.push(String(i + 0.2) + ".2");
              versionsToCheck.push(String(i + 0.2) + ".1");
              versionsToCheck.push(String(i + 0.2) + ".0");
              versionsToCheck.push(String(i + 0.3) + ".2");
              versionsToCheck.push(String(i + 0.3) + ".1");
              versionsToCheck.push(String(i + 0.3) + ".0");

          }
      }
      else {
          for (let i = 2022; i <= currentYear; i++) {
              versionsToCheck.push(String(i));
              versionsToCheck.push(String(i + 0.1));
              versionsToCheck.push(String(i + 0.2));
              versionsToCheck.push(String(i + 0.3));

          }
      }
    const fetches = [];
    let hostname = window.location.hostname;
    if (!hostname.includes("staging") && !hostname.includes("dev")) {
      production = true;
    }
    for (let i = 0; i < versionsToCheck.length; i++) {
      if (production) {
        hostname = `${versionsToCheck[i]
          .toString()
          .slice(0, 4)}.help.altair.com`;
        }
        let version_folder = "";
        if (window.location.hostname == "help.altair.com") {
            version_folder = "/" + versionsToCheck[i];
        }
        //console.log("currentVersion: " + currentVersion);
        //console.log("versionsToCheck: " + versionsToCheck[i]);
      fetches.push(
        fetch(
            `https://${hostname}${version_folder}${(window.location.pathname + "?nonverck=1").replace(
            currentVersion,
            versionsToCheck[i]
          )}`
        )
          .then((res) => {
            if (res.status === 200 && !res.url.includes('404.htm')) {
              // console.log(currentVersion, versionsToCheck[i]);
              // console.log(`Pushing ${versionsToCheck[i]}`);
              statuses.push([versionsToCheck[i]]);
            } else if (res.status === 404) {
              return Promise.reject(res.status);
            }
          })
          .catch((error) => {})
      );
    }
    Promise.allSettled(fetches).then(() => {
      // console.log("All statuses resolved");
      // console.log(statuses);
      // statuses.sort((a, b) => b - a);
      statuses.sort().reverse();
      setupVersionOptions();
    });
  }

  async function selectActiveNode() {
    //Select the active version node depending on context
    versionNode = document.querySelector(".wh_version");
    currentVersion = versionNode.querySelector("p").textContent;
  }

  async function setupVersionNode() {
    majorVersion = currentVersion.slice(0, 4);
    versionNode.querySelector("p").remove();
    versionSelector = document.createElement("select");
    versionSelector.className = "version-selector";
    versionSelector.style.minWidth = "112.5px";
  }

  checkVersions();

  async function setupVersionOptions() {
    // Generate version options for all available pages
    for (let i = 0; i < statuses.length; i++) {
      const option = document.createElement("option");
      defaultOptionTextContent = statuses[i];
      if (i === 0 && parseFloat(currentVersion) !== statuses[0]) {
        versionSelector.options[0].value = defaultOptionTextContent;
        versionSelector.options[0].textContent = `${defaultOptionTextContent} (Latest)`;
      } else {
        if (i === 0) {
          defaultOptionTextContent += ` (Latest)`;
        }
        option.setAttribute("value", statuses[i]);
        option.textContent = defaultOptionTextContent;
        versionSelector.append(option);
        versionSelector.value = currentVersion;
      }
    }

    latestVersion =
      document.querySelector(".version-selector").children[0].value;
    localStorage.setItem("latest", latestVersion);
  }

  versionSelector.addEventListener("change", () => {
    console.log(versionSelector.value);
    let domain = `https://${window.location.hostname}`;
    let version_folder = "";
    if (production) {
        domain = `https://${versionSelector.value.slice(0, 4)}.help.altair.com`;
    }
    if (window.location.hostname == "help.altair.com") {
        version_folder = "/" + versionSelector.value;
    }
    var newPathname = (version_folder + window.location.pathname);

    if (window.location.hostname != "help.altair.com") {
        newPathname = newPathname.replace(
            currentVersion,
            versionSelector.value
        );
    }
    
    window.location.href = `${domain}${newPathname}`;
});

};

setupVersionNavigation();
