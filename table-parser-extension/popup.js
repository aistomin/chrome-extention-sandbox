// Dummy data for the table
const dummyData = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', phone: '555-1234' },
    { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@example.com', phone: '555-2345' },
    { id: 3, firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com', phone: '555-3456' },
    { id: 4, firstName: 'David', lastName: 'White', email: 'david.white@example.com', phone: '555-4567' },
    { id: 5, firstName: 'Eve', lastName: 'Taylor', email: 'eve.taylor@example.com', phone: '555-5678' },
    { id: 6, firstName: 'Frank', lastName: 'Miller', email: 'frank.miller@example.com', phone: '555-6789' },
    { id: 7, firstName: 'Grace', lastName: 'Davis', email: 'grace.davis@example.com', phone: '555-7890' },
    { id: 8, firstName: 'Helen', lastName: 'Wilson', email: 'helen.wilson@example.com', phone: '555-8901' },
    { id: 9, firstName: 'Ivy', lastName: 'Moore', email: 'ivy.moore@example.com', phone: '555-9012' },
    { id: 10, firstName: 'Jack', lastName: 'Reynolds', email: 'jack.reynolds@example.com', phone: '555-1012' }
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

    // Filter the dummy data based on the search query (first or last name)
    const filteredData = dummyData.filter(person => {
        return person.firstName.toLowerCase().includes(searchQuery) || person.lastName.toLowerCase().includes(searchQuery);
    });

    // Render the filtered data in the table
    renderTable(filteredData);
});
