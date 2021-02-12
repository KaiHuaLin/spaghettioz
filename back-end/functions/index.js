const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const api = express();
api.use(cors({origin: true}));

const appRouter = require("./src/app");

// const validateFirebaseIdToken = (req, res) => {
//     if ((!req.headers.authorization ||
//          !req.headers.authorization.startsWith('Bearer '))) {
//     console.error('No Firebase ID token was passed as a
//     Bearer token in the Authorization header.',
//         'Make sure you authorize your request by
//          providing the following HTTP header:',
//         'Authorization: Bearer <Firebase ID Token>',
//         'or by passing a "__session" cookie.');
//     res.status(403).send('Unauthorized');
//     return;
//   }

//   if (req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer ')) {
//     console.log('Found "Authorization" header');
//     res.status(200).send('Authorized');
//     return;
//     // Read the ID Token from the Authorization header.
//     // idToken = req.headers.authorization.split('Bearer ')[1];
//   }
// };

// api.use(validateFirebaseIdToken);
api.use("/", appRouter);

// export the api to Firebase Cloud Function
exports.api = functions.https.onRequest(api);
