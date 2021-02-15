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
            functions.logger.log("Get recipe successfully by id");
            return res.status(200).send(recipe.data);
        })
        .catch((error) => {
            functions.logger.log("Error getting recipe by id: ", error);
            return res.status(400).send(`Error getting recipe by id: ${error}`);
        });
});

router.route("").get((req, res) => {
    // apppend apiKey into the queries object
    const queries = {
        ...req.query,
        apiKey: SPOONACULAR_APIKEY,
    };

    axios.get(`${SPOONACULAR_URL}/recipes/complexSearch`, {params: queries})
        .then((recipes) => {
            functions.logger.log("Get recipe successfully by query");
            return res.status(200).send(recipes.data);
        })
        .catch((error) => {
            functions.logger.log("Error getting recipes by query: ", error);
            return res.status(400).send(`Error getting recipes by query: ${error}`);
        });
});

module.exports = router;
