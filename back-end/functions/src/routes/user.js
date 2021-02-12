const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore().collection("users");
const router = new express.Router();


// retreive user by requestType (uid, email, ...)
router.route("/:reqType/:value").get((req, res) => {
    const reqType = req.params.reqType;
    const value = req.params.value;
    let promise = null;

    if (reqType === "uid") {
        promise = admin.auth().getUser(value);
    } else if (reqType === "email") {
        promise = admin.auth().getUserByEmail(value);
    } else {
        return res.status(400).send("Invalid request type");
    }

    promise
        .then((auth_user) => {
            functions.logger.log("Authentication: Got user successfully");
            
            db.doc(auth_user.uid).get()
                .then((user) => {
                    functions.logger.log(`Firestore: Got user successfully: ${auth_user.uid}`);
                    return res.status(200).send(user.data());
                })
        })
        .catch((error) => {
            functions.logger.log("Authentication: Error getting user: ", error);
            return res.status(400).send(`Authentication: Error getting user: ${error}`);
        });
});

// creat a new user
router.route("/").post((req, res) => {
    // req.body will look like this
    // {email: "<email>", password: "<pwd>", displayName: "<name>"}
    admin.auth().createUser(req.body)
        .then((auth_user) => {
            functions.logger.log("Authentication: user created");

            db.doc(auth_user.uid).set(req.body)
                .then((status) => {
                    functions.logger.log(`Firestore: user created at: ${status}`);
                    return res.status(201).send(auth_user.uid);
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
        .then((auth_user) => {
            functions.logger.log("Authentication: user updated");

            // if it is a new field, then it will be appended to it
            db.doc(user_id).update(user_info)
                .then((status) =>{
                    functions.logger.log(`Firestore: user updated at: ${status}`);
                    return res.status(201).send(auth_user.uid);
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
