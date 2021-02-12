const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
const router = new express.Router();


// retreive user by requestType (uid, email, ...)
router.route("/:reqType/:value").get((req, res) => {
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
            functions.logger.log("Authentication: user created");

            db.collection("users").doc(user.uid).set(req.body)
                .then((status) => {
                    functions.logger.log(`Firestore: user created at: ${status}`);
                    return res.status(201).send(user);
                })
                .catch((error) => {
                    functions.logger.log("Firestore: Error creating new user: ", error);
                    return res.status(400).send(`Firestore: Error creating new user: ${error}`);
                })
        })
        .catch((error) => {
            functions.logger.log("Authentication: Error creating new user: ", error);
            return res.status(400).send(`Authentication: Error creating new user: ${error}`);
        });
});

// update a user by uid
router.route("/:uid").put((req, res) => {
    const user_id = req.params.uid;
    const user_info = req.body;
    admin.auth().updateUser(user_id, user_info)
        .then((user) => {
            functions.logger.log("Authentication: user updated");

            // if it is a new field, then it will be appended to it
            db.collection("users").doc(user_id).update(user_info)
                .then((status) =>{
                    functions.logger.log(`Firestore: user updated at: ${status}`);
                    return res.status(201).send(user);
                })
                .catch((error) => {
                    functions.logger.log("Firestore: Error updating user: ", error);
                    return res.status(201).send(`Firestore: Error creating new user: ${error}`);
                })
        })
        .catch((error) => {
            functions.logger.log("Authentication: Error updating user: ", error);
            return res.status(400).send(`Authentication: Error updating user: ${error}`);
        });
});

module.exports = router;
