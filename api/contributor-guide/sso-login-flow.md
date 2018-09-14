# Single Sign-On Flow

When the application attempts to log a user in using Single Sign-On (SSO):

1. The application will redirect to the API at `/auth/sso/<provider>`
2. The API redirects to the provider (e.g. GitHub/Facebook)
3. The user logs in on the providers website
4. Provider redirects back to the API
5. The API checks the authentication
6. The API redirects back to the application using the referral domain from the initial step 1 request. The API adds the data to the query string. If it's an error, it's going to be in the `?error` parameter, if it's successful it will add the Request Token in the `token` parameter.
7. The client will need to use the Request Token from Step 6 to make a `POST` request to the API to `/auth/access_token` with a `request_token` as a required param to fetch the Access Token.