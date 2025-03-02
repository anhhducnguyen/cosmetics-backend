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

```
npm init
```

```
npx knex migrate:make create_users_table
```

```
npx knex migrate:latest
```