## XMeme App

This is a platform where people can share meme which will take an image URL, caption and user name to post the meme in public. User can also edit, update and delete the already posted meme.

## Technology used

<b>Built with</b>

- Frontend - [ReactJS](https://reactjs.org/)
- Backend - [NodeJS](https://nodejs.org/en/), [ExpressJS](https://expressjs.com/)
- Database - [MongoDB](https://www.mongodb.com/)
- API documentation - [Swagger](https://swagger.io/)

## Installation

### meme-backend

Download the code for meme-backend, open the folder in VS Code, open terminal `(Ctrl + ~)` and run

```bash
cd meme-backend
npm install
```

For database, you can install MongoDB locally or can use MongoDB Atlas for this. Used Atlas for development purpose.

For that go to official site of mongo db, sign up and create cluster and follow this [official doumentation](https://docs.atlas.mongodb.com/getting-started/) to connect with MongoDB Atlas.

Create one `.env` file inside `meme-backend` directory to store environment variables like port no to run the server or the DB connection string. And use those variables in `app.js` file, to run the app.

```bash
npm start
```

it should show the following messages if everything works fine:

```bash
Server is running on port 8081
Server is running on port 8081
Connected to DB
```

We can open `http://localhost:8081/memes` in browser to see the data of posted meme if there's any meme's posted else an blank array. Open `http://localhost:8080/swagger-ui/` in browser to see the `Swagger` documentaion of the API.

### meme-frontend

Download the code for meme-frontend, open the folder in VS Code, open terminal `(Ctrl + ~)` and run

```bash
cd meme-frontend
npm install
```

Create one `.env` file inside `meme-frontend` directory to store environment variables like backend URL in this case. And use those variables in the code wherever is required to run the app like we need backend url to send request to API so in those cases, we have used environment variable. To store the backend URL in React, we need to write

```bash
REACT_APP_BACKEND = http://localhost:8081
```

Now, run

```bash
npm start
```

We can open `http://localhost:3000` in browser to see whether the React app is running or not perfectly.

## Deployment

### meme-backend

Deploy the backend 1st as we need the publicly deployed backend URL to integrate it with frontend. Will use [Heroku](https://www.heroku.com/) for this deployment.

Sign up on Heroku, click on `Create new app`, fill in details and click on “Create app” to create the app with a name. After creating it, go to its `Settings`, add one `Config Vars` for the MongoDB URI as key(MONGODB_URI)-value(connection string of MongoDB) pair And proceed to download Heroku CLI inside `meme-backend` directory.

```bash
npm install -g heroku
#to log in to Heroku CLI fron terminal
heroku login -i
#to install Heroku extension required to create a build
heroku plugins:install heroku-builds
#build, <name_of_your_app> is the one we created in the step above
heroku builds:create -a <name_of_your_app>
```

Now, we can go the URL shown in the output after building it successfully and it should show the output.

> NOTE: `/memes` is the endpoint to GET all memes from DB so check that to see the actual data from DB.

To know more on `integration MongoDB Atlas with Heroku` read this [blog](https://developer.mongodb.com/how-to/use-atlas-on-heroku/)

### meme-frontend

Now, we have the publicly deployed backend's URL. So, need to update the `.env` file inside `meme-frontend` with the backend URL.

```bash
REACT_APP_BACKEND = https://<publicly_deployed_url_on_heroku>
```

Install Netlify CLI and Sign up for Netlify, log in using the command mentioned below and authorize

```bash
npm install -g netlify netlify-cli
netlify login
```

Then, run the below commands to build and deploy

```bash
npm run-script build
netlify deploy
```

After running `netlify deploy` command, it asks for the published directory. So, enter `build` in that case. As a result we get a `Website Draft URL` as a preview to check the deployed application is working fine or not. If everything is fine then run the below command to deploy finally in production

```bash
npm deploy --prod
```

## API Reference

API documentation has been built using Swagger and deployed publicly which can be accessed [here](https://share-meme-backend.herokuapp.com/swagger-ui/)

## Scripts

Also, some scripts added here to make the setup ready on AWS EC2 instance (Ubuntu 18.04) so that `meme-backend` could be tested locally
