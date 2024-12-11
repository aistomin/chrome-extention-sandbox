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
            func: search,
            args: [searchQuery]
        }, (results) => {
            // The result contains the enriched table data with email and phone
            const enrichedData = results[0].result;

            // Render the enriched data in the table
            renderTable(enrichedData);
        });
    });
});

// Function to extract table data from the active page and enrich with the data from popup.
function search(query) {
    const rows = document.querySelectorAll('table tbody tr'); // read rows

    const result = [];
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
            // Read the flat data from the table.
            const id = parseInt(cells[0].textContent.trim());
            const firstName = cells[1].textContent.trim();
            const lastName = cells[2].textContent.trim();
            // Read additional fields, that are hidden behind the "Details" link.
            const detailsLink = cells[3].querySelector('.details-link');
            detailsLink.click(); // click the link
            const email = document.getElementById('popup-email').textContent.trim(); // read from popup
            const phone = document.getElementById('popup-phone').textContent.trim(); // read from popup
            document.getElementById('close-btn').click(); // close popup
            // Check if the row matches the search query
            const fullName  =`${firstName.toLowerCase()} ${lastName.toLowerCase()}`
            if (fullName.includes(query) || email.includes(query) || phone.includes(query)) {
                result.push({ id, firstName, lastName, email, phone });
            }
        }
    });
    return result;
}
