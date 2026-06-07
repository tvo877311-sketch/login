// server.js
const express = require('express');
const app = express();
app.use(express.json());

const VALID_USERS = {
    "Enox": "Enox2024",
    "admin": "admin123",
    "VIP": "VIP2024"
};

app.post('/api/login', (req, res) => {
    const { username, password, hwid } = req.body;
    
    if (VALID_USERS[username] && VALID_USERS[username] === password) {
        res.json({
            success: true,
            message: "Login erfolgreich",
            token: "ENOX-" + Date.now() + "-" + hwid,
            user: { username: username, rank: "Premium" }
        });
    } else {
        res.json({
            success: false,
            message: "Falscher Benutzername oder Passwort"
        });
    }
});

app.listen(3000, () => console.log('API läuft auf Port 3000'));
