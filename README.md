# BetaCrew NodeJS Test

This repository contains a TCP client application written in Node.js that connects to a TCP server. The client is designed to handle stock transaction data.

## Requirements

- Node.js (version 12 or higher)
- npm 
## Getting Started

### 1. Set Up the TCP Server

Before running the client application, you need to start the TCP server. The server is provided in a zip folder.

1. **Download and Extract the Zip Folder**
   - Extract the contents of the zip folder and put them in a directory on your local machine.

2. **Run the TCP Server**
   - Run the server by executing the command:
     ```bash
     node server.js
     ```
   - Ensure that the server is running successfully. You should see a message indicating that the server is listening for connections.

### 2. Run the TCP Client

1. **Download the Client Code**
   - Locate the `client.js` file in this repository.

2. **Run the Client**
   - Open a new terminal or command prompt.
   - Navigate to the directory where `client.js` is located.
   - Execute the client code by running:
     ```bash
     node client.js
     ```
   - The client will connect to the TCP server and receive stock transaction data.


## Important Note

When running the client, if you encounter issues with symbol processing, different encodings such as ASCII, UTF-8, and HEX have been attempted but may not give the expected results.


