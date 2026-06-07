const express = require('express');
const app = express();
app.use(express.json());

// GÜLTIGE BENUTZER - HIER KANNST DU USER HINZUFÜGEN/ÄNDERN
const VALID_USERS = {
    "Enox": "Enox2024",
    "admin": "admin123",
    "VIP": "VIP2024",
    "User1": "Passwort1",
    "Cracker": "HackMe",
    "Premium": "PremiumPass"
};

app.post('/api/login', (req, res) => {
    const { username, password, hwid } = req.body;
    
    console.log(`Login-Versuch: ${username} - HWID: ${hwid}`);
    
    if (!username || !password) {
        return res.json({
            success: false,
            message: "Benutzername und Passwort erforderlich"
        });
    }
    
    if (VALID_USERS[username] && VALID_USERS[username] === password) {
        const token = "ENOX-" + Date.now() + "-" + Math.random().toString(36).substr(2, 10);
        res.json({
            success: true,
            message: "Login erfolgreich",
            token: token,
            user: {
                username: username,
                rank: username === "VIP" ? "VIP" : "Premium",
                expires_at: Date.now() + (30 * 24 * 60 * 60 * 1000)
            }
        });
    } else {
        res.json({
            success: false,
            message: "Falscher Benutzername oder Passwort"
        });
    }
});

// OPTIONAL: Token-Validierung (falls du später Tokens prüfen willst)
app.post('/api/verify', (req, res) => {
    const { token, hwid } = req.body;
    // Hier kannst du Token-Validierung implementieren
    res.json({ success: true, valid: true });
});

// Health Check (für Render)
app.get('/health', (req, res) => {
    res.json({ status: "online", time: Date.now() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ API läuft auf Port ${PORT}`);
    console.log(`📍 Lokale URL: http://localhost:${PORT}`);
    console.log(`👥 Gültige User: ${Object.keys(VALID_USERS).join(', ')}`);
});
