# Message Microservice

### Messaging service implemented with Socket.IO

## To run:

1. Install dependencies: `npm install` or `yarn install`
2. Create a `.env` file in the `message` directory and set `PORT`
3. Run the server: `node index.js`

## Dev:
1. After starting the server, you can run the test file to show your message.
2. Connect to the socket
3. Socket.emit message
4. Unfortunately, it won't be stored in database (as of now) so if client disconnects, message is not saved.