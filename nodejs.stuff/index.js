const admin = require("firebase-admin");
const express = require("express");
const app = express();
var serviceAccount = require("./kontrakan-99a18-firebase-adminsdk-ub1jb-5127edd5db.json");

app.use(express.json());
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

app.post('/send-noti', (req, res) => {
    console.log(req.body);
    const message = {
        notification: {
            title: "MAUKOST",
            body: "Booking anda berhasil"
        },
        tokens: req.body.tokens,

    }
    admin.messaging().sendMulticast(message).then(res => {
        console.log("Successfully sent message:", res);
    }).catch(error => {
        console.log("Error sending message:", error);
    })
})


app.listen(3000, () => {
    console.log("Server started on port 3000");
})