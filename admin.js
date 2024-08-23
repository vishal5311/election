document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const password = document.getElementById('adminPassword').value;

    if (password === 'admin') { // Replace with your chosen admin password
        document.getElementById('results').style.display = 'block';
        await loadResults();
    } else {
        alert('Incorrect password.');
    }
});

async function loadResults() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxA8ZIox5ntqsJEFIvzo_180C54t7s9eEIA1Xx8QQ7iiyeR_tJZqAXvxrNgiWBiTX4o/exec'); // Replace with your Google Apps Script web app URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const tableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';

        data.forEach(row => {
            const newRow = tableBody.insertRow();
            newRow.insertCell().textContent = row[0]; // Registration Number
            newRow.insertCell().textContent = row[1]; // Candidate
            newRow.insertCell().textContent = row[2]; // Timestamp
        });
    } catch (error) {
        console.error('Error fetching results:', error);
    }
}
