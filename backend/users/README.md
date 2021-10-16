# User Microservice

## To run:

1. Install dependencies: `npm install`
2. Create a `.env` file in the project root and set `DBUSERNAME` and `DBPASSWORD` environment variables
3. `nodemon index.js`

## Supported endpoints

# User CRUD operations

1. Get all users: HTTP GET Request to `/api/user/user`
2. Get one user: HTTP GET Request to `/api/user/{username}`
3. New user: HTTP POST Request to `/api/user/user` with JSON formatted body containing `username`, `email` and `password`
4. Update user: HTTP PUT Request to `/api/user/{username}` with JSON formatted body containing `username`, `email` and `password`
5. Delete user: HTTP DELETE Request to `/api/user/{username}`

# User log in operation

1. Login user: HTTP POST Request to `/api/user/login/{username}` with JSON formatted body containing `password`

# User profile operations

1. Get one user profile: HTTP GET Request to `/api/user/profile/{username}`
2. Create user profile: HTTP POST Request to `/api/user/profile/` with JSON formatted body containing `username`
3. Delete user profile: HTTP DELETE Request to `/api/user/profile/{username}`
4. Create interview: HTTP POST Request to `/api/user/profile/interview/{username}` with JSON formatted body containing `partnerUsername`
5. Delete interview: HTTP DELETE Request to `/api/user/profile/interview/{username}` with JSON formatted body containing `_id`

You can refer to `postman-collections/User MS.postman_collection.json` for some examples.
