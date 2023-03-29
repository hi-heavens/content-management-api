# Content Management REST API
This is a REST API for a content management system that provides functionality to manage posts, categories, and users. This project is a working reference point

## API Prefix
The API routing prefix is /api/v1/.

For example:
```
https://{{base_url}}/api/v1/posts
```
```
https://{{base_url}}/api/v1/user
```

## Authentication
Authentication is performed using Bearer Token authentication. A valid JWT token must be created to enable access to protected routes. The token must contain the `user_uuid` as a claim, and the issuer must be the API server domain.

All API routes must be protected by a middleware to avoid injection attacks using a Data Access Object (DTO). In addition, a middleware must be used to validate the authenticity of the user token and allow user tokens on the User side.

## User Endpoint (CRUD)
This endpoint will handle the CRUD methods for the user, as well as enable the following features:

- Sign/signup
- Forgot/reset password
- List all user posts
- Get a user details
The endpoint must only affect the current logged-in user. User A cannot see or edit anything from User B.
- Only a user of a post can delete a post
- Only a login user can create or edit a post

## Posts Endpoint (CRUD)
This endpoint will handle the CRUD methods for posts:
- Create posts
- Delete posts
- Edit a post
- List all posts 
The initial data for these endpoints must be added to the DB via seeders.

## Forgot/Reset Password
This endpoint will handle the forgot and reset password feature. The following steps will be taken:

- The user will request a token to reset their password.
- If the email is valid, a unique token will be generated.
- Only one token per user will be available at a time.
- After a successful password update, the token must be deleted.

## Categories Endpoint (CRUD)
This endpoint will handle the CRUD methods for categories. The initial data for these endpoints must be added to the DB via seeders.




### Contributor
- Kehinde Adedokun