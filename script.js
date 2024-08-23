document.addEventListener('DOMContentLoaded', function() {
    // List of candidates
    const candidates = [
        { name: 'Candidate 1', image: 'candidate1.jpg' },
        { name: 'Candidate 2', image: 'candidate2.jpg' },
        // Add more candidates as needed
    ];

    const candidatesContainer = document.getElementById('candidates');

    // Inject candidates into the form
    candidates.forEach((candidate) => {
        const candidateDiv = document.createElement('div');
        candidateDiv.className = 'candidate';
        candidateDiv.innerHTML = `
            <input type="radio" id="${candidate.name}" name="candidate" value="${candidate.name}" required>
            <label for="${candidate.name}">
                <img src="${candidate.image}" alt="${candidate.name}" style="width:100px; height:auto;">
                <br>${candidate.name}
            </label>
        `;
        candidatesContainer.appendChild(candidateDiv);
    });

    document.getElementById('voteForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const regNumber = document.getElementById('regNumber').value;
        const candidate = document.querySelector('input[name="candidate"]:checked').value;

        if (!candidate) {
            document.getElementById('statusMessage').textContent = 'Please select a candidate.';
            return;
        }

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbw7gFGTrQkSqyseGdCJyFqMtRDwHqGmcBNbXU9vGCJWU62KzBtDV8H1dNDCo5Mftz4u/exec', { // Replace with your Google Apps Script URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    regNumber: regNumber,
                    candidate: candidate,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.text();
            document.getElementById('statusMessage').textContent = result;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('statusMessage').textContent = 'An error occurred. Please try again.';
        }
    });
});
