# User Microservice 

## To run:

1. Install dependencies: `npm install`
2. Create a `.env` file in the project root and set `DBUSERNAME` and `DBPASSWORD` environment variables
3. `nodemon index.js`

## Supported endpoints

1. Get all users: HTTP GET Request to `/user/user`
2. Get one user: HTTP GET Request to `/user/{username}`
3. New user: HTTP POST Request to `/user/user` with JSON formatted body containing `username`, `email` and `password`
4. Update user: HTTP PUT Request to `/user/{username}` with JSON formatted body containing `username`, `email` and `password`
5. Delete user: HTTP DELETE Request to `user/{username}`

You can refer to postman-collections/User MS.postman_collection.json for some examples.