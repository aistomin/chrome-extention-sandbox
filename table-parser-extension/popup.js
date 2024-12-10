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
            func: extractTableData
        }, (results) => {
            // The result contains the extracted table data
            const extractedData = results[0].result;

            // Filter the data based on the search query (first or last name)
            const filteredData = extractedData.filter(person => {
                return person.firstName.toLowerCase().includes(searchQuery) ||
                    person.lastName.toLowerCase().includes(searchQuery) ||
                    person.firstName.toLowerCase().concat(' ').concat(person.lastName.toLowerCase()).includes(searchQuery.toLowerCase());
            });

            // Render the filtered data in the table
            renderTable(filteredData);
        });
    });
});

// Function to extract table data from the active page
function extractTableData() {
    // Extract table rows
    const rows = document.querySelectorAll('table tbody tr');
    const data = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 3) {
            // Push the extracted data into the array
            data.push({
                id: parseInt(cells[0].textContent.trim()),
                firstName: cells[1].textContent.trim(),
                lastName: cells[2].textContent.trim()
            });
        }
    });

    return data;  // Return the extracted data as an array of objects
}
