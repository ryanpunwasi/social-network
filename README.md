# Social Network API

## Routes

```/login```<br>

Accepts POST requests with ```username``` and ```password``` parameters in the body


```/register```<br>

Accepts POST requests with ```username``` and ```password``` parameters in the body. ```username``` must be alphanumeric and between 3 and 20 characters, inclusive. ```password``` must be at least 8 characters long. 

```/tweets``` <br>

Accepts GET, POST, PUT, and DELETE requests.

GET (Read a tweet) - /tweets/{tweetId}

POST (Create a new tweet) - Accepts requests with ```accessToken``` and ```content``` parameters in body. ```accessToken``` is retrieved by logging in.

PUT (Edit a tweet) - Accepts requests with ```accessToken```, ```tweetId``` and ```newContent``` parameters in body. ```accessToken``` is retrieved by logging in.

DELETE (Delete a tweet) - Accepts requests with ```accessToken``` and ```tweetId``` parameters in body. ```accessToken``` is retrieved by logging in.


## Instructions

1. Clone repository

2. Change into server directory and run ```npm install```

3. Update .env.example to include your database credentials. ACCESS_TOKEN_SECRET is used for authentication and should be changed. Rename .env.example to .env.

4. Run ```npm run db:reset``` to create tables and seed database.

5. Run ```npm run local``` to start server.

6. In a new console window, while in the server directory, run ```npm test``` to run tests.

