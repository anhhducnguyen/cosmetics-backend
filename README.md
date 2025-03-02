```
example.
│   .env
│   .gitignore
│   knexfile.js
│   package-lock.json
│   package.json
│   README.md
│
├───server
│   │   app.js
│   │
│   └───dev-data
│           data.json
│
└───src
    ├───config
    │       database.js
    │
    ├───controllers
    ├───database
    │   ├───migrations
    │   │       20250302034423_create_users_table.js
    │   │
    │   └───seeds
    ├───middlewares
    ├───models
    ├───public
    ├───routes
    └───utils


```

1.

```
npx knex migrate:make create_users_table
```

```
npx knex seed:make users_seed
```

2.

```
npx knex migrate:latest
```

```
npx knex seed:run
```



