const firebaseConfig = {
  apiKey: "AIzaSyD3yUJNY9sbX_IxWrSG1q_xmpLbovv-PPo",
  authDomain: "votingresults-e5ce8.firebaseapp.com",
  databaseURL: "https://votingresults-e5ce8-default-rtdb.firebaseio.com",
  projectId: "votingresults-e5ce8",
  storageBucket: "votingresults-e5ce8.appspot.com",
  messagingSenderId: "1000354773220",
  appId: "1:1000354773220:web:56f8fe031e65a5414ad4f1",
  measurementId: "G-1M56TB5DSV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

async function submitVote() {
  const regNo = document.getElementById('regNo').value.trim();
  const candidateName = document.getElementById('candidateName').value.trim();

  if (!regNo || !candidateName) {
      alert('Please enter a registration number and select a candidate.');
      return;
  }

  try {
      const regNoRef = database.ref('votes/' + regNo);
      const snapshot = await regNoRef.once('value');

      if (snapshot.exists()) {
          alert('Registration number already voted!');
      } else {
          await regNoRef.set({ candidate: candidateName });
          alert('Vote submitted successfully!');
      }

      document.getElementById('voteForm').reset();
  } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please check the console for details.');
  }
}

function refreshForm() {
  document.getElementById('voteForm').reset();
}
