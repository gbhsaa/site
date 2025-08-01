import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { firebaseConfig } from "../config/firebase.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dbRef = ref(database, 'alumnis');

// Load Data from Firebase
get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        console.log("Data fetched successfully:", data);
        const tableBody = document.querySelector("#alumniTable tbody");

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
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error("Error fetching data:", error);
});

// Load jQuery & DataTables
function loadDataTables() {
    const script1 = document.createElement('script');
    script1.src = "https://code.jquery.com/jquery-3.7.0.min.js";
    script1.onload = () => {
        const script2 = document.createElement('script');
        script2.src = "https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js";
        script2.onload = () => {
            $(document).ready(function () {
                $('#alumniTable').DataTable({
                    pageLength: 20
                });
            });
        };
        document.body.appendChild(script2);
    };
    document.body.appendChild(script1);
}