// const admin = require('firebase-admin');
// const cors = require('cors');

// admin.initializeApp();

// const db = admin.firestore();
const express = require("express");

const router = new express.Router();


const recipeRouter = require("./routes/recipe");
router.use("/recipes", recipeRouter);



router.route("/").get((req, res) => {
    return res.status(200).send("hello world from api index");
});

module.exports = router;
