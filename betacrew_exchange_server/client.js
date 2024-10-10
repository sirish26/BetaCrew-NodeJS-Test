const net = require('net');

const HOST = 'localhost';
const PORT = 3000;
const client = new net.Socket();
let BUFFER_COLLECTOR = Buffer.alloc(0);
const receivedSequences = new Set();

client.on('data', (data) => {
    BUFFER_COLLECTOR = Buffer.concat([BUFFER_COLLECTOR, data]);
    processResponse();
});

client.on('connect', () => {
    console.log('Connected to server.');
    const payload = Buffer.alloc(2);
    payload.writeInt8(1, 0);
    payload.writeInt8(0, 1); 
    client.write(payload);
});

client.on('close', () => {
    console.log('Connection closed.');
    requestMissingPackets();
});

client.on('error', (err) => console.error('Error:', err.message));

client.connect(PORT, HOST, () => console.log(`TCP client connected to ${HOST}:${PORT}`));

function processResponse() {
    while (BUFFER_COLLECTOR.length >= 14) {
        // Attempted different encodings like ascii, utf8, hex, but still unable to process the symbol correctly
        const symbol = BUFFER_COLLECTOR.slice(0, 4).toString('ascii').trim(); 
        const buySellIndicator = BUFFER_COLLECTOR.readInt8(4); 
        let quantity = Math.max(0, BUFFER_COLLECTOR.readInt32BE(5)); 
        let price = Math.max(0, BUFFER_COLLECTOR.readInt32BE(9));
        const packetSequence = BUFFER_COLLECTOR.readInt32BE(13);

        receivedSequences.add(packetSequence);
        console.log({ symbol, buySellIndicator, quantity, price });

        BUFFER_COLLECTOR = BUFFER_COLLECTOR.slice(14);
    }
}

function requestMissingPackets() {
    const totalPackets = Math.max(...receivedSequences);
    for (let i = 1; i <= totalPackets; i++) {
        if (!receivedSequences.has(i)) {
            const resendPayload = Buffer.alloc(5); 
            resendPayload.writeInt8(2, 0); 
            resendPayload.writeInt32BE(i, 1); 
            client.write(resendPayload);
        }
    }
}
