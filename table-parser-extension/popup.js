// Dummy data for the table
const dummyData = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson' },
    { id: 2, firstName: 'Bob', lastName: 'Smith' },
    { id: 3, firstName: 'Charlie', lastName: 'Brown' },
    { id: 4, firstName: 'David', lastName: 'White' },
    { id: 5, firstName: 'Eve', lastName: 'Taylor' },
    { id: 6, firstName: 'Frank', lastName: 'Miller' },
    { id: 7, firstName: 'Grace', lastName: 'Davis' },
    { id: 8, firstName: 'Helen', lastName: 'Wilson' },
    { id: 9, firstName: 'Ivy', lastName: 'Moore' },
    { id: 10, firstName: 'Jack', lastName: 'Reynolds' }
];

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

    // Filter the dummy data based on the search query (first or last name)
    const filteredData = dummyData.filter(person => {
        return person.firstName.toLowerCase().includes(searchQuery) || person.lastName.toLowerCase().includes(searchQuery);
    });

    // Render the filtered data in the table
    renderTable(filteredData);

    // Get the number of <table> elements on the current page using chrome.scripting.executeScript
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => document.querySelectorAll("table").length
        }, (results) => {
            // Get the count from the script result
            const tableCount = results[0].result;

            // Display the number of tables found on the page
            const tableCountElement = document.createElement('h2');
            tableCountElement.textContent = `Tables found on this page: ${tableCount}`;
            document.body.insertBefore(tableCountElement, document.querySelector('.search-container'));
        });
    });
});
