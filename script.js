// Initialize Supabase
const SUPABASE_URL = 'https://cmjnvstkuhjzwyjpntjw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtam52c3RrdWhqend5anBudGp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0MzQzODUsImV4cCI6MjA0MDAxMDM4NX0.whN7hxLkAIRkaJw719exc1xf4SlNQLIiJkKD1FOaNrw';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById('voteForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const regNumber = document.getElementById('regNumber').value;
    const candidate = document.querySelector('input[name="candidate"]:checked').value;

    if (!candidate) {
        document.getElementById('statusMessage').textContent = 'Please select a candidate.';
        return;
    }

    // Save the vote to Supabase
    try {
        const { data, error } = await supabase
            .from('votes')
            .upsert({ reg_number: regNumber, candidate: candidate }, { onConflict: ['reg_number'] });

        if (error) throw error;
        document.getElementById('statusMessage').textContent = 'Your vote has been recorded.';
    } catch (error) {
        document.getElementById('statusMessage').textContent = 'An error occurred. Please try again.';
    }
});
