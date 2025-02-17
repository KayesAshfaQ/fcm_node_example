const express = require('express');

const app = express();
const admin = require('firebase-admin');
// const serviceAccount = require('/home/kayes/Downloads/cartupstage-firebase-adminsdk-ke0ra-932332eef3.json'); // Update the path to your service account key file
const serviceAccount = require('/Users/tn99249/Downloads/cartupstage-firebase-adminsdk-ke0ra-932332eef3.json'); // Update the path to your service account key file

// Middleware to parse the request body as JSON data
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const PORT = 3000;

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
});

app.get('/', (req, res) => {
    res.status(200);
    res.send('Welcome to the root URL of the server');
});

// Endpoint to send push notification
app.post('/send-notification', (req, res) => {
    const { token, message } = req.body;

    const payload = {
        token: token,
        notification: {
            title: 'Notification Title',
            body: message
        },
        data: {
            "Nick": "Mario",
            "Room": "PortugalVSDenmark"
        },
        android: {
            "notification": {
                "image": "https://picsum.photos/640/360"
            }
        },
    };

    admin.messaging().send(payload)
        .then(response => {
            res.status(200).send('Notification sent successfully');
        })
        .catch(error => {
            res.status(500).send('Error sending notification: ' + error);
        });
});