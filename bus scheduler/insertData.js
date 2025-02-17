const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'busScheduler';

// Collection Name
const collectionName = 'buses';

// JSON data to be inserted
const jsonData = [
    {
        "busNumber": "20A",
        "busName": "Chennai Express",
        "busTimings": ["08:00 AM", "12:30 PM", "03:45 PM"],
        "places": ["Chennai", "Coimbatore", "Madurai"]
    },
    {
        "busNumber": "01B",
        "busName": "Madurai Explorer",
        "busTimings": ["09:15 AM", "01:45 PM", "04:30 PM"],
        "places": ["Madurai", "Trichy", "Tirunelveli"]
    },
    {
        "busNumber": "12C",
        "busName": "Coimbatore Voyager",
        "busTimings": ["07:30 AM", "11:00 AM", "02:15 PM"],
        "places": ["Coimbatore", "Erode", "Salem"]
    },
    {
        "busNumber": "08D",
        "busName": "Vellore Wanderer",
        "busTimings": ["08:45 AM", "01:15 PM", "05:00 PM"],
        "places": ["Vellore", "Tirupattur", "Arcot"]
    },
    {
        "busNumber": "02E",
        "busName": "Tirunelveli Express",
        "busTimings": ["09:30 AM", "02:00 PM", "05:30 PM"],
        "places": ["Tirunelveli", "Kanyakumari", "Rameswaram"]
    },
    {
        "busNumber": "10A",
        "busName": "Tiruchirappalli Adventure",
        "busTimings": ["10:00 AM", "02:30 PM", "06:15 PM"],
        "places": ["Tiruchirappalli", "Thanjavur", "Kumbakonam"]
    },
    {
        "busNumber": "25B",
        "busName": "Salem Express",
        "busTimings": ["07:00 AM", "12:00 PM", "03:30 PM"],
        "places": ["Salem", "Namakkal", "Dharmapuri"]
    },
    {
        "busNumber": "05C",
        "busName": "Erode Dreamer",
        "busTimings": ["08:30 AM", "01:00 PM", "04:45 PM"],
        "places": ["Erode", "Tirupur", "Pollachi"]
    },
    {
        "busNumber": "04D",
        "busName": "Kanyakumari Voyager",
        "busTimings": ["09:45 AM", "02:15 PM", "05:45 PM"],
        "places": ["Kanyakumari", "Nagercoil", "Tuticorin"]
    },
    {
        "busNumber": "10E",
        "busName": "Trichy Explorer",
        "busTimings": ["08:15 AM", "12:45 PM", "04:00 PM"],
        "places": ["Trichy", "Karur", "Dindigul"]
    },
    {
        "busNumber": "15A",
        "busName": "Tirupur Wanderer",
        "busTimings": ["10:30 AM", "03:00 PM", "06:30 PM"],
        "places": ["Tirupur", "Avanashi", "Udumalpet"]
    },
    {
        "busNumber": "112B",
        "busName": "Thanjavur Adventure",
        "busTimings": ["07:45 AM", "01:30 PM", "05:15 PM"],
        "places": ["Thanjavur", "Kumbakonam", "Nagapattinam"]
    },
    {
        "busNumber": "133C",
        "busName": "Namakkal Express",
        "busTimings": ["09:00 AM", "02:45 PM", "06:00 PM"],
        "places": ["Namakkal", "Rasipuram", "Attur"]
    },
    {
        "busNumber": "15D",
        "busName": "Dharmapuri Voyager",
        "busTimings": ["08:45 AM", "01:45 PM", "04:15 PM"],
        "places": ["Dharmapuri", "Krishnagiri", "Hosur"]
    },
    {
        "busNumber": "114E",
        "busName": "Tuticorin Dreamer",
        "busTimings": ["10:15 AM", "03:30 PM", "07:00 PM"],
        "places": ["Tuticorin", "Tirunelveli", "Nagercoil"]
    },
    {
        "busNumber": "11A",
        "busName": "Dindigul Explorer",
        "busTimings": ["07:30 AM", "12:15 PM", "03:00 PM"],
        "places": ["Dindigul", "Theni", "Bodinayakanur"]
    },
    {
        "busNumber": "16B",
        "busName": "Karur Wanderer",
        "busTimings": ["09:15 AM", "01:45 PM", "05:30 PM"],
        "places": ["Karur", "Namakkal", "Trichy"]
    },
    {
        "busNumber": "18C",
        "busName": "Nagercoil Dreamer",
        "busTimings": ["08:00 AM", "12:30 PM", "04:15 PM"],
        "places": ["Nagercoil", "Kanyakumari", "Tirunelveli"]
    },
    {
        "busNumber": "116D",
        "busName": "Tiruvannamalai Voyager",
        "busTimings": ["10:30 AM", "03:00 PM", "06:45 PM"],
        "places": ["Tiruvannamalai", "Villupuram", "Chengalpattu"]
    },
    {
        "busNumber": "10E",
        "busName": "Tirupattur Express",
        "busTimings": ["09:45 AM", "02:15 PM", "05:45 PM"],
        "places": ["Tirupattur", "Vaniyambadi", "Ambur"]
    },
    {
        "busNumber": "215A",
        "busName": "Tiruvallur Adventure",
        "busTimings": ["08:30 AM", "01:00 PM", "04:30 PM"],
        "places": ["Tiruvallur", "Arakkonam", "Tiruttani"]
    },
    {
        "busNumber": "23B",
        "busName": "Rasipuram Explorer",
        "busTimings": ["07:15 AM", "11:45 AM", "03:15 PM"],
        "places": ["Rasipuram", "Namakkal", "Salem"]
    },
    {
        "busNumber": "21C",
        "busName": "Hosur Express",
        "busTimings": ["09:00 AM", "02:30 PM", "06:15 PM"],
        "places": ["Hosur", "Krishnagiri", "Dharmapuri"]
    },
    {
        "busNumber": "14D",
        "busName": "Pollachi Dreamer",
        "busTimings": ["08:45 AM", "01:15 PM", "04:45 PM"],
        "places": ["Pollachi", "Udumalpet", "Palani"]
    },
    {
        "busNumber": "20E",
        "busName": "Attur Voyager",
        "busTimings": ["07:30 AM", "12:00 PM", "03:30 PM"],
        "places": ["Attur", "Salem", "Namakkal"]
    },
    // Add other bus objects here...
];

// Function to insert data into MongoDB
async function insertData() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Insert JSON data into the collection
        const result = await collection.insertMany(jsonData);
        console.log(`${result.insertedCount} documents inserted`);

    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        // Close the connection
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

// Call the insertData function
insertData();
