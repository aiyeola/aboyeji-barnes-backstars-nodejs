# Barnes Backstars - Making company travel and accommodation easy and convenient

## Vision

Make company global travel and accommodation easy and convenient for the strong workforce of the savvy members of staff of the Barnes Backstars, by leveraging the modern web.

## Pre-Requisites

- PostgreSQL and database created
- Redis

## How to Install and run the application

- Clone the application and run `yarn install`
- Run `cp .env.example .env` to create the .env variables and fill them
- Run `yarn db-migrate:dev` to create db migrations
- Run `yarn run start:dev` to start development server

### User Credentials seeded to the Database

**_Super Administrator_**

```json
{
  "userEmail": "johndoe@gmail.com",
  "userPassword": "Root1123#"
}
```

**_Manager_**

```json
{
  "userEmail": "marveldev53@gmail.com",
  "userPassword": "Root1123#"
}
```

**_Travel Admin_**

```json
{
  "userEmail": "janedoe@gmail.com",
  "userPassword": "Root1123#"
}
```

**_Requester_**

```json
{
  "userEmail": "danieldoe@gmail.com",
  "userPassword": "Root1123#"
}
```

## API Documentation

- [Swagger Documentation on Heroku](https://aboyeji-barnes-backstars-nodejs-staging.herokuapp.com/api/docs/)

## Technologies Used

- NodeJS / Express
- PostgreSQL Database with Sequelize as ORM
- Redis
- Swagger for API Documentation
- Heroku For Hosting

## Contributors

- [Victor Aiyeola](https://github.com/aiyeola)
