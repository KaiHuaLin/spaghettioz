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
        .then((authUser) => {
            functions.logger.log("Authentication: Got user successfully");

            db.doc(authUser.uid).get()
                .then((user) => {
                    functions.logger.log(`Firestore: Got user successfully: ${authUser.uid}`);
                    return res.status(200).send(user.data());
                })
                .catch((error) => {
                    functions.logger.log("Firestore: Error getting user: ", error);
                    return res.status(200).send(`Firestore: Error getting user: ${error}`);
                });
        })
        .catch((error) => {
            functions.logger.log("Authentication: Error getting user: ", error);
            return res.status(400).send(`Authentication: Error getting user: ${error}`);
        });
});

// login a user
router.route("/login").post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    admin.auth().getUserByEmail(email)
        .then((authUser) => {
            functions.logger.log("Authentication: Got user email successfully");

            db.doc(authUser.uid).get()
                .then((user) => {
                    if (user.data().password === password) {
                        functions.logger.log("Firestore: Got user match email and password successfully");
                        return res.status(200).send(`${authUser.uid} logged in`);
                    } else {
                        functions.logger.log("Firestore: Error logged in failed, wrong password");
                        return res.status(401).send("Firestore: Logged in failed, wrong password");
                    }
                })
                .catch((error) => {
                    functions.logger.log("Firestore: Error logged in failed: ", error);
                    return res.status(401).send(`Firestore: Error logged in failed: ${error}`);
                });
        })
        .catch((error) => {
            functions.logger.log("Firestore: Error logged in fail, no such user", error);
            return res.status(401).send(`Firestore: Error logged in fail, no such user: ${error}`);
        });
});

// creat a new user
router.route("/").post((req, res) => {
    // req.body will look like this
    // {email: "<email>", password: "<pwd>", displayName: "<name>"}
    admin.auth().createUser(req.body)
        .then((authUser) => {
            functions.logger.log("Authentication: user created");

            db.doc(authUser.uid).set(req.body)
                .then((status) => {
                    functions.logger.log(`Firestore: user created at: ${status}`);
                    return res.status(201).send(authUser.uid);
                })
                .catch((error) => {
                    functions.logger.log("Firestore: Error creating new user: ", error);
                    return res.status(400).send(`Firestore: Error creating new user: ${error}`);
                });
        })
        .catch((error) => {
            functions.logger.log("Authentication: Error creating new user: ", error);
            return res.status(400).send(`Authentication: Error creating new user: ${error}`);
        });
});

// update a user by uid
router.route("/:uid").put((req, res) => {
    const userId = req.params.uid;
    const userInfo = req.body;
    admin.auth().updateUser(userId, userInfo)
        .then((authUser) => {
            functions.logger.log("Authentication: user updated");

            // if it is a new field, then it will be appended to it
            db.doc(userId).update(userInfo)
                .then((status) =>{
                    functions.logger.log(`Firestore: user updated at: ${status}`);
                    return res.status(201).send(authUser.uid);
                })
                .catch((error) => {
                    functions.logger.log("Firestore: Error updating user: ", error);
                    return res.status(201).send(`Firestore: Error creating new user: ${error}`);
                });
        })
        .catch((error) => {
            functions.logger.log("Authentication: Error updating user: ", error);
            return res.status(400).send(`Authentication: Error updating user: ${error}`);
        });
});

module.exports = router;
