// Function to render the table with the given data
function renderTable(data) {
    const tableBody = document.getElementById('table-body');
    const resultsTable = document.getElementById('results-table');

    // Clear the existing rows
    tableBody.innerHTML = '';

    // If no data is found, hide the table and return
    if (data.length === 0) {
        resultsTable.style.display = 'none';
        return;
    }

    // Populate the table with the filtered data
    data.forEach(person => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.id}</td>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.email}</td>
            <td>${person.phone}</td>
        `;
        tableBody.appendChild(row);
    });

    // Show the table
    resultsTable.style.display = 'table';
}

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-name').value.toLowerCase();

    // Query the current active tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        // Extract the table data from the active page using scripting.executeScript
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: extractAndEnrichTableData,
            args: [searchQuery]
        }, (results) => {
            // The result contains the enriched table data with email and phone
            const enrichedData = results[0].result;

            // Render the enriched data in the table
            renderTable(enrichedData);
        });
    });
});

// Function to extract table data from the active page and enrich with email and phone
function extractAndEnrichTableData(searchQuery) {
    // Extract table rows
    const rows = document.querySelectorAll('table tbody tr');
    const data = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
            const id = parseInt(cells[0].textContent.trim());
            const firstName = cells[1].textContent.trim();
            const lastName = cells[2].textContent.trim();

            // Check if the row matches the search query
            if (
                firstName.toLowerCase().includes(searchQuery) ||
                lastName.toLowerCase().includes(searchQuery) ||
                `${firstName.toLowerCase()} ${lastName.toLowerCase()}`.includes(searchQuery)
            ) {
                // Simulate click on the "Details" link to open the popup
                const detailsLink = cells[3].querySelector('.details-link');
                if (detailsLink) {
                    detailsLink.click();

                    // Extract email and phone from the popup
                    const email = document.getElementById('popup-email').textContent.trim();
                    const phone = document.getElementById('popup-phone').textContent.trim();

                    // Close the popup
                    document.getElementById('close-btn').click();

                    // Add the enriched data to the array
                    data.push({ id, firstName, lastName, email, phone });
                }
            }
        }
    });

    return data; // Return the enriched data as an array of objects
}
