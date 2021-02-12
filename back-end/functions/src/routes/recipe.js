const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");

const router = new express.Router();

const SPOONACULAR_URL = functions.config().spoonacular.url;
const SPOONACULAR_APIKEY = functions.config().spoonacular.apikey;

// get recipe by id
router.route("/:id").get((req, res) => {
    axios.get(`${SPOONACULAR_URL}/recipes/${req.params.id}/information?apiKey=${SPOONACULAR_APIKEY}`)
        .then((recipe) => {
            functions.logger.log("Get recipe successfully");
            return res.status(200).send(recipe.data);
        })
        .catch((error) => {
            functions.logger.log("Error getting recipe: ", error);
            return res.status(400).send("error");
        });
});

module.exports = router;
