# PeerPrep API Backend
We are using [ExpressJS](https://expressjs.com/), a Fast, unopinionated, minimialist web framework for [Node.js](https://nodejs.org/en/).
We use [MongoDB](https://docs.mongodb.com/) as our application data platform to store our data in the [Cloud Database](https://www.mongodb.com/).

This constitutes to the typical MERN stack.

### Why choose ExpressJS?
ExpressJS is a prebuilt NodeJS framework that can help us create a server-side web application faster and smarter.
ExpressJS is also simple, minimalistic and flexible that inherits from Node.js, so it helps us to build the API in a short span of 6 weeks and the performance was also up to standards.
Furthermore, prior to the project, our team has built a simple API using ExpressJS and Node.js, hence, we are familiar with this framework.

### Why choose MongoDB?
MongoDB provides flexible schema that makes it easy to evolve and store data. We make use of the non-relational database to store data in the JSON format which is easier for us to parse. 
MongoDB also scales up quickly and support most of the main features of modern databases.

## Structure

### Microservices
We have decided to follow the Microservices architecture because we feel that it will be easier for our team to split up and implement each microservice, test a part of the application without dependencies from each other. Microservice Architecture allows us to have loosely coupled modules, highly maintainable code and provides high scalability.

### Users Microservice
Users Microservice allows for basic user account management. It is responsible for registeration of an account and logging in to the account.
User Microservice also include access to user profile details and user friend details.

### Match Microservice
Match Microservice allows for matching two users of similar experience level through our very own matching algorithm.
It also has a Server Socket that enables receiving and emitting signals with respect to users' direct practice session request.

### Editor Microservice
Editor Microservice contains the Server socket that allows realtime interaction between two users in an interview room through the collaborative editor component.

### Message Microservice
Message Microservice contains the Server socket that allows realtime interaction between two users in an interview room through the chat component.

### Questions Microservice
Questions Microservice allow us to retrieve questions from our database and return it to the frontend.

## Build Setup
For each Microservice, we have to create an environment file `.env` which should contain your very own Cloud Database URI named `CLOUD_DATABASE_URL`. You can also allocate your own `PORT` number.
```bash
# install dependencies
$ npm install

# serve with nodemon hotrestart at [http://localhost:PORT](http://localhost)
$ npm run dev
```

### Dependencies
- Socket.io
For Pub-Sub realtime communication, we used [Socket.io](https://socket.io/). You can refer to more on the usage in the Socket.io [documentation](https://socket.io/docs/v4/).

- JSON Web Token
For authentication, we employed the usage of [JWT](https://jwt.io/). You can refer to more on the usage in the JWT [documentation](https://www.npmjs.com/package/react-jwt).

- Mocha
For our unit testing and CI, we employed the usage of [Mocha](https://mochajs.org/). You can refer to more on the usage in Mocha [documentation](https://mochajs.org/#getting-started).

- Mongoose
For our mongodb object modeling and connection, we used [mongoose](https://mongoosejs.com/). You can refer to more on the usage in Mongoose [documentation](https://mongoosejs.com/docs/guide.html).

- Redis
For the Editor Microservice, we used [Redis](https://redis.io/) for caching of draft attempts on the questions. You can refer to more on the usage in Redis [documentation](https://redis.io/documentation).