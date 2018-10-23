# Configuring Okta Auth

1. **Sign Up**: First create a Developer Okta account at https://developer.okta.com/signup/

2. **Get Email**: Once you've created an account, a temporary password will be emailed to you.

3. **Log In**: Activate your account by logging in with this temporary password and setting a new password.

4. **Create App**: Create a new Okta web application by choosing _Applications_ in the main menu and then clicking on "Add Application". `https://<your-okta-id>-admin.oktapreview.com/admin/apps/active`

5. **Choose Web**: Pick _Web_, click Next.

6. **Login Redirect**: Make sure that _Login Redirect URIs_ is set to `[your-directus-host]/[project-name]/auth/sso/okta/callback`. For example `http://localhost/_/auth/sso/okta/callback`.

7. **Get Keys**: Click on the newly created application and go to _General > Client Credentials_ and you will see the `Client ID` and the `Client Secret`. Use these values for the Okta `client_id` and `client_secret` in your API project configuration, eg: `config/api.php` (default) or `config/api.<project-name>.php`.

8. **Base URL**: The `base_url` can be found under _API_ in the main menu. You will see a list of Authorization Servers to pick from. The URL is under the column labeled `Issuer URI`.

::: tip SCIM
Okta is also capable of externally managing your Directus users, allowing for more unified user provisioning within your organization. This is accomplished by using our [API's dedicated SCIM endpoints](/api/reference.md#scim).
:::