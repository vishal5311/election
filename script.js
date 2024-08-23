document.getElementById('voteForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const regNumber = document.getElementById('regNumber').value;
    const candidate = document.querySelector('input[name="candidate"]:checked').value;

    if (!candidate) {
        document.getElementById('statusMessage').textContent = 'Please select a candidate.';
        return;
    }

    // Prepare data for submission
    const response = await fetch('https://script.google.com/macros/s/AKfycbwS3B5N0glosL0P5tVeowbtwQ3_vOy86fW45Xw0GRrXZWQ175yy7aKy59oBA6bda1k4/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            regNumber: regNumber,
            candidate: candidate,
        }),
    });

    const result = await response.text();
    document.getElementById('statusMessage').textContent = result;
});
