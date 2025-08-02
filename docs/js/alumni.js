import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { firebaseConfig } from "../config/firebase.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dbRef = ref(database, 'alumnis');

// Helper function to check if data in localStorage is expired
function isDataExpired(timestamp) {
    const oneDayInMs = 24 * 60 * 60 * 1000;
    return (Date.now() - timestamp) > oneDayInMs;
}

// Load Data from Firebase or LocalStorage
function loadData() {
    const storedData = localStorage.getItem('alumniData');
    const storedTimestamp = localStorage.getItem('alumniTimestamp');

    if (storedData && storedTimestamp && !isDataExpired(Number(storedTimestamp))) {
        console.log("Using cached data from localStorage");
        renderData(JSON.parse(storedData));
    } else {
        console.log("Fetching data from Firebase");
        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();

                // Store data in localStorage with a timestamp
                localStorage.setItem('alumniData', JSON.stringify(data));
                localStorage.setItem('alumniTimestamp', Date.now().toString());

                renderData(data);
            } 
        }).catch((error) => {
        });
    }
}

// Render data into the table
function renderData(data) {
    const tableBody = document.querySelector("#alumniTable tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    Object.values(data).forEach(entry => {
        const row = `
        <tr>
          <td>${entry.Name}</td>
          <td>${entry.Batch}</td>
          <td>${entry.Address}</td>
        </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    // Load DataTables once data is rendered
    loadDataTables();
}

// Load jQuery & DataTables
function loadDataTables() {
    $(document).ready(function () {
        $('#alumniTable').DataTable({
            pageLength: 20
        });
    });
}

// Start loading data
loadData();