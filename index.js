const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const qrcode = require("qrcode-terminal")
const WebSocket = require("ws")

async function connect() {
    const { state, saveCreds } = await useMultiFileAuthState("auth")
    const sock = makeWASocket({ auth: state })

    sock.ev.on("connection.update", ({ connection, qr }) => {
        if (qr) qrcode.generate(qr, { small: true })
        if (connection === "open") console.log("✅ Conectado ao WhatsApp!")
    })

    sock.ev.on("creds.update", saveCreds)
}

connect()
