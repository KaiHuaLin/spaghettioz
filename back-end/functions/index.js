const functions = require("firebase-functions");
const express = require("express");

const api = express();

const appRouter = require("./src/app");

api.use("/", appRouter);

// export the api to Firebase Cloud Function
exports.api = functions.https.onRequest(api);
