# WanderLust

WanderLust is an Airbnb-style accommodation listing web app built with Node.js, Express, MongoDB, and EJS. Users can browse stays, create an account, manage their own listings, upload listing photos, and leave reviews.

## Features

- Browse listings and view listing details
- Sign up, log in, and log out with Passport local authentication
- Create, edit, and delete listings
- Upload listing photos to Cloudinary
- Add ratings and written reviews
- Show a Mapbox map on listing detail pages
- Validate listing and review form data

## Built with

- Node.js and Express
- MongoDB and Mongoose
- EJS and ejs-mate
- Passport and passport-local-mongoose
- Cloudinary for image storage
- Mapbox GL JS for maps
- Joi for request validation

## Prerequisites

- Node.js and npm
- A MongoDB database, either local or MongoDB Atlas
- A Cloudinary account for listing photo uploads
- A Mapbox public access token for maps

## Getting started

Clone the repository and install its dependencies:

```bash
git clone https://github.com/pranshuop18-boop/airbnb.git
cd airbnb
npm install
```

Create a `.env` file in the project root and fill in your own values:

```env
ATLASDB_URL=mongodb://127.0.0.1:27017/WanderLust
SECRET=replace-with-a-long-random-secret
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
MAP_TOKEN=your-mapbox-public-token
```

For MongoDB Atlas, use your Atlas connection string for `ATLASDB_URL`. Keep your real `.env` file and credentials private; do not commit them to GitHub. The Mapbox token is used in browser-side code, so use a public token and restrict it to your app's domains in Mapbox settings.

Start the app from the project root:

```bash
node app.js
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## Live deployment

- **App:** [WanderLust on Render](https://airbnb-project-daew.onrender.com/)
- **Database:** MongoDB Atlas

The deployed Render service uses the Atlas connection string for `ATLASDB_URL`. Configure the required environment variables from the setup section in the Render service's environment settings, and make sure the Atlas cluster allows connections from the service.

> The current `npm start` script points to `nodemon aap.js`, while the application entry point is `app.js`. Run `node app.js` as shown above, or update the `start` script in `package.json` before using `npm start`.

## Optional sample data

The `init/index.js` script can insert sample listings into a local database:

```bash
node init/index.js
```

Create a user in the app first. This script connects to `mongodb://127.0.0.1:27017/WanderLust` directly and deletes existing listings in that database before inserting sample data. Use it only with a development database whose listing data you can replace.

## Project structure

```text
.
├── controllers/   # Listing, review, and user request handlers
├── init/          # Sample listing data and database initializer
├── models/        # Mongoose models
├── public/        # CSS, browser JavaScript, and static uploads
├── routes/        # Express routes
├── utils/         # Shared error and async helpers
├── views/         # EJS pages and layouts
├── app.js         # Express app and server entry point
└── cloudConfig.js # Cloudinary setup
```
