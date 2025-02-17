document.addEventListener('DOMContentLoaded', function () {
    let busesData; // Declare busesData variable

    const tabs = document.querySelectorAll('nav a');
    const searchInput = createSearchInput(); // Create the search input

    tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showTabContent(targetId);

            // Check if the clicked tab is the "Bus Services" tab
            if (targetId === 'services') {
                fetch('busData.json') // Fetch data from busData.json
                    .then(response => response.json())
                    .then(data => {
                        busesData = data; // Set busesData to the fetched data
                        displayBuses(busesData);
                        // Show the search input in the "Bus Services" tab
                        searchInput.style.display = 'block';
                    })
                    .catch(error => console.error('Error fetching data:', error));
            } else if (targetId === 'booking') {
                fetch('busData.json')
                    .then(response => response.json())
                    .then(data => {
                        busesData = data;
                        displayBookingBuses(busesData);
                        //searchInput.style.display = 'block';
                    })
                    .catch(error => console.error('Error fetching booking data:', error));
            } else {
                searchInput.style.display = 'none';
            }
        });
    });

    // Display default tab content
    showTabContent('home');

    function createSearchInput() {
        const searchInput = document.createElement('input');
        searchInput.placeholder = 'Search Bus';
        searchInput.style.display = 'none'; // Initially hide the search input
        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredBuses = busesData.filter(bus => {
                return bus.busName.toLowerCase().includes(searchTerm) || 
                       bus.busNumber.toLowerCase().includes(searchTerm) || 
                       bus.places.some(place => place.toLowerCase().includes(searchTerm));
            });
            displayBuses(filteredBuses);
        });
        document.querySelector('nav').appendChild(searchInput);

        return searchInput;
    }
});

function showTabContent(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });

    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.style.display = 'block';
    }
}

function displayBuses(buses) {
    const busList = document.getElementById('busListBody');
    busList.innerHTML = '';

    buses.forEach(bus => {
        const row = document.createElement('tr');

        const busNumberCell = document.createElement('td'); // Create a new cell for bus number
        busNumberCell.textContent = bus.busNumber; // Set the text content to the bus number
        row.appendChild(busNumberCell); // Append the cell to the row

        const busNameCell = document.createElement('td');
        busNameCell.textContent = bus.busName;
        row.appendChild(busNameCell);

        const timingsCell = document.createElement('td');
        timingsCell.textContent = bus.busTimings.join(', ');
        row.appendChild(timingsCell);

        const placesCell = document.createElement('td');
        placesCell.textContent = bus.places.join(', ');
        row.appendChild(placesCell);

        busList.appendChild(row);
    });
}

function displayBookingBuses(buses) {
    const busSelect = document.getElementById('busSelectBooking');
    busSelect.innerHTML = '';

    buses.forEach(bus => {
        const option = document.createElement('option');
        option.value = bus.busName;
        option.textContent = bus.busName;
        busSelect.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('ticketFormBooking');
    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const selectedBus = document.getElementById('busSelectBooking').value;
        const passengerName = document.getElementById('nameInputBooking').value;
        const passengerEmail = document.getElementById('emailInputBooking').value;

        // Implement your booking logic here (e.g., send data to a server or display a confirmation message)
        // For demonstration purposes, let's just display a confirmation message
        const confirmationMessage = document.getElementById('confirmationMessageBooking');
        confirmationMessage.textContent = `Ticket booked successfully for ${passengerName} on ${selectedBus}. Check your email for details.`;
        confirmationMessage.style.display = 'block';
    });
});

function submitForm() {
    // Perform any form submission logic here (e.g., sending data to a server)

    // Display the confirmation message
    var confirmationMessage = document.getElementById("confirmationMessageBooking");
    confirmationMessage.style.display = "block";

    // Prevent the default form submission
    return false;
}

let popup=document.getElementById("popup");
function openPopup(){
    popup.classList.add("open-popup");
}
function closePopup(){
    popup.classList.remove("open-popup");
}

function showReturnDate() {
    var tripTypeSelect = document.getElementById("tripType");
    var returnDateLabel = document.getElementById("returnDateLabel");
    var returnDateInput = document.getElementById("returnDate");
  
    if (tripTypeSelect.value === "return") {
      returnDateLabel.style.display = "block";
      returnDateInput.style.display = "block";
    } else {
      returnDateLabel.style.display = "none";
      returnDateInput.style.display = "none";
    }
}
// Fetch the content of terms.html and inject it into the "Terms and Conditions" section
function loadTermsAndConditions() {
    fetch('terms.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('terms').innerHTML = data;
      })
      .catch(error => console.error('Error loading terms and conditions:', error));
  }
  
  // Call the function to load terms and conditions when the page loads
  document.addEventListener('DOMContentLoaded', loadTermsAndConditions);
  // Function to fetch and display contact information
function displayContactInfo() {
    fetch('contact.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('contact').innerHTML = data;
      })
      .catch(error => console.error('Error loading contact information:', error));
  }
  
  // Call the function to display contact information when the page loads
  document.addEventListener('DOMContentLoaded', displayContactInfo);
  
  document.addEventListener('DOMContentLoaded', function () {
    const reservationTableBody = document.getElementById('reservationTableBody');

    // Fetch reservation data from JSON file
    fetch('reservation.json')
        .then(response => response.json())
        .then(data => {
            displayReservationCenters(data);
        })
        .catch(error => console.error('Error fetching reservation data:', error));

    // Function to display reservation centers in a table
    function displayReservationCenters(reservationCenters) {
        reservationTableBody.innerHTML = ''; // Clear the table body before adding new data

        reservationCenters.forEach(center => {
            const row = document.createElement('tr');

            const locationCell = document.createElement('td');
            locationCell.textContent = center.location;
            row.appendChild(locationCell);

            const addressCell = document.createElement('td');
            addressCell.textContent = center.address;
            row.appendChild(addressCell);

            reservationTableBody.appendChild(row);
        });
    }
});
async function updateBusSelection() {
    const fromDropdown = document.getElementById('fromDropdown');
    const toDropdown = document.getElementById('toDropdown');
    const selectedFrom = fromDropdown.value;
    const selectedTo = toDropdown.value;

    const buses = await fetchBuses();
    const matchingBuses = buses.filter(bus =>
        bus.places.includes(selectedFrom) && bus.places.includes(selectedTo)
    );

    const busSelect = document.getElementById('busSelect');
    busSelect.innerHTML = '';

    if (matchingBuses.length > 0) {
        matchingBuses.forEach(bus => {
            const option = document.createElement('option');
            option.value = bus.busName;
            option.text = `${bus.busName} - ${bus.busNumber}`;
            busSelect.appendChild(option);
        });
    } else {
        const option = document.createElement('option');
        option.text = 'No buses available';
        busSelect.appendChild(option);
    }
}
