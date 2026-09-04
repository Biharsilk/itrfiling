const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

// Serve the directory containing your index.html
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Function to dynamically grab your machine's local IPv4 address
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const localIP = getLocalIP();

// Bind to 0.0.0.0 to allow external network access (your mobile phone)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Localhost Server Running!`);
    console.log(`--------------------------------------------------`);
    console.log(`💻 Test on PC:     http://localhost:${PORT}`);
    console.log(`📱 Test on Mobile: http://${localIP}:${PORT}`);
    console.log(`--------------------------------------------------`);
    console.log(`⚠️  CRITICAL FIREBASE STEP:`);
    console.log(`You MUST add '${localIP}' to your Firebase Authorized Domains!`);
});