# BACKEND
The Backend is created by using Adonisjs version 5.

## System Requirement

- Nodejs: 14.6.0 and above
- MySQL: 8.x

## Getting Started
Please follow the steps below to set up development enviroment for the first time.

1. Install all packages
```bash
npm install
```

2. Update .env file

Create the file .env at the root, copy enviroment variables from the .env.example and replace with your values.

3. Migration and seeding mock data
```bash
node ace migration:run
node ace db:seed # add -i if you want to seed a specific seeder file
```

4. Start the server
```bash
npm run dev
# or
yarn dev
```

## Project Description

This is the backend code of the Tinder-clone app.
 
