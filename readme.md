## DEVELOPER NOTES:
To start the solution with docker just place your self in the terminal within folder that contains the project and type

- `docker-compose build`
and then
`docker-compose run`


- to start locally just run in two separate terminals
`yarn start` on both client & server folders after setting up mongo locally


- to Use the postman collection, just use `login-challenge.postman_collection.json` inside postman and import it

### Solution Notes:
- Both client & server use typescript & JWT
- Client uses Hooks & context API
- Server uses Mongoose for schema definition


## Drixit Fullstack challenge

The task is to implement a log in page and show the user info if the login succeed.
There is no UX or UI constraints, this is up to you to decide. You can use [mongodb page](https://account.mongodb.com/account/login) as a sample for the login.

### First page: /login

If the user enters a valid mail, then the password input shows up. Just like mongodb login works.
If the email and password are valid, this endpoint returns a valid token (for this demo you can just use a string 'jwt-token').

```
ENDPOINT: USER INFO

POST /api/v0/authenticate
{
	"email": "it@drixit.com",
	"password": "some-password",

} => Promise<{ "jwt": "jwt-token" }>
```

### Second page: /user-info
Use the token to fetch the user info and show the user info in a new page.
The User information that we need to collect is described in the UserClient interface at [users.ts](https://github.com/Drixit/challenge/blob/master/users.ts)

```
ENDPOINT: USER INFO

GET /api/v0/users/me { "token": "jwt-token" } => Promise<UserClient>
````
You may use a routing library such that every step is a separate route but this is completely optional.

There is a dummy `users` file which exports the valid users.
Use this file to validate email vs password, and to fetch the user info.

The focus should be on code style and the way you approach the problem implementation wise.
Feel free to use any other helper library although ideally the more code you write yourself the better.

### Implementation requirements:
- Use either vanilla Javascript or React.
- Use a router if you need to render both pages ( log in / user info )
- Feel free to use create-react-app or some other tool.


### Bonus points
- Create a basic node app with this two endpoints and the users.js file to validate the front-end requests.
- Handle errors in both front pages
	- Wrong email / password
	- Get user info with an invalid token (i.e. token="not-a-valid-token")
- Use a statically typed language like Typescript
- Store the user token so if the user refresh the page there is no need to log in again.

### Extra Bonus Points
- Use jwt.io to generate valid tokens for the user.
- Use mongodb to store the users.

### The process is as important as the final result, that's why we ask you to:
- Keep (and share) a log of the most important decisions you made at the end of the exercise.
- Deliver your solution as a github repository with enough context and information so it can be analyzed/tested by our team.
- Include everything that you consider relevant when you are about to send the results.


Any questions please contact me via email.
