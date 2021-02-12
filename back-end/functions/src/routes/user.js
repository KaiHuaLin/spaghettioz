const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");

admin.initializeApp();
// const db = admin.firestore();
const router = new express.Router();


// retreive user by requestType (uid, email, ...)
router.route("/:reqType/:value").get((req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    const reqType = req.params.reqType;
    let promise = null;

    if (reqType === "uid") {
        promise = admin.auth().getUser(req.params.value);
    } else if (reqType === "email") {
        promise = admin.auth().getUserByEmail(req.params.value);
    } else {
        return res.status(400).send("Invalid request type");
    }

    promise
        .then((user) => {
            functions.logger.log("Got user successfully");
            return res.status(200).send(user);
        })
        .catch((error) => {
            functions.logger.log("Error getting user: ", error);
            return res.status(400).send(`Error getting user: ${error}`);
        });
});

// creat a new user
router.route("/").post((req, res) => {
    // req.body will look like this
    // {email: "<email>", password: "<pwd>", displayName: "<name>"}
    admin.auth().createUser(req.body)
        .then((user) => {
            functions.logger.log("User created");
            return res.status(201).send(user.uid);
        })
        .catch((error) => {
            functions.logger.log("Error creating new user: ", error);
            return res.status(400).send(`Error creating new user: ${error}`);
        });
});

// update a user by uid
router.route("/:uid").put((req, res) => {
    admin.auth().updateUser(req.params.uid, req.body)
        .then((user) => {
            functions.logger.log("User updated");
            return res.status(200).send(user);
        })
        .catch((error) => {
            functions.logger.log("Error updating new user: ", error);
            return res.status(400).send(`Error updating new user: ${error}`);
        });
});

module.exports = router;
