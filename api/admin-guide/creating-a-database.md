# Creating a Database

Connect to MySQL:

```
$ mysql -h <host> -u <user> -p
```

The command above will ask you for the user password:

```
$ mysql -h localhost -u root -p
Enter password: ****
```

After you successfully log into MySQL, run the `CREATE DATABASE` command:

```
mysql> CREATE DATABASE directus_test;
Query OK, 1 row affected (0.00 sec)
```