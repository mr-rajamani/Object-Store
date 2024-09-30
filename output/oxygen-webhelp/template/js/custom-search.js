document.addEventListener('DOMContentLoaded', async (event) => {
    // Extract the URL parameters
    const params = new URLSearchParams(window.location.search);
    // Get the value of the 'searchQuery' parameter from the URL
    const searchQuery = params.get('searchQuery');

    // Find the search form in the document by its ID
    const searchForm = document.getElementById('searchForm');
    if (searchQuery) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission behavior
            // Get the search query value from the form input field
            const formData = new FormData(searchForm);
            const searchValue = formData.get('searchQuery');
            // Proceed if a search query is entered
            if (searchValue) {
                // Update 'searchQuery' parameter with the new value
                params.set('searchQuery', searchValue);

                // Return to page 1
                if (params.has('zoom_page')) {
                    params.delete('zoom_page');
                    }
    
                // Construct the query string
                let queryString = '';
                for (const [key, value] of params.entries()) {
                    queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
                }
                // Remove the trailing '&'
                queryString = queryString.slice(0, -1);
                
                // Create the new URL with updated parameters
                const newUrl = `${window.location.pathname}?${queryString}`;
                // Redirect the page to the new URL
                window.location.href = newUrl;
            }
        });

        // Load necessary Zoom search files
        await loadZoomSearchFiles();

        // Call Zoom search function with the searchQuery
        performZoomSearch(searchQuery);

    }
});

async function loadZoomSearchFiles() {
    try {
        console.log("Loading Zoom search files...");
        await appendScript('../../zoom_search/settings.js');
        await appendScript('../../zoom_search/zoom_index.js');
        await appendScript('../../zoom_search/zoom_pageinfo.js');        
        await appendScript('../../zoom_search/search.js');        
        await appendStylesheet('../../zoom_search/zoom_search.css');


        console.log("All Zoom search files loaded successfully.");
    } catch (error) {
        console.error("Error loading Zoom search files:", error);
    }
}


async function performZoomSearch(query) {
    // Call the Search function from the loaded search.js file
    if (typeof ZoomSearch !== 'undefined') {
  // The ZoomSearch object is available
  // You can now use the ZoomSearch object and its methods
  // For example: ZoomSearch.ZoomInitSearch();
        console.log("YOU CAN USE ZOOMSEARCH OBJECT");
        const searchResults = ZoomSearch(query);
         // Return the search results
         return searchResults;

    } else {
      // The ZoomSearch object is not available
      // This might indicate an issue with script loading or execution
        console.log("***The ZoomSearch object is not available***");
    }
}

function appendScript(src) {
    console.log("Loading script:", src); // Add this line
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
        console.log("AppendedChild =>", script); // Add this line
    });
}

function appendStylesheet(href) {
    console.log("Loading stylesheet:", href); // Add this line
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    console.log("AppendedChild =>", link); // Add this line
}