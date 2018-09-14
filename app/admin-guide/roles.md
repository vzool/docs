# Roles

Directus Roles allow you to group users and control their experience in the app as well as the permissions they have in regards to your data.

## Default Roles

Directus by default has two (non-removable) roles.

### Administrators

Users with this role have full permissions for all data within the system and are the only ones with access to Admin Settings.

### Public

This special role defines what data is accessible _without_ being authenticated.

## Creating Roles

You can also create additional roles that limit access for specific purposes. As of now, users can only be assigned to a single role, but our system is architected in a way to allow for merging multiple roles in the future.

A role can be created by clicking on the "New" button ("+") in the top right of the _Roles & Permissions_ page in the _Admin Settings_.

Roles have a couple options that allow you to further edit the user's experience:

### Description

This is for internal use only. It helps your administrators understand the purpose of each role.

### IP Whitelist

A CSV of IP addresses that are allowed to connect to the API. This can be used to limit access to specific offices, for example.

### Permissions

Directus extends the typical CRUD access control to add even more granularity. For more information on how to set the base permissions (Create, Read, Update, Delete, Comment, and Explain).

To learn more about setting up and using permissions, checkout our [doc on permissions](./permissions.md).

### Deleting Roles

To delete a role: first remove all its users, then click the Delete button in the header of the Role Detail page.